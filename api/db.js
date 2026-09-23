// Vercel Serverless Function: Neon PostgreSQL Database Gateway
const NEON_CONN_STR = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_Z1XQUFT0YhBI@ep-delicate-mountain-adckue32-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";
const NEON_SQL_ENDPOINT = "https://ep-delicate-mountain-adckue32-pooler.c-2.us-east-1.aws.neon.tech/sql";

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Neon-Connection-String");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    // Health check and table counts
    try {
      const resp = await fetch(NEON_SQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Neon-Connection-String": NEON_CONN_STR,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: `
            SELECT 
              (SELECT count(*) FROM ju_inward) AS inward_count,
              (SELECT count(*) FROM ju_outward) AS outward_count,
              (SELECT count(*) FROM ju_files) AS files_count,
              (SELECT count(*) FROM ju_departments) AS dept_count,
              (SELECT count(*) FROM ju_doc_types) AS doc_count,
              (SELECT count(*) FROM ju_sections) AS section_count,
              (SELECT count(*) FROM ju_auth) AS auth_count,
              NOW() AS server_time;
          `
        })
      });
      const data = await resp.json();
      return res.status(200).json({
        status: "online",
        database: "neondb",
        provider: "Neon PostgreSQL",
        endpoint: NEON_SQL_ENDPOINT,
        stats: data.rows && data.rows[0] ? data.rows[0] : null
      });
    } catch (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { query, params } = req.body || {};
      if (!query) {
        return res.status(400).json({ error: "Missing query parameter" });
      }

      const bodyPayload = { query };
      if (params && Array.isArray(params)) {
        bodyPayload.params = params;
      }

      const resp = await fetch(NEON_SQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Neon-Connection-String": NEON_CONN_STR,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyPayload)
      });

      const data = await resp.json();
      return res.status(resp.status).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

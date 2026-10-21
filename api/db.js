// Server-side Neon PostgreSQL gateway. DATABASE_URL must be configured in Vercel.
const NEON_CONN_STR = process.env.DATABASE_URL;
const NEON_SQL_ENDPOINT = "https://ep-delicate-mountain-adckue32-pooler.c-2.us-east-1.aws.neon.tech/sql";
const ALLOWED_ORIGINS = new Set([
  "https://registraroffice.vercel.app",
  "https://registraroffice-blue-screen-wizards.vercel.app",
  "https://registraroffice-git-main-blue-screen-wizards.vercel.app"
]);

module.exports = async (req, res) => {
  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return res.status(403).json({ error: "Origin not allowed" });
  }
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (!NEON_CONN_STR) {
    return res.status(503).json({ error: "Database is not configured. Set DATABASE_URL in Vercel." });
  }

  if (req.method === "GET") {
    try {
      const resp = await fetch(NEON_SQL_ENDPOINT, {
        method: "POST",
        headers: { "Neon-Connection-String": NEON_CONN_STR, "Content-Type": "application/json" },
        body: JSON.stringify({ query: "SELECT NOW() AS server_time;" })
      });
      const data = await resp.json();
      if (!resp.ok) return res.status(resp.status).json({ error: "Database health check failed" });
      return res.status(200).json({ status: "online", database: "Neon PostgreSQL", serverTime: data.rows?.[0]?.server_time || null });
    } catch (err) {
      return res.status(500).json({ error: "Database connection failed" });
    }
  }

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { query, params } = req.body || {};
    if (typeof query !== "string" || !query.trim() || query.length > 30000) {
      return res.status(400).json({ error: "Invalid query" });
    }
    if (params !== undefined && !Array.isArray(params)) {
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    const resp = await fetch(NEON_SQL_ENDPOINT, {
      method: "POST",
      headers: { "Neon-Connection-String": NEON_CONN_STR, "Content-Type": "application/json" },
      body: JSON.stringify({ query, ...(params ? { params } : {}) })
    });
    const data = await resp.json();
    return res.status(resp.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Database request failed" });
  }
};

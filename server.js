const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.ico': 'image/x-icon',
  '.png': 'image/png'
};

const server = http.createServer((req, res) => {
  // Strip query string
  const cleanUrl = req.url.split('?')[0];
  let filePath = path.join(__dirname, cleanUrl === '/' ? 'index.html' : cleanUrl);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fallback to index.html for SPA routes
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (fallbackErr, indexData) => {
        if (fallbackErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(indexData);
        }
      });
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Joy University OOR Portal local server running at http://localhost:${PORT}/`);
});

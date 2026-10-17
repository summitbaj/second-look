// Optional Node API. The GitHub Pages frontend does not need this server.
import { createServer } from 'node:http';
import { demoProfile } from '../src/demo.js';
const port = Number(process.env.PORT || 3001);
createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET' && req.url === '/api/profile') {
    res.end(JSON.stringify(demoProfile));
  } else if (req.method === 'GET' && req.url === '/api/health') {
    res.end(JSON.stringify({ ok: true }));
  } else {
    res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
  }
}).listen(port, '127.0.0.1', () => console.log(`Demo API: http://127.0.0.1:${port}/api/health`));

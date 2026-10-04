import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'app-bundle');
const PORT = Number(process.env.PORT || 5173);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url || '/', `http://localhost:${PORT}`);
  const urlPath = parsedUrl.pathname;

  // Live AI Web Research Endpoint
  if (urlPath === '/api/ai-research') {
    const q = parsedUrl.searchParams.get('q') || '';
    try {
      const wikiUrl = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        q
      )}&utf8=1&format=json&srlimit=2`;
      const response = await fetch(wikiUrl, {
        headers: { 'User-Agent': 'AtelierCarrousel/1.0' },
      });
      const data = await response.json();
      const firstResult = data?.query?.search?.[0];
      const snippet = firstResult?.snippet
        ? firstResult.snippet.replace(/<[^>]+>/g, '').trim()
        : '';
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ snippet, title: firstResult?.title || '' }));
    } catch {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ snippet: '', title: '' }));
    }
    return;
  }

  let filePath = path.join(
    PUBLIC_DIR,
    urlPath === '/' ? 'index.html' : decodeURIComponent(urlPath)
  );

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  try {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch {
    res.writeHead(500);
    res.end('Server Error');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Atelier Carrousel ready on http://0.0.0.0:${PORT}`);
});

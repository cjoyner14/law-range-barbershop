import fs from 'fs';
import path from 'path';

const DIST = path.resolve('dist');
const DOMAIN = 'https://lawrangebarbershop.com';
const TODAY = new Date().toISOString().split('T')[0];

const ROUTES = [
  {
    path: '/',
    title: 'Law Range Barber Shop | Classic Cuts in Downtown Sumter, SC | (803) 773-4812',
    description:
      'Law Range Barber Shop — classic cuts and timeless style in downtown Sumter, SC. Walk-ins welcome mornings, appointments available afternoons. 4.8 stars. Call (803) 773-4812.',
    priority: '1.0',
  },
  {
    path: '/contact',
    title: 'Contact | Law Range Barber Shop | (803) 773-4812',
    description:
      'Contact Law Range Barber Shop in downtown Sumter, SC. Call (803) 773-4812 for appointments or walk in mornings. 5 E Canal St, Sumter, SC 29150.',
    priority: '0.8',
  },
];

// ── Pre-render HTML for each route ──
const indexHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

for (const route of ROUTES) {
  if (route.path === '/') continue; // index.html already exists

  let html = indexHtml;
  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
  html = html.replace(
    /<meta name="description" content=".*?">/,
    `<meta name="description" content="${route.description}">`
  );
  html = html.replace(
    /<link rel="canonical" href=".*?">/,
    `<link rel="canonical" href="${DOMAIN}${route.path}">`
  );
  html = html.replace(
    /<meta property="og:title" content=".*?">/,
    `<meta property="og:title" content="${route.title}">`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?">/,
    `<meta property="og:description" content="${route.description}">`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?">/,
    `<meta property="og:url" content="${DOMAIN}${route.path}">`
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?">/,
    `<meta name="twitter:title" content="${route.title}">`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?">/,
    `<meta name="twitter:description" content="${route.description}">`
  );

  const dir = path.join(DIST, route.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`Pre-rendered: ${route.path}`);
}

// ── Generate _redirects (Netlify) ──
const redirects = [
  `http://lawrangebarbershop.com/* https://lawrangebarbershop.com/:splat 301!`,
  `https://www.lawrangebarbershop.com/* https://lawrangebarbershop.com/:splat 301!`,
  ...ROUTES.filter((r) => r.path !== '/').map(
    (r) => `${r.path} ${r.path}/index.html 200`
  ),
  `/* /index.html 200`,
];

fs.writeFileSync(path.join(DIST, '_redirects'), redirects.join('\n') + '\n');
console.log('Generated: _redirects');

// ── Generate _headers ──
const headers = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;

fs.writeFileSync(path.join(DIST, '_headers'), headers);
console.log('Generated: _headers');

// ── Generate sitemap.xml ──
const urls = ROUTES.map(
  (r) => `  <url>
    <loc>${DOMAIN}${r.path === '/' ? '' : r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
console.log('Generated: sitemap.xml');

console.log('\nPost-build complete!');

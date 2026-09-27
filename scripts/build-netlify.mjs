import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root=fileURLToPath(new URL('../',import.meta.url));
const output=join(root,'dist');
await mkdir(output,{recursive:true});
for(const name of await readdir(root)){
  if(['index.html','404.html','robots.txt'].includes(name)||/\.(css|js)$/.test(name)||['assets','travel-photos'].includes(name)){
    await cp(join(root,name),join(output,name),{recursive:true,filter:source=>!source.endsWith('.DS_Store')});
  }
}
// Netlify supplies URL; SITE_URL can explicitly select the public custom domain.
const env = typeof process !== 'undefined' ? process.env : {};
const configured = env.SITE_URL || env.URL || 'https://lostandperdido.com';
if (configured) {
  const site = new URL(configured);
  if (!['https:', 'http:'].includes(site.protocol)) throw new Error('SITE_URL must be an HTTP(S) URL');
  const canonical = site.origin + '/';
  const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
  const graph = { '@context':'https://schema.org', '@type':'Organization', name:'Lost & Perdido', url:canonical, description:'Bilingual travel media and creator-led partnerships in English and Spanish.', email:'hola@lostandperdido.com', sameAs:['https://www.instagram.com/lostandperdido/','https://www.tiktok.com/@lostandperdido','https://www.youtube.com/@lostandperdido'] };
  const metadata = `<link rel="canonical" href="${escape(canonical)}">\n<meta property="og:url" content="${escape(canonical)}">\n<meta property="og:image" content="${escape(canonical)}assets/patagonia-closing.jpg">\n<meta property="og:image:alt" content="Patagonia mountain landscape">\n<script type="application/ld+json">${JSON.stringify(graph).replaceAll('<','\\u003c')}</script>\n`;
  await writeFile(join(output,'index.html'),(await readFile(join(output,'index.html'),'utf8')).replace('</head>',metadata+'</head>'));
  await writeFile(join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(canonical)}</loc></url></urlset>`);
  await writeFile(join(output,'robots.txt'),`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${canonical}sitemap.xml\n`);
}
console.log('Static site prepared in dist; poll deployed separately as a Netlify Function.');

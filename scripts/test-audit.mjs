import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
const root=fileURLToPath(new URL('../',import.meta.url));
export async function checkAudit() {
  const html=(await readFile(root+'index.html','utf8')).replace(/<!--[\s\S]*?-->/g,'');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  assert.equal(new Set(ids).size,ids.length,'Duplicate HTML IDs');
  for(const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id),`Missing anchor: ${id}`);
  for(const [tag] of html.matchAll(/<img\b[^>]*>/g)) assert.match(tag,/\balt="[^"]*"/,'Image needs alt text');
  for(const [tag] of html.matchAll(/<dialog\b[^>]*>/g)) assert.match(tag,/aria-label(?:ledby)?=/,'Dialog needs a name');
  for(const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(tag,/noopener/);
  let assets=0;
  for(const [,path] of html.matchAll(/(?:src|href|poster)="([^"#?:]+)"/g)) {await access(root+decodeURIComponent(path));assets++;}
  const context={window:{}};
  vm.runInNewContext(await readFile(root+'travel-photos.js','utf8'),context);
  for(const item of Object.values(context.window.travelPortfolios).flat()) for(const key of ['src','preview']) if(item[key]) {await access(root+item[key]);assets++;}
  vm.runInNewContext(await readFile(root+'editorial-books.js','utf8'),context);
  const books=context.window.lpEditorialData;
  assert.deepEqual(Array.from(books.offers,item=>item.id),[0,1,2,3,4,5],'Service links must map to magazine pages');
  assert.equal(books.passport.length,7,'Keep the complete passport journey');
  function checkTranslations(value){
    if(!value||typeof value!=='object') return;
    if('en' in value || 'es' in value){assert.ok(value.en?.trim(),'Missing English copy');assert.ok(value.es?.trim(),'Missing Spanish copy');}
    else Object.values(value).forEach(checkTranslations);
  }
  checkTranslations(books);
  for(const offer of books.offers){await access(root+offer.image);assets++;assert.equal(offer.deliver.length,3);assert.ok(offer.credit.en);}
  for(const stamp of books.stamps){await access(root+`assets/flag-${stamp.flag}.svg`);assets++;assert.equal(stamp.status.en,'Entry pending');}
  return `Audit passed: anchors, IDs, image alt attributes, dialog names, external-link protection and ${assets} asset references.`;
}
if(typeof process!=='undefined' && process.argv[1]?.endsWith('test-audit.mjs')) console.log(await checkAudit());

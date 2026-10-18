import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/collaboration'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 const form=page.locator('#collaboration-inquiry'),service=page.locator('#service-details'),reader=page.locator('#partner-reader');
 assert.equal(await page.locator('.contact-copy>.button,.contact-copy>.email-link').count(),0);
 assert.equal(await page.locator('.collab-card-number,.collab-frame-label').count(),0);
 assert.match(await page.locator('#collab-hub-title').textContent(),/Eat\. Sleep\. Play\. Repeat\./);
 assert.equal(await page.locator('a[href^="mailto:"]').count(),0);
 for(const [width,height] of [[1440,1000],[390,844],[320,640]]){
  await page.setViewportSize({width,height});
  await page.locator('button[data-service="1"]').click();
  const image=service.locator('.experience-frame').first().locator('img');assert((await image.getAttribute('src')).includes('C226A786'));
  await image.evaluate(async img=>{await img.decode();if(!img.naturalWidth)throw Error('Missing handshake image');});
  assert.equal(await service.locator('.destination-ticket,.studio-overline').count(),0);
  const bounds=await service.evaluate(e=>{const r=e.getBoundingClientRect();return e.scrollWidth<=e.clientWidth+1&&r.left>=0&&r.right<=innerWidth+1;});assert(bounds,'Service overflows '+width);
  await service.screenshot({path:`.local-data/collaboration/handshake-${width}.png`});
  await service.locator('.service-inquiry').click();assert(await form.evaluate(e=>e.open));assert.equal(await form.locator('[name=category]').inputValue(),'experiences');
  await page.keyboard.press('Escape');assert(await service.evaluate(e=>e.open));await page.keyboard.press('Escape');
  await page.locator('.partner-cover').click();await reader.locator('[data-page="2"]').click();
  const mateo=reader.locator('.studio-platform-dji .studio-scene');assert((await mateo.getAttribute('src')).includes('mateo-waterfall-bike'));
  await mateo.evaluate(async img=>{await img.decode();if(!img.naturalWidth)throw Error('Missing Mateo image');});
  await reader.screenshot({path:`.local-data/collaboration/mateo-partner-${width}.png`});
  await reader.locator('.editorial-inquiry').click();assert(await form.evaluate(e=>e.open));assert.equal(await form.locator('[name=category]').inputValue(),'partnerships');
  await page.keyboard.press('Escape');assert(await reader.evaluate(e=>e.open));assert(await reader.locator('.editorial-inquiry').evaluate(e=>e===document.activeElement));await page.keyboard.press('Escape');
  await page.locator('.editorial-end-cta').click();assert(await form.evaluate(e=>e.open));assert.equal(await form.locator('[name=category]').inputValue(),'other');await page.keyboard.press('Escape');
 }
 // Navbar works without scrolling or opening a mail client, including after translation.
 for(const lang of ['en','es']){
  await page.locator(`.lang-button[data-lang="${lang}"]`).evaluate(e=>e.click());
  await page.locator('.menu-toggle').click();
  await page.locator('.nav-contact[href="#contact"]').click();assert(await form.evaluate(e=>e.open));
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  assert((await form.locator('h2').textContent()).includes(lang==='es'?'Trabaja':'Work'));
  assert.equal(await page.locator('a[href^="mailto:"]').count(),0);
  await page.keyboard.press('Escape');assert(await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement));
 }
 await page.locator('.collab-hub').scrollIntoViewIfNeeded();await page.locator('.collab-hub').screenshot({path:'.local-data/collaboration/clean-cards.png'});
 assert.deepEqual(errors,[]);console.log('Original photos, clean cards, all CTA entry points, contextual subjects/categories, stacked-dialog focus, bilingual and mobile layouts passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

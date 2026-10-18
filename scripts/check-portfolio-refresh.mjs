import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/collaboration'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'}),errors=[];page.setDefaultTimeout(20000);page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 const service=page.locator('#service-details'),reader=page.locator('#partner-reader');
 await page.locator('button[data-service="1"]').evaluate(e=>e.click());
 const gallery=service.locator('.experience-gallery');await gallery.locator('.experience-frame img').evaluateAll(async imgs=>Promise.all(imgs.map(i=>i.decode())));
 assert.equal(await gallery.getAttribute('data-photo'),'0');
 await page.waitForFunction(()=>document.querySelector('#service-details .experience-gallery')?.dataset.photo==='1',{},{timeout:7000});
 assert.match(await gallery.locator('.experience-caption strong').textContent(),/Macky Sall/);
 await gallery.locator('.experience-pause').click();await page.mouse.move(0,0);await page.locator('#service-title').click();
 await page.waitForTimeout(5200);assert.equal(await gallery.getAttribute('data-photo'),'1','Pause must hold the current image');
 await gallery.screenshot({path:'.local-data/collaboration/encounter-desktop.png'});await page.keyboard.press('Escape');
 for(const width of [390,320]){
  await page.setViewportSize({width,height:844});
  for(const lang of ['en','es']){
   await page.locator(`[data-lang="${lang}"]`).evaluate(e=>e.click());await page.emulateMedia({reducedMotion:'reduce'});
   await page.locator('button[data-service="1"]').evaluate(e=>e.click());
   assert.equal(await gallery.getAttribute('data-photo'),'0');
   await gallery.locator('[data-encounter="1"]').click();
   assert((await gallery.locator('.experience-caption strong').textContent()).includes('Macky Sall'));
   assert.equal(await gallery.locator('.experience-frame.is-active').count(),1);
   assert(await gallery.evaluate(e=>e.scrollWidth<=e.clientWidth+1));
   if(width===390)await service.screenshot({path:`.local-data/collaboration/encounter-mobile-${lang}.png`});
   await page.keyboard.press('Escape');
   await page.locator('button[data-service="3"]').evaluate(e=>e.click());
   for(const choice of ['instagram','youtube','tiktok']){
    await service.locator(`[data-phone-choice="${choice}"]`).click();
    const shot=service.locator('.studio-scene');assert((await shot.getAttribute('src')).includes('john-colombia-cave'));await shot.evaluate(i=>i.decode());
    assert.equal(await service.locator('.stingray-badge').count(),0);
   }
   await service.locator('[data-phone-choice="instagram"]').click();
   if(width===390&&lang==='en')await service.locator('.modern-phone-stage').screenshot({path:'.local-data/collaboration/social-taj.png'});
   await page.keyboard.press('Escape');
   const hotel=page.locator('.collab-card[data-collab="1"]');assert((await hotel.locator('img').getAttribute('src')).includes('mateo-terrace-moment'));await hotel.scrollIntoViewIfNeeded();await hotel.locator('img').evaluate(i=>i.decode());
   if(width===390&&lang==='en')await hotel.screenshot({path:'.local-data/collaboration/hotel-mateo.png'});
  }
 }
 await page.locator('[data-lang="en"]').evaluate(e=>e.click());await page.locator('.partner-cover').click();
 assert((await reader.locator('.editorial-photo>img').getAttribute('src')).includes('john-duomo'));
 await reader.locator('[data-page="1"]').click();assert.equal(await reader.locator('.experience-frame').count(),7);
 await reader.locator('[data-encounter="1"]').click();assert.match(await reader.locator('.experience-caption strong').textContent(),/Macky Sall/);
 await reader.locator('[data-page="3"]').click();assert.equal(await reader.locator('.experience-gallery').count(),0);
 assert((await reader.locator('.studio-scene').getAttribute('src')).includes('john-taj-gardens'));
 await page.keyboard.press('Escape');await page.locator('button[data-service="0"]').evaluate(e=>e.click());
 assert((await service.locator('[data-ugc-gallery]>img').first().getAttribute('src')).includes('john-duomo'));
 await service.locator('[data-ugc-gallery]>img').first().evaluate(i=>i.decode());
 await service.locator('.ugc-device-stage').screenshot({path:'.local-data/collaboration/ugc-granite.png'});
 assert.deepEqual(errors,[]);console.log('Refreshed photos, 5-second encounter rotation, pause/reopen, both languages, mobile fits, all social previews and magazine views passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

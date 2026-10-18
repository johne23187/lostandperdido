import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/ugc-rotation'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'no-preference'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 await page.locator('button[data-service="0"]').evaluate(e=>e.click());
 await page.waitForFunction(()=>document.querySelector('[data-ugc-gallery]')?.dataset.slide==='0');
 assert.equal(await page.locator('.ugc-phone .ig-wordmark').textContent(),'Instagram');
 assert((await page.locator('[data-ugc-gallery]>img').first().getAttribute('src')).includes('john-duomo.webp'));
 assert.equal(await page.locator('#service-details img[src*="ugc-hotel-concept"]').count(),0);
 await page.evaluate(()=>{window.photoChanges=[{index:0,time:performance.now()}];const host=document.querySelector('[data-ugc-gallery]');new MutationObserver(()=>window.photoChanges.push({index:Number(host.dataset.slide),time:performance.now()})).observe(host,{attributes:true,attributeFilter:['data-slide']});});
 await page.waitForFunction(()=>document.querySelector('[data-ugc-gallery]').dataset.slide==='2',{},{timeout:15000});
 const changes=await page.evaluate(()=>window.photoChanges);assert.deepEqual(changes.map(c=>c.index),[0,1,2]);assert(Math.abs(changes[2].time-changes[1].time-5000)<400,'Photos must advance every five seconds');
 await page.waitForTimeout(650);assert.equal(await page.locator('[data-ugc-gallery]>img').count(),1);
 await page.locator('.ugc-photo-pause').click();const before=await page.locator('[data-ugc-gallery]').getAttribute('data-slide');await page.waitForTimeout(5200);assert.equal(await page.locator('[data-ugc-gallery]').getAttribute('data-slide'),before);
 await page.locator('.ugc-device-stage').screenshot({path:'.local-data/room-audit/ugc-personal-photos.png'});
 await page.keyboard.press('Escape');await page.locator('button[data-service="0"]').evaluate(e=>e.click());await page.waitForFunction(()=>document.querySelector('[data-ugc-gallery]')?.dataset.slide==='0');assert.equal(await page.locator('.ugc-photo-pause').count(),1);
 await page.keyboard.press('Escape');await page.locator('[data-lang="es"]').evaluate(e=>e.click());await page.emulateMedia({reducedMotion:'reduce'});await page.locator('button[data-service="0"]').evaluate(e=>e.click());
 await page.waitForFunction(()=>document.querySelector('[data-ugc-gallery]')?.dataset.slide==='1',{},{timeout:8000});assert((await page.locator('[data-ugc-gallery]>img').getAttribute('alt')).includes('comida'));assert.equal(await page.locator('[data-ugc-gallery]>img').count(),1);
 assert.deepEqual(errors,[]);console.log('UGC Instagram layout, personal photos, 5-second rotation, pause, reopen, Spanish and reduced-motion swaps passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

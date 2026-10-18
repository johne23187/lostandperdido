import assert from 'node:assert/strict';
import {createSiteServer} from './server.mjs';
import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/collaboration'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{window.arrivalTestTime=Date.parse('2026-10-18T03:00:00Z');Date.now=()=>window.arrivalTestTime;});
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 for(const country of ['Argentina','Chile','Bolivia']){
  const timer=page.locator(`.countdown[data-country="${country}"]`);
  const arrival=Date.parse(await timer.getAttribute('data-arrival'));
  await page.evaluate(time=>{window.arrivalTestTime=time;updateCountdowns();},arrival-1);
  assert.equal(await timer.locator('.countdown-unit').count(),4);
  await page.evaluate(time=>{window.arrivalTestTime=time;updateCountdowns();},arrival);
  assert.equal(await timer.locator('.arrival-officially-lost').textContent(),'OFFICIALLY LOST');
  assert.equal(await timer.locator('.countdown-unit').count(),0);
  assert.equal(await timer.locator('time').getAttribute('datetime'),(await timer.getAttribute('data-arrival')).slice(0,10));
 }
 await page.evaluate(()=>{window.arrivalTestTime=Date.parse('2026-10-18T03:00:00Z');updateCountdowns();});
 for(const width of [320,390,430,1440]){
  await page.setViewportSize({width,height:844});
  for(const lang of ['en','es']){
   await page.locator(`[data-lang="${lang}"]`).evaluate(e=>e.click());
   const timer=page.locator('.argentina .countdown');
   assert.equal(await timer.locator('strong').textContent(),lang==='es'?'OFICIALMENTE PERDIDOS':'OFFICIALLY LOST');
   assert(await timer.evaluate(e=>{const h=e.querySelector('strong').getBoundingClientRect(),d=e.querySelector('time').getBoundingClientRect(),p=e.closest('.route-photo-frame').getBoundingClientRect();return h.bottom<d.top&&h.left>=p.left&&h.right<=p.right&&h.top>=p.top&&d.bottom<=p.bottom;}),`Arrival layout ${width}/${lang}`);
   const invitation=page.locator('.lost-invitation');
   assert(await invitation.evaluate(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.left>=0&&r.right<=innerWidth&&s.fontWeight==='900'&&s.fontFamily.includes('Arial Black')&&s.borderTopWidth==='0px';}),`Invitation layout ${width}/${lang}`);
   if(width===390&&lang==='en'){
    await page.locator('.argentina .route-photo-frame').scrollIntoViewIfNeeded();
    await page.locator('.argentina .route-photo-frame>img').evaluate(i=>i.decode());
    await page.locator('.argentina .route-photo-frame').screenshot({path:'.local-data/collaboration/officially-lost-mobile.png'});
    await invitation.screenshot({path:'.local-data/collaboration/lost-invitation-new-font.png'});
   }
  }
 }
 assert.deepEqual(errors,[]);console.log('Three arrival boundaries, date labels, future countdowns and EN/ES mobile/desktop typography passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

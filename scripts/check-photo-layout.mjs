import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/collaboration'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 for(const width of [320,375,390,430,1440]){
  await page.setViewportSize({width,height:844});
  for(const lang of ['en','es']){
   await page.locator(`[data-lang="${lang}"]`).evaluate(e=>e.click());
   const cta=page.locator('.lost-invitation');await cta.scrollIntoViewIfNeeded();
   assert(await cta.evaluate(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.left>=0&&r.right<=innerWidth&&s.borderTopWidth==='0px'&&s.backgroundColor==='rgba(0, 0, 0, 0)'&&s.fontWeight==='900'&&s.fontFamily.includes('Arial Black');}),'Caution invitation must fit without a box');
   if(width===390&&lang==='en')await cta.screenshot({path:'.local-data/collaboration/caution-invitation.png'});
   for(let service=0;service<6;service++){
    await page.locator(`button[data-service="${service}"]`).evaluate(e=>e.click());
    const dialog=page.locator('#service-details');assert(await dialog.evaluate(e=>{const r=e.getBoundingClientRect();return e.scrollWidth<=e.clientWidth+1&&r.left>=0&&r.right<=innerWidth+1;}),`Service ${service} overflow at ${width}/${lang}`);
    if(service===0){
     const badge=dialog.locator('.ugc-personal-gallery>.destination-mark');await badge.scrollIntoViewIfNeeded();
     assert(await badge.evaluate(e=>{const r=e.getBoundingClientRect(),label=e.parentElement.querySelector(':scope>span').getBoundingClientRect();return r.bottom<=label.top||r.top>=label.bottom||r.right<=label.left||r.left>=label.right;}),'Logo overlaps UGC Concept');
     if(width===390&&lang==='en')await dialog.locator('.ugc-device-stage').screenshot({path:'.local-data/collaboration/ugc-logo-clear.png'});
    }
    if(service===2){
     const drone=dialog.locator('.studio-platform-dji .studio-product');await drone.scrollIntoViewIfNeeded();
     assert(await drone.evaluate(e=>{const r=e.getBoundingClientRect(),p=e.parentElement.getBoundingClientRect(),brand=e.parentElement.querySelector('.studio-brand-lockup').getBoundingClientRect();return r.left>=p.left&&r.right<=p.left+p.width*.42&&r.top>=brand.bottom&&r.bottom<=p.bottom;}),'Drone must clear brand and Mateo on the right');
     if(width===390&&lang==='en')await dialog.locator('.modern-phone-stage').screenshot({path:'.local-data/collaboration/drone-clear-mateo.png'});
    }
    if(service===1){
     for(let photo=2;photo<7;photo++){
      await dialog.locator(`[data-encounter="${photo}"]`).click();
      const frame=dialog.locator('.experience-frame.is-active');await frame.locator(':scope>img').evaluate(i=>i.decode());
      assert.equal(await frame.locator('.destination-mark').count(),1);
      assert.equal(await dialog.locator('.experience-frame:not(.is-active):not([inert])').count(),0);
     }
    }
    await page.keyboard.press('Escape');
   }
  }
 }
 // A destination link beside a portfolio photo must not steal the photo button.
 await page.evaluate(()=>window.openCountryPortfolio({name:'Antigua',travelers:['john']},document.body));
 const ray=page.locator('.portfolio-tile-holder').filter({has:page.locator('.destination-mark-stingray')}).first();
 await ray.locator('button').click();assert.equal(await page.locator('.lightbox-media>.destination-mark-stingray').count(),1);
 await page.keyboard.press('Escape');await page.keyboard.press('Escape');
 assert.deepEqual(errors,[]);console.log('All six services fit five widths in EN/ES; UGC label, drone, red invitation, seven gallery frames and portfolio links are clear.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

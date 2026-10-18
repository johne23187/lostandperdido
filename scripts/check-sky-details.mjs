import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/room-audit'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let posts=[];await page.route('**/api/stories',route=>route.fulfill({json:{stories:posts}}));
 await page.addInitScript(()=>{window.cueNotes=[];const original=OscillatorNode.prototype.start;OscillatorNode.prototype.start=function(...args){if(new Error().stack.includes('sky-interactions.js'))window.cueNotes.push(this.frequency.value);return original.apply(this,args);};});
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 await page.setViewportSize({width:390,height:844});
 await page.locator('.shelf-guide').screenshot({path:'.local-data/room-audit/natural-arms.png'});
 if(await page.locator('.shelf-guide text').count())throw Error('Jumpsuit patch remains');
 await page.locator('.lost-invitation').screenshot({path:'.local-data/room-audit/lost-stamp.png'});await page.locator('.lost-invitation').click();await page.keyboard.press('Escape');
 for(const selector of ['.location-gps','.satellite','.saturn-touch','.saturn-touch']){const before=await page.evaluate(()=>cueNotes.length);await page.locator(selector).evaluate(e=>e.click());await page.waitForTimeout(150);if(await page.evaluate(()=>cueNotes.length)<=before)throw Error('No sound '+selector);if(selector!=='.saturn-touch')await page.keyboard.press('Escape');}
 await page.locator('.location-gps').evaluate(e=>e.click());if(await page.locator('#gps-tracker-title .lost-red').count()!==1)throw Error('Red Lost missing');
 for(const [width,height] of [[390,844],[320,640],[844,390]]){await page.setViewportSize({width,height});await page.locator('.gps-expanded-screen .where-next-ship').evaluate(e=>e.click());await page.locator('#where-next').waitFor({state:'visible'});const fits=await page.locator('#where-next').evaluate(e=>e.scrollHeight<=e.clientHeight+1&&e.scrollWidth<=e.clientWidth+1);if(!fits)throw Error('Destination overflow '+width);await page.screenshot({path:'.local-data/room-audit/alien-room-'+width+'.png'});await page.keyboard.press('Escape');}
 await page.keyboard.press('Escape');await page.emulateMedia({reducedMotion:'no-preference'});
 const cues=await page.locator('.figure-click-arrow').evaluateAll(nodes=>nodes.map(e=>getComputedStyle(e).animationName));if(!cues.every(s=>s.includes('click-hand-blink')&&s.includes('figure-arrow-tap')))throw Error('Both hands must animate');
 if(errors.length)throw Error(errors.join('; '));console.log('Figure details, stamp CTA, GPS/satellite/repeated Saturn audio, red title, alien room fit and both hand animations passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

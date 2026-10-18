import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/room-audit'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let posts=[];await page.route('**/api/stories',route=>route.fulfill({json:{stories:posts}}));
 await page.addInitScript(()=>{
  window.ufoLaunches=0;document.addEventListener('lp:ufolaunch',()=>window.ufoLaunches++);
  const connect=AudioNode.prototype.connect;
  AudioNode.prototype.connect=function(destination,...args){
   if(destination instanceof AudioDestinationNode&&new Error().stack.includes('sky-interactions.js')){
    const meter=this.context.createAnalyser();meter.fftSize=2048;window.skyMeter=meter;connect.call(this,meter);return connect.call(meter,destination,...args);
   }
   return connect.call(this,destination,...args);
  };
  window.soundLevel=()=>{const meter=window.skyMeter;if(!meter)return 0;const data=new Float32Array(meter.fftSize);meter.getFloatTimeDomainData(data);return Math.sqrt(data.reduce((sum,n)=>sum+n*n,0)/data.length);};
 });
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'no-preference'});
 await page.locator('.passport-object').evaluate(e=>e.click());
 await page.locator('#passport-reader [data-page="4"]').click();await page.locator('#passport-reader [data-step="1"]').click();await page.waitForTimeout(1700);
 const ufo=page.locator('.passport-ufo-dock .where-next-ship');await ufo.scrollIntoViewIfNeeded();await ufo.click();await page.waitForTimeout(450);
 if(await page.locator('#where-next').isVisible())throw Error('Screen opens before launch');
 if(await page.evaluate(()=>window.soundLevel())<.005)throw Error('UFO sound is silent');
 await page.screenshot({path:'.local-data/room-audit/ufo-pilot.png'});await ufo.evaluate(e=>e.click());
 if(await page.evaluate(()=>window.ufoLaunches)!==1)throw Error('Repeated click restarted UFO sound');
 await page.locator('#where-next').waitFor({state:'visible'});await page.keyboard.press('Escape');
 await ufo.evaluate(e=>e.click());await page.keyboard.press('Escape');await page.waitForTimeout(1500);if(await page.locator('#where-next').isVisible())throw Error('Launch not canceled');
 if(await page.evaluate(()=>window.soundLevel())>.001)throw Error('Canceled UFO sound still playing');
 await page.keyboard.press('Escape');await page.locator('.location-gps').evaluate(e=>e.click());await page.locator('.gps-expanded-screen .where-next-ship').click();await page.locator('#where-next').waitFor({state:'visible'});await page.keyboard.press('Escape');await page.keyboard.press('Escape');
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.location-gps').evaluate(e=>e.click());await page.locator('.gps-expanded-screen .where-next-ship').evaluate(e=>e.click());await page.locator('#where-next').waitFor({state:'visible',timeout:500});
 if(errors.length)throw Error(errors.join('; '));console.log('UFO audio output, alien, delayed arrival, both launch locations, repeat taps, cancellation and reduced motion passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

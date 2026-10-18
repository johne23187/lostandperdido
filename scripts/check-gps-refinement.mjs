import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/gps-mobile-audit'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--autoplay-policy=user-gesture-required']});const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let posts=[];await page.route('**/api/stories',route=>route.fulfill({json:{stories:posts}}));
 await page.addInitScript(()=>{
  window.gpsStarts=0;window.gpsStopped=true;
  const start=AudioBufferSourceNode.prototype.start,stop=AudioBufferSourceNode.prototype.stop;
  AudioBufferSourceNode.prototype.start=function(...args){if(this.buffer?.duration>4&&this.buffer?.duration<4.3){window.gpsStarts++;window.gpsStopped=false;window.gpsContext=this.context;const meter=this.context.createAnalyser();this.connect(meter);window.gpsMeter=meter;this.addEventListener('ended',()=>window.gpsStopped=true);}return start.apply(this,args);};
  AudioBufferSourceNode.prototype.stop=function(...args){if(this.buffer?.duration>4&&this.buffer?.duration<4.3)window.gpsStopped=true;return stop.apply(this,args);};
 });
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 for(const width of [320,375,390,430]){
 await page.setViewportSize({width,height:640});
 await page.locator('.saturn-touch').scrollIntoViewIfNeeded();await page.locator('.saturn-touch').click();
 const q=await page.locator('.saturn-note').boundingBox();if(q.x<0||q.x+q.width>width)throw Error('Quest clipped at '+width);
 if(width===320){await page.waitForTimeout(5100);if(await page.locator('.saturn-note').isVisible())throw Error('Quest did not dismiss');}
 const starts=await page.evaluate(()=>gpsStarts);
 if(width===375||width===430)await page.locator('[data-sky="gps"]').click();
 else if(width===390){await page.locator('.location-gps').focus();await page.keyboard.press('Enter');}
 else await page.locator('.location-gps').click();
 await page.waitForFunction(before=>gpsStarts===before+1,starts);
 // Measure the recording after the startup chime has ended.
 await page.waitForTimeout(2300);
 const rms=await page.evaluate(async()=>{let energy=0;for(let i=0;i<10;i++){const samples=new Float32Array(gpsMeter.fftSize);gpsMeter.getFloatTimeDomainData(samples);energy+=samples.reduce((sum,v)=>sum+v*v,0)/samples.length;await new Promise(r=>setTimeout(r,30));}return Math.sqrt(energy/10);});
 if(rms<.01||await page.evaluate(()=>gpsContext.state!=='running'||gpsStopped))throw Error('GPS voice silent: '+rms);
 const fit=await page.locator('.gps-expanded-device').evaluate(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight;});if(!fit)throw Error('GPS clipped at '+width);
 const order=await page.locator('.gps-travelers>svg').evaluate(e=>[...e.children].slice(-2).every(n=>n.matches('image.illustrated-host-portrait')));if(!order)throw Error('Faces behind clothes');
 await page.screenshot({path:'.local-data/room-audit/gps-refined-'+width+'.png'});await page.keyboard.press('Escape');if(!await page.evaluate(()=>gpsStopped))throw Error('GPS voice continues after close');
 }
 if(errors.length)throw Error(errors.join('; '));console.log('GPS voice playback/stop, face layering and GPS/quest framing passed at 320, 375, 390 and 430px.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

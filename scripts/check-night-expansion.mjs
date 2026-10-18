import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/night-expansion'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{const connect=AudioNode.prototype.connect;AudioNode.prototype.connect=function(destination,...args){if(destination instanceof AudioDestinationNode&&new Error().stack.includes('sky-interactions.js')){const meter=this.context.createAnalyser();meter.fftSize=2048;window.starMeter=meter;connect.call(this,meter);return connect.call(meter,destination,...args);}return connect.call(this,destination,...args);};});
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 await page.locator('.after-dark-moon').click();
 const cities=await page.locator('.night-city option').evaluateAll(nodes=>nodes.map(n=>n.value));
 if(cities.length!==8||cities.includes('BA'))throw Error('Destination list should exclude Buenos Aires');
 for(const city of cities){
  await page.locator('[data-night="0"]').click();await page.locator('.night-city').selectOption(city);
  if(!await page.locator('.night-venue').count())throw Error('No nightlife for '+city);
  await page.locator('[data-night="1"]').click();if(await page.locator('.night-city').inputValue()!==city)throw Error('City not preserved');
  if(await page.locator('.night-adventure').count()<2)throw Error('Too few adventures for '+city);
  const filters=await page.locator('[data-adventure]').evaluateAll(nodes=>nodes.map(n=>n.dataset.adventure));
  for(const filter of filters){await page.locator('[data-adventure="'+filter+'"]').click();if(!await page.locator('.night-adventure').count())throw Error('Empty adventure filter '+city+filter);}
 }
 await page.locator('.night-city').selectOption('AG');
 for(const title of ['Bay Gardens','LOCAL Shop & Tasting Bar','Shirley Heights / Thursday','Shirley Heights / Sunday','Caribbean Cinemas','Agave Gardens','Cricket under the lights','Drag racing at North Sound','Dickenson Bay / Sunset','Kon Tiki Floating Bar','Jolly Beach / Sunset']){
  if(!await page.getByRole('heading',{name:title,exact:true}).count())throw Error('Missing '+title);
 }
 for(const width of [320,390,430]){await page.setViewportSize({width,height:844});await page.locator('.night-city').scrollIntoViewIfNeeded();if(await page.locator('#lost-after-dark').evaluate(e=>e.scrollWidth>e.clientWidth+1))throw Error('Horizontal overflow '+width);if(width===390)await page.screenshot({path:'.local-data/room-audit/antigua-adventures.png'});}
 await page.locator('.night-adventure').first().scrollIntoViewIfNeeded();await page.screenshot({path:'.local-data/room-audit/antigua-adventure-cards.png'});
 await page.evaluate(()=>{document.documentElement.lang='es';document.dispatchEvent(new Event('lp:languagechange'));});
 if(await page.locator('.night-city').inputValue()!=='AG'||!await page.getByRole('button',{name:'Deportes y carreras',exact:true}).count())throw Error('Spanish menu failed');
 await page.keyboard.press('Escape');
 await page.locator('.watch-section').evaluate(e=>{const r=e.getBoundingClientRect();window.scrollTo({top:scrollY+r.top+Math.max(0,(r.height-innerHeight)/2),behavior:'instant'});});
 await page.emulateMedia({reducedMotion:'no-preference'});
 const before=await page.locator('.space-plane').getAttribute('style');
 await page.locator('.space-plane').evaluate(e=>e.dispatchEvent(new MouseEvent('click',{bubbles:true})));
 await page.waitForFunction(before=>document.querySelector('.space-plane').getAttribute('style')!==before,before);
 if(await page.locator('.space-plane').evaluate(e=>e.hasAttribute('aria-pressed')||getComputedStyle(e).pointerEvents!=='none'))throw Error('Rocket pause behavior remains');
 await page.locator('.little-detour-star').evaluate(e=>{window.starClickedAt=performance.now();e.click();});
 await page.waitForTimeout(400);
 const rms=await page.evaluate(()=>{const data=new Float32Array(starMeter.fftSize);starMeter.getFloatTimeDomainData(data);return Math.sqrt(data.reduce((sum,v)=>sum+v*v,0)/data.length);});if(rms<.003)throw Error('Arcade audio output silent');
 if(await page.locator('#little-detour').evaluate(e=>e.open))throw Error('Star opens too early');
 const eye=await page.locator('.little-detour-star .power-star-eyes').evaluate(e=>({hidden:getComputedStyle(e).display==='none',animation:getComputedStyle(e).animationName}));
 if(!eye.hidden||eye.animation!=='none')throw Error('Eyes visible during spin');
 await page.waitForFunction(()=>document.querySelector('#little-detour').open);
 const elapsed=await page.evaluate(()=>performance.now()-starClickedAt);if(elapsed<1050||elapsed>1800)throw Error('Wrong power-up duration '+elapsed);
 await page.waitForFunction(()=>document.querySelector('#little-detour').classList.contains('schedule-ready'));
 await page.waitForTimeout(900);
 if(!await page.locator('#little-detour .power-star-eyes').isVisible())throw Error('Eyes missing on arrival');
 await page.screenshot({path:'.local-data/room-audit/star-new-arrival.png'});
 if(errors.length)throw Error(errors.join('; '));
 console.log('Eight cities, adventure filters, all Antigua additions, Spanish, mobile fit, continuous rocket flight and original short star spin with closing eyes passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE||join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
import { createSiteServer } from './server.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
const server=await createSiteServer({dataDir:'.local-data/graphics-audit'});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser;
const report={errors:[],views:[]};
try{
 browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage();page.setDefaultTimeout(10000);
 page.on('pageerror',error=>report.errors.push(error.message));
 const base=`http://127.0.0.1:${server.address().port}`;
 await page.goto(base,{waitUntil:'domcontentloaded',timeout:45000});await page.waitForTimeout(1800);
 await mkdir('.local-data/graphics-audit',{recursive:true});
 for(const width of (process.env.AUDIT_WIDTHS||'320,375,390,430,768,1440').split(',').map(Number)){
  await page.setViewportSize({width,height:900});
  await page.waitForTimeout(500);
  report.views.push(await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('main *')].filter(e=>{let b=e.getBoundingClientRect();return b.width&&b.right>innerWidth+3&&getComputedStyle(e).position!=='fixed'}).slice(0,12).map(e=>({tag:e.tagName,cls:e.className}))})));
  await page.locator('#learn').scrollIntoViewIfNeeded().catch(()=>{});
  if(process.env.AUDIT_SCREENSHOTS==='1')await page.screenshot({path:`.local-data/graphics-audit/learn-${width}.png`});
  await page.evaluate(()=>window.openPartnerMagazine(4,document.querySelector('.partner-cover')));
  await page.waitForTimeout(800);
  report.views.push(await page.evaluate(()=>{let d=document.querySelector('dialog[open]');return {width:innerWidth,dialog:d?.id,client:d?.clientWidth,scroll:d?.scrollWidth,broken:[...d.querySelectorAll('img')].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)}}));
  if(process.env.AUDIT_SCREENSHOTS==='1')await page.screenshot({path:`.local-data/graphics-audit/photos-${width}.png`});
  await page.keyboard.press('Escape');
  // Exercise every book spread and check actual dialog width.
  await page.locator('.passport-object').click().catch(async()=>{await page.locator('[aria-controls="passport-reader"]').first().click();});
  for(const id of ['passport-reader','partner-reader']){
   if(id==='partner-reader')await page.evaluate(()=>window.openPartnerMagazine(0,document.querySelector('.partner-cover')));
   let count=await page.locator('#'+id+' .reader-directory [data-page]').count();
   if(id==='passport-reader'&&width<=700)count*=2;
   for(let i=0;i<count;i++){
    if(i)await page.locator('#'+id+' [data-step="1"]').click();
    await page.locator('#'+id+' .reader-paper').evaluate(async e=>{await Promise.all(e.getAnimations().filter(a=>a.effect.getTiming().iterations!==Infinity).map(a=>a.finished.catch(()=>{})));});
    report.views.push(await page.locator('#'+id).evaluate(d=>({width:innerWidth,dialog:d.id,spread:d.querySelector('.reader-status')?.textContent,client:d.clientWidth,scroll:d.scrollWidth})));
   }
   await page.keyboard.press('Escape');
  }
  await page.locator('.after-dark-moon').click();
  await page.waitForTimeout(3100);
  report.views.push(await page.locator('#lost-after-dark').evaluate(d=>({width:innerWidth,dialog:d.id,client:d.clientWidth,scroll:d.scrollWidth,entranceFinished:!d.classList.contains('after-dark-entering')})));
  if(process.env.AUDIT_SCREENSHOTS==='1')await page.screenshot({path:`.local-data/graphics-audit/dark-${width}.png`});
  await page.keyboard.press('Escape');
  await page.locator('.gps-with-guide').scrollIntoViewIfNeeded();
  const astronautBox=await page.locator('.gps-guide').boundingBox();
  await page.mouse.move(astronautBox.x+astronautBox.width/2,astronautBox.y+astronautBox.height/2);
  await page.locator('.gps-guide').click();
  report.views.push({width,gpsMessage:await page.locator('#gps-astronaut-message').isVisible()});
  await page.locator('.how-we-met-link').click();
  await page.waitForTimeout(400);
  if(process.env.AUDIT_SCREENSHOTS==='1')await page.screenshot({path:`.local-data/graphics-audit/book-${width}.png`});
  console.log('Checked width '+width);
  await page.keyboard.press('Escape');
 }
 // Reduced motion must cancel the looping lost-word animation.
 await page.locator('.discovery-title').scrollIntoViewIfNeeded();
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.waitForTimeout(100);
 report.reducedMotion=await page.locator('.discovery-lost').evaluate(e=>e.getAnimations().length===0);
 report.failures=report.views.filter(v=>v.scroll>v.client+2 || (!v.dialog&&v.scroll>v.width+2) || v.entranceFinished===false || v.gpsMessage===false);
 if(report.errors.length||report.failures.length)process.exitCode=1;
 await writeFile('.local-data/graphics-audit/report.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({errors:report.errors,failures:report.failures,states:report.views.length,reducedMotion:report.reducedMotion}));
}finally{await writeFile('.local-data/graphics-audit/report.json',JSON.stringify(report,null,2));await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}


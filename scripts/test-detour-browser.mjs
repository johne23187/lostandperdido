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

 for(const width of [320,1440]){
  await page.setViewportSize({width,height:900});
  await page.locator('#watch').scrollIntoViewIfNeeded();
  await page.waitForTimeout(5500);
  await page.locator('.little-detour-star').click();
  await page.waitForTimeout(4100);
  const modal=page.locator('.star-schedule');
  if(!await modal.evaluate(e=>e.open&&e.classList.contains('schedule-ready')))throw Error('Schedule did not reveal');
  if(!await modal.evaluate(e=>e.scrollWidth<=e.clientWidth+1&&e.getBoundingClientRect().right<=innerWidth))throw Error('Schedule overflow');
  if(!await modal.textContent().then(t=>t.includes('8 PM EST')&&t.includes('November 1, 2026')))throw Error('Schedule missing');
  await page.screenshot({path:'.local-data/graphics-audit/star-schedule-'+width+'.png'});
  await page.keyboard.press('Escape');
  if(!await page.locator('.little-detour-star').evaluate(e=>e===document.activeElement))throw Error('Focus not restored');
 }
 if(report.errors.length)throw Error(report.errors.join('; '));
 console.log('Star schedule passed: mobile/desktop fit, reveal, schedule text, Escape and focus restoration, no runtime errors.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

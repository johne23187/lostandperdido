import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/room-audit'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let posts=[];await page.route('**/api/stories',route=>route.fulfill({json:{stories:posts}}));
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:390,height:844});
 await page.locator('.after-dark-moon').evaluate(e=>e.click());await page.locator('#lost-after-dark').waitFor({state:'visible'});await page.waitForTimeout(4470);await page.screenshot({path:'.local-data/room-audit/dance-split.png'});
 const finale=await page.locator('.dancer-finale').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).m42);if(finale<120)throw Error('Split drop not reached');
 await page.waitForTimeout(700);await page.screenshot({path:'.local-data/room-audit/neon-after-dark.png'});await page.keyboard.press('Escape');
 await page.locator('.saturn-touch').click();const first=await page.locator('.saturn-note').textContent();await page.locator('.saturn-touch').click();const second=await page.locator('.saturn-note').textContent();if(first===second||!second.includes('SIDE QUEST'))throw Error('Saturn mission failed');
 if(errors.length)throw Error(errors.join('; '));console.log('Split finale, neon screen and unlimited Saturn missions passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

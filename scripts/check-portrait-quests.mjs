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
 await page.setViewportSize({width:390,height:844});
 await page.locator('.how-we-met-link').screenshot({path:'.local-data/room-audit/book-cover-faces.png'});
 if(await page.locator('.storybook-cover .illustrated-host-portrait').count()!==2||await page.locator('.storybook-cover .host-outfit').count())throw Error('Cover should contain two portraits without bodies');
 await page.locator('.closing').screenshot({path:'.local-data/room-audit/closing-click-hands.png'});
 const seen=new Set();for(let i=0;i<48;i++){await page.locator('.saturn-touch').evaluate(e=>e.click());const quest=await page.locator('.saturn-note strong').textContent();if(seen.has(quest))throw Error('Quest repeats before deck exhausted');seen.add(quest);}await page.locator('.saturn-touch').evaluate(e=>e.click());if(await page.locator('.saturn-note small').count())throw Error('Timer remains');
 const heads=await page.locator('.guide-nodding-head').evaluateAll(nodes=>nodes.every(n=>n.querySelector('image.illustrated-host-portrait')&&!n.querySelector('circle')));if(!heads)throw Error('Guide portrait missing');
 await page.locator('.satellite').scrollIntoViewIfNeeded();await page.screenshot({path:'.local-data/room-audit/portrait-satellite.png'});
 await page.locator('.garnish-conversation').screenshot({path:'.local-data/room-audit/portrait-learning.png'});
 await page.locator('.location-gps').click();if(await page.locator('.gps-travelers .illustrated-host-portrait').count()!==2)throw Error('GPS pair missing');await page.screenshot({path:'.local-data/room-audit/portrait-gps.png'});await page.keyboard.press('Escape');
 await page.locator('.mountain-sitter').click();await page.waitForTimeout(1200);await page.locator('.closing').screenshot({path:'.local-data/room-audit/portrait-closing.png'});
 await page.locator('.passport-object').evaluate(e=>e.click());await page.waitForTimeout(500);if(await page.locator('.storybook-friends:not([data-portrait])').count())throw Error('Dynamic cover not converted');
 if(errors.length)throw Error(errors.join('; '));console.log('Unlimited quests without early repeats, guide faces, GPS pair and dynamic book portraits passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

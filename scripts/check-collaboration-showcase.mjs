import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/collaboration'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const destinations={
  '0:0':'https://www.facebook.com/Ristorante-Le-Regioni-578550282238233/',
  '1:0':'https://www.airbnb.com/',
  '1:1':'https://terroubi.com/en/','1:2':'https://terroubi.com/en/',
  '2:0':'https://stingraycityantigua.com/','2:1':'https://www.nps.gov/yose/index.htm','2:2':'https://www.catedraldesal.gov.co/'
 };
 for(const href of new Set(Object.values(destinations)))await page.context().route(href,route=>route.fulfill({contentType:'text/html',body:'<title>Destination link test</title>'}));
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
 assert.equal(await page.locator('.collab-card').count(),3);
 await page.locator('.collab-hub').scrollIntoViewIfNeeded();await page.locator('.collab-hub').screenshot({path:'.local-data/collaboration/desktop-cards.png'});
 for(let category=0;category<3;category++){
  await page.locator(`[data-collab="${category}"]`).click();
  assert.equal(await page.locator('#collaboration-showcase .section-compass-dock').count(),0);
  assert.equal(await page.locator(`#collab-tab-${category}`).getAttribute('aria-selected'),'true');
  for(let photo=0;photo<3;photo++){
   await page.locator(`[data-collab-shot="${photo}"]`).click();
   await page.locator('.collab-hero>img').evaluate(async img=>{await img.decode();if(!img.naturalWidth)throw Error('Photo missing');});
   assert.equal(await page.locator(`[data-collab-shot="${photo}"]`).getAttribute('aria-pressed'),'true');
   const href=destinations[category+':'+photo],badge=page.locator('#collaboration-showcase .collab-destination-logo');
   assert.equal(await badge.count(),href?1:0);
   if(href){
    assert.equal(await badge.getAttribute('href'),href);
    await badge.locator('img').evaluate(async img=>{await img.decode();if(!img.naturalWidth)throw Error('Logo missing');});
    const popupPromise=page.waitForEvent('popup');await badge.click();const popup=await popupPromise;await popup.waitForLoadState('domcontentloaded');assert.equal(popup.url(),href);await popup.close();
    await page.locator('.collab-hero').screenshot({path:`.local-data/collaboration/linked-photo-${category}-${photo}.png`});
   }
  }
  await page.locator('[data-collab-shot="0"]').click();
  const inquiry=page.locator('#collaboration-showcase .collab-inquiry');assert.equal(await inquiry.locator('svg.collab-plane').count(),1);await inquiry.click();assert(await page.locator('#collaboration-inquiry').evaluate(e=>e.open));assert.equal(await page.locator('#collaboration-inquiry select[name="category"]').inputValue(),['restaurants','stays','experiences'][category]);await page.keyboard.press('Escape');
  await page.locator('#collaboration-showcase').screenshot({path:`.local-data/collaboration/desktop-sector-${category}.png`});
  await page.keyboard.press('Escape');assert.equal(await page.locator('#collaboration-showcase').evaluate(e=>e.open),false);
  assert.equal(await page.locator(`[data-collab="${category}"]`).evaluate(e=>e===document.activeElement),true);
 }
 await page.locator('[data-collab="0"]').click();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#collab-tab-1').getAttribute('aria-selected'),'true');await page.keyboard.press('End');assert.equal(await page.locator('#collab-tab-2').getAttribute('aria-selected'),'true');await page.keyboard.press('Home');assert.equal(await page.locator('#collab-tab-0').getAttribute('aria-selected'),'true');await page.keyboard.press('Escape');
 for(const [width,height] of [[320,640],[390,844],[844,390]]){
  await page.setViewportSize({width,height});
  for(const lang of ['en','es']){
   await page.locator(`.lang-button[data-lang="${lang}"]`).evaluate(e=>e.click());
   await page.locator('[data-collab="1"]').click();
   const fit=await page.locator('#collaboration-showcase').evaluate(e=>{const r=e.getBoundingClientRect();return e.scrollWidth<=e.clientWidth+1&&r.left>=0&&r.right<=innerWidth+1&&r.top>=0&&r.bottom<=innerHeight+1;});assert(fit,`Dialog does not fit ${width}/${lang}`);
   assert((await page.locator('.collab-direction h3').textContent()).includes(lang==='es'?'estancia':'stay'));
   for(const [category,photo] of [[0,0],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]){
    await page.locator(`[data-collab-tab="${category}"]`).click();await page.locator(`[data-collab-shot="${photo}"]`).click();
    const badge=page.locator('#collaboration-showcase .collab-destination-logo');await badge.scrollIntoViewIfNeeded();
    assert.equal(await badge.getAttribute('href'),destinations[category+':'+photo]);
    assert(await badge.evaluate(el=>{const r=el.getBoundingClientRect(),hero=el.closest('figure').getBoundingClientRect(),caption=el.closest('figure').querySelector('figcaption').getBoundingClientRect();return r.left>=hero.left&&r.right<=hero.right&&r.bottom<caption.top&&r.height>=44;}),'Badge must fit clear of caption');
    if(width===390&&lang==='en'&&category===2&&photo===2)await page.locator('.collab-hero').screenshot({path:'.local-data/collaboration/zipaquira-mobile.png'});
   }
   await page.locator('#collaboration-showcase .collab-inquiry').scrollIntoViewIfNeeded();assert(await page.locator('#collaboration-showcase .collab-inquiry').isVisible());
   if(width===390){await page.screenshot({path:`.local-data/collaboration/mobile-cta-${lang}.png`});await page.locator('#collaboration-showcase').evaluate(e=>e.scrollTop=0);await page.screenshot({path:`.local-data/collaboration/mobile-screen-${lang}.png`});}
   await page.locator('#collaboration-showcase .collab-close').click();
  }
 }
 // Existing service buttons remain available alongside the new industry showcase.
 await page.locator('[data-service="0"]').evaluate(e=>e.click());assert(await page.locator('#service-details').evaluate(e=>e.open));await page.keyboard.press('Escape');
 assert.equal(await page.locator('.collab-invite-rocket').count(),1);
 assert.equal(await page.locator('.collab-invite-rocket').evaluate(el=>getComputedStyle(el).animationName),'none','Reduced motion disables the rocket animation');
 assert.deepEqual(errors,[]);console.log('All seven destination links and logos, nine photos, inquiry forms, keyboard/focus, bilingual mobile/landscape fit and reduced motion passed.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

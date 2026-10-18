import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {createSiteServer} from './server.mjs';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const server=await createSiteServer({dataDir:'.local-data/collaboration'});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base='http://127.0.0.1:'+server.address().port;
 await page.goto(base,{waitUntil:'domcontentloaded'});
 assert.equal(await page.locator('.collab-card-copy .collab-plane').count(),0);
 await page.locator('[data-collab="2"]').click();
 const cta=page.locator('#collaboration-showcase .collab-inquiry');
 assert.match(await cta.textContent(),/collab/);await cta.click();
 const popup=page.locator('#collaboration-inquiry'),form=popup.locator('form');
 assert.equal(await popup.locator('.section-compass-dock').count(),0);
 assert.equal(await form.locator('select').inputValue(),'experiences');
 assert.equal(await form.evaluate(f=>f.checkValidity()),false);
 await form.locator('[name=name]').fill('Preview Tester');await form.locator('[name=email]').fill('tester@example.com');
 await form.locator('[name=company]').fill('Travel & Co');await form.locator('[name=subject]').fill('An island story');
 await form.locator('[name=message]').fill('A bilingual excursion story for our launch.');
 await form.locator('[name=location]').fill('Antigua');await form.locator('[name=timing]').fill('Next month');
 const actualNames=await form.locator('[name]').evaluateAll(nodes=>nodes.map(n=>n.name).sort());
 const schemaNames=await page.locator('body>form[name=collaboration] [name]').evaluateAll(nodes=>nodes.map(n=>n.name).sort());assert.deepEqual(actualNames,schemaNames);
 await popup.screenshot({path:'.local-data/collaboration/inquiry-desktop.png'});
 // Local server refuses delivery, so no false success and no discarded draft.
 await form.locator('[type=submit]').click();await page.waitForFunction(()=>document.querySelector('.collab-form-status')?.textContent.includes('couldn’t'));
 assert.equal(await form.locator('[name=company]').inputValue(),'Travel & Co');assert.equal(await popup.locator('.collab-form-success').count(),0);
 await page.keyboard.press('Escape');assert(await cta.evaluate(e=>e===document.activeElement));await cta.click();assert.equal(await form.locator('[name=subject]').inputValue(),'An island story');
 for(const [width,height] of [[320,640],[390,844],[844,390]]){
  await page.setViewportSize({width,height});
  for(const lang of ['en','es']){
   await page.evaluate(lang=>{document.documentElement.lang=lang;document.dispatchEvent(new CustomEvent('lp:languagechange'));},lang);
   assert.equal(await form.locator('[name=company]').inputValue(),'Travel & Co');
   const fit=await popup.evaluate(e=>{const r=e.getBoundingClientRect();return e.scrollWidth<=e.clientWidth+1&&r.left>=0&&r.right<=innerWidth+1&&r.top>=0&&r.bottom<=innerHeight+1;});assert(fit,`${width}/${lang} overflow`);
   await form.locator('[type=submit]').scrollIntoViewIfNeeded();assert(await form.locator('[type=submit]').isVisible());
   await popup.evaluate(e=>e.scrollTop=0);
   if(width===390)await page.screenshot({path:`.local-data/collaboration/inquiry-mobile-${lang}.png`});
  }
 }
 // Simulate Netlify acceptance locally. No message is sent outside this test.
 let posted,requests=0,release;
 await page.route(base+'/',async route=>{if(route.request().method()!=='POST')return route.continue();requests++;posted=new URLSearchParams(route.request().postData());await new Promise(r=>release=r);await route.fulfill({status:200,body:'Accepted'});});
 await form.locator('[type=submit]').click();await page.waitForFunction(()=>document.querySelector('.collab-form')?.getAttribute('aria-busy')==='true');
 assert(await form.locator('[type=submit]').isDisabled());
 await page.waitForTimeout(100);assert.equal(requests,1);assert.equal(posted.get('form-name'),'collaboration');assert.equal(posted.get('email'),'tester@example.com');assert.equal(posted.get('category'),'experiences');assert.equal(posted.get('company'),'Travel & Co');assert.equal(posted.get('language'),'es');release();
 await popup.locator('.collab-form-success').waitFor();assert.equal(await popup.locator('form').count(),0);
 await popup.locator('.collab-form-back').click();assert(await cta.evaluate(e=>e===document.activeElement));
 await cta.click();assert.equal(await form.locator('[name=email]').inputValue(),'');
 const built=await readFile('dist/index.html','utf8');assert(built.includes('data-netlify="true"'));assert(built.includes('collaboration-inquiry.js'));
 assert.deepEqual(errors,[]);console.log('Airplane CTAs, schema, validation, error/draft retention, focus, bilingual mobile/landscape fit, pending guard and mocked submission passed. No external email sent.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

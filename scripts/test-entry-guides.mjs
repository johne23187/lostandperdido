import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const scope={window:{}};
vm.runInNewContext(await readFile(new URL('../entry-guides-data.js',import.meta.url),'utf8'),scope);
const {LPEntryGuides:guides,LPEntryGuideMarkup:render}=scope.window;
const expected=['Argentina','Chile','Bolivia','USA','England','Italy','Senegal','Colombia','Antigua','Dominican Republic','Canada','Puerto Rico','Bahamas','India','Brasil','Belarus','Türkiye','Ireland'];
assert.equal(guides.length,expected.length);
assert.equal(new Set(guides.map(country=>country.key)).size,expected.length);
for(const name of expected){
 const country=guides.find(item=>item.name===name);assert.ok(country,name);
 for(const key of ['passport','visa','arrival'])assert.ok(country[key].every(text=>text.length>20),name+' '+key);
 for(const [,url] of country.links){assert.equal(new URL(url).protocol,'https:');assert.ok(!url.includes('foreign-travel-advice'));}
 for(const lang of [0,1]){const html=render(country,(...pair)=>pair[lang],'entry-'+country.key);assert.ok(html.includes('entry-'+country.key+'-title'));assert.ok(!html.includes('undefined'));assert.equal((html.match(/class="entry-document"/g)||[]).length,3);}
}
const html=await readFile(new URL('../index.html',import.meta.url),'utf8');assert.ok(html.indexOf('entry-guides-data.js')<html.indexOf('travel-guides.js'),'Data loads before country dialogs');
console.log('Entry guides passed: all 18 destinations, bilingual document sections, official HTTPS links and script order.');

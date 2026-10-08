import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const scope={window:{},Date};vm.runInNewContext(fs.readFileSync(new URL('../daily-verses.js',import.meta.url),'utf8'),scope);
const {LPDailyVerses:verses,LPVerseForDate:pick}=scope.window;
assert.equal(verses.length,14);
for(const verse of verses){assert.ok(verse.reference&&verse.text&&verse.source);assert.equal(verse.translation,'World English Bible');}
for(const date of [[2026,9,7],[2026,10,1],[2027,2,14],[2026,11,31]]){
 const morning=new Date(...date,0,0,1),night=new Date(...date,23,59,59),tomorrow=new Date(...date);tomorrow.setDate(tomorrow.getDate()+1);
 assert.equal(pick(morning),pick(night),'A verse stays stable throughout the local day');assert.notEqual(pick(night),pick(tomorrow),'The verse changes on the next calendar day');
}
console.log('Daily verse checks passed: sourced passages, stable dates, midnight/year and DST boundaries.');

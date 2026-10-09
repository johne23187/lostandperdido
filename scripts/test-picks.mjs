import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../top-picks.js',import.meta.url),'utf8');
class Element {
 constructor(){this.events={};this.children=[];this.innerHTML='';this.open=false;}
 setAttribute(){} addEventListener(name,fn){this.events[name]=fn;}
 append(child){this.children.push(child);} replaceChildren(){this.children=[];this.innerHTML='';}
 querySelector(selector){return selector==='#picks-spotify'?host:button;} querySelectorAll(){return [];}
 showModal(){this.open=true;} close(){this.open=false;this.events.close();} focus(){}
}
const host=new Element(),button=new Element(),opener=new Element(),body=new Element(),head=new Element();
const document={documentElement:{lang:'en'},body,head,querySelector:()=>opener,createElement:()=>new Element(),getElementById:()=>null,addEventListener(){}};
const scope={document,window:{},Math};vm.runInNewContext(source,scope);
const dialog=body.children[0],players=[];
const api={createController(mount,options,callback){const player={options,events:{},plays:0,destroyed:false,addListener(name,fn){this.events[name]=fn;},play(){this.plays++;},destroy(){this.destroyed=true;}};players.push(player);callback(player);}};
opener.events.click();assert.equal(dialog.open,true);assert.ok(host.children[0].innerHTML.includes('open.spotify.com/embed/track/'));
assert.match(dialog.innerHTML, /22 songs · 16 artists · 10 albums<\/span>/);
for(const name of ['Friday Night Lights','Revenge of the Dreamers III','Waldo Cortes-Acosta','Payton Talbott','Undertaker','Triple H','George Lombard Jr.','Karl-Anthony Towns','Mikal Bridges']) assert.ok(dialog.innerHTML.includes(name),name);
for(const match of dialog.innerHTML.matchAll(/src="(assets\/[^"]+)"/g)) assert.ok(fs.existsSync(new URL('../'+match[1],import.meta.url)),`Missing artwork: ${match[1]}`);
assert.equal((dialog.innerHTML.match(/class="sport-portrait"/g)||[]).length,20);
assert.equal((dialog.innerHTML.match(/class="sport-logo-backdrop"/g)||[]).length,4);
assert.equal((dialog.innerHTML.match(/class="picks-movie"/g)||[]).length,12);
assert.ok(dialog.innerHTML.indexOf('Albums & mixtapes')<dialog.innerHTML.indexOf('Comfort shows.'));
assert.ok(!/<header><span>0[1-6] \/ /.test(dialog.innerHTML));
assert.ok(dialog.innerHTML.includes('Rauw Alejandro'));
for(const name of ['The Life of Pablo','DAMN.','Die Lit','Her Loss']) assert.ok(dialog.innerHTML.includes(name),name);
assert.equal((dialog.innerHTML.match(/-clear\.png/g)||[]).length,5,'All Knicks portraits use the refreshed photos');
const page=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
assert.match(page, /class="facebook-flip-link" href="https:\/\/www.facebook.com\/p\/Lost-Perdido-61594616037982\/"/);
for(const name of ['Carlos Prates','Peaky Blinders','The Sopranos','Pulp Fiction','Kill Bill: Vol. 1','Kill Bill: Vol. 2','Django Unchained','Scarface','Young Washington','The Odyssey','Spider-Man: Brand New Day','Buddy','Obsession','Superbad','Project X']) assert.ok(dialog.innerHTML.includes(name),name);
const movieFilter={dataset:{picksFilter:'movies'},isConnected:true};
dialog.events.click({target:{closest:selector=>selector==='[data-picks-filter]'?movieFilter:null}});
assert.equal((button.innerHTML.match(/class="picks-movie"/g)||[]).length,12,'Movies filter displays the full movie shelf');
assert.ok(!button.innerHTML.includes('picks-show-grid'),'Movies filter excludes shows');
const firstUri='spotify:track:'+host.children[0].innerHTML.match(/embed\/track\/([^?]+)/)[1];
dialog.close();scope.window.onSpotifyIframeApiReady(api);assert.equal(players.length,0,'Late API load cannot play after closing');
const uris=[firstUri];
for(let i=0;i<21;i++){opener.events.click();const player=players.at(-1);player.events.ready();assert.equal(player.plays,1);uris.push(player.options.uri);dialog.close();assert.equal(player.destroyed,true);assert.equal(host.children.length,0);player.events.ready();assert.equal(player.plays,1,'Late ready cannot restart closed player');}
assert.equal(new Set(uris).size,22,'Shuffle plays every featured track once before repeating');
console.log('Spotify shuffle passed: complete queue, fallback embed, close cleanup and delayed API/ready isolation.');

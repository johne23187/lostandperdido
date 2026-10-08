import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const scope={window:{},performance:{now:()=>1000},ResizeObserver:class{observe(){}}};
vm.runInNewContext(await readFile(new URL('../globe-interactions.js',import.meta.url),'utf8'),scope);
const events=new Map();
const surface={clientWidth:350,classList:{add(){},remove(){}},setPointerCapture(){},addEventListener(name,fn){events.set(name,fn)}};
let view={rotation:[0,0,0],scale:305};
scope.window.LPGlobe.controls({surface,getView:()=>view,setView:next=>view=next,stopAnimation(){}});
assert.equal(events.has('wheel'),false,'Wheel must remain native page scrolling');
assert.equal(events.has('touchmove'),false,'No custom pinch handler may zoom the globe');
const target={closest:()=>null};
events.get('pointerdown')({pointerType:'mouse',button:0,pointerId:1,clientX:10,clientY:10,target});
events.get('pointermove')({pointerType:'mouse',pointerId:1,clientX:80,clientY:20});
assert.notEqual(view.rotation[0],0,'Drag still rotates');
assert.equal(view.scale,305);
events.get('pointerup')({pointerId:1});
const before=view.rotation[0];
events.get('keydown')({target:surface,key:'ArrowRight',preventDefault(){}});
assert.ok(view.rotation[0]>before,'Arrow keys still rotate');
events.get('keydown')({target:surface,key:'+',preventDefault(){throw Error('Zoom shortcut must not intercept the key');}});
assert.equal(view.scale,305);
for(const [pointerId,clientX] of [[2,40],[3,80]])events.get('pointerdown')({pointerType:'touch',pointerId,clientX,clientY:40,target});
events.get('pointermove')({pointerType:'touch',pointerId:3,clientX:240,clientY:40});
assert.equal(view.scale,305,'Two-finger gestures cannot change globe scale');
console.log('Globe controls passed: rotation, keyboard, fixed scale, native scrolling and no pinch zoom.');

// Run the real planned-globe draw function against the shipped coordinates.
// The previous collision solver moved these screen positions off their geographic anchors.
vm.runInNewContext(await readFile(new URL('../assets/vendor/d3.min.js',import.meta.url),'utf8'),scope);
vm.runInNewContext(await readFile(new URL('../assets/footprint-countries.js',import.meta.url),'utf8'),scope);
const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
const planned=await readFile(new URL('../planned-globe.js',import.meta.url),'utf8');
const destinations=[{name:'Argentina',code:'ARG',key:'argentina',xy:[-65,-35]},{name:'Chile',code:'CHL',key:'chile',xy:[-71,-34]},{name:'Bolivia',code:'BOL',key:'bolivia',xy:[-65,-17]}];
const cities=[...html.matchAll(/<button[^>]*class="[^"]*city-pin[^"]*"[^>]*>/g)].map(([tag])=>{
 const key=tag.match(/data-country="([^"]+)"/)[1],stop=tag.match(/data-stop="([^"]+)"/)[1];
 const location=html.match(new RegExp('id="stop-'+stop+'"[\\s\\S]*?class="city-weather" data-lat="([^"]+)" data-lon="([^"]+)"'));
 assert.ok(location,'Every stop has geographic coordinates');
 return {name:stop,key,xy:[Number(location[2]),Number(location[1])],pin:true};
});
const entries=[...destinations,...cities].map(item=>({...item,button:{style:{},dataset:{},setAttribute(){},querySelector(){return {};}}}));
const chain={attr(){return this;},datum(){return this;},select(){return this;},selectAll(){return this;},data(){return this;},join(){return this;}};
const projection=scope.d3.geoOrthographic().translate([350,350]).scale(305);
const regionalProjection=scope.d3.geoMercator().clipExtent([[0,0],[700,700]]);
Object.assign(scope,{entries,destinations,projection,regionalProjection,regionalPath:scope.d3.geoPath(regionalProjection),path:scope.d3.geoPath(projection),oceanCircle:chain,regionalOcean:chain,cameraControls:null,scale:305,grid:chain,land:chain,defs:chain,countryBorder:chain,LPGlobe:scope.window.LPGlobe,root:{classList:{toggle(){}}},surface:{clientWidth:350,classList:{toggle(){}},setAttribute(){}}});
scope.leaders=chain;
vm.runInNewContext(planned.slice(planned.indexOf(' function draw(){'),planned.indexOf(' function list(')),scope);
for(const width of [280,390,700])for(const country of destinations){
 scope.surface.clientWidth=width;scope.selected=country;scope.rotation=[-country.xy[0],-country.xy[1],0];
 regionalProjection.fitExtent([[65,45],[635,650]],scope.window.footprintCountries.features.find(f=>f.properties.code===country.code));
 scope.draw();
 const expectedCities=entries.filter(item=>item.pin&&item.key===country.key);
 const represented=new Set();
 for(const item of expectedCities){
  const point=regionalProjection(item.xy);
  assert.ok(point[0]>20&&point[0]<680&&point[1]>20&&point[1]<680,'Every stop fits inside the country map');
  const rendered=[parseFloat(item.button.style.left)*7,parseFloat(item.button.style.top)*7];
  assert.ok(Math.hypot(rendered[0]-point[0],rendered[1]-point[1])<1e-8,'Rendered pin tip must match its projected coordinates, not merely its stored anchor');
  const geographic=regionalProjection.invert(rendered);
  assert.ok(Math.hypot(geographic[0]-item.xy[0],geographic[1]-item.xy[1])<1e-8,'Visible pin must round-trip to the original latitude and longitude');
  assert.equal(item.button.hidden,false,'Every city gets its own visible pin');
  represented.add(item.name);
 }
 assert.equal(represented.size,expectedCities.length,'No cities share pins');
}
console.log('Destination pins passed: real coordinates stay anchored at phone/tablet/desktop sizes; every city remains accessible.');
Object.assign(scope,{cityData:entries.filter(entry=>entry.pin),countryReset:{hidden:true},highlight(){},selectCity(){}});
vm.runInNewContext(planned.slice(planned.indexOf(' function fitCountry(){'),planned.indexOf(' function selectCity(item){')),scope);
for(const country of destinations)for(const width of [280,390,700]){
 scope.selected=country;scope.surface.clientWidth=width;scope.rotation=[-country.xy[0],-country.xy[1],0];
 const wholeCountry=scope.d3.geoMercator().fitExtent([[65,45],[635,650]],scope.window.footprintCountries.features.find(f=>f.properties.code===country.code));
 scope.fitCountry();scope.draw();
 assert.ok(regionalProjection.scale()>wholeCountry.scale(),'Country entry must zoom closer than the whole-country overview');
 for(const entry of scope.cityData.filter(entry=>entry.key===country.key)){
  assert.equal(entry.button.hidden,false,'The closer initial view must keep every itinerary pin on screen');
  const p=regionalProjection(entry.xy);assert.ok(p[0]>=34.9&&p[0]<=665.1&&p[1]>=74.9&&p[1]<=665.1,'Pins have safe room around all map edges');
 }
 for(const stop of scope.cityData.filter(entry=>entry.key===country.key)){
  scope.fitCountry();scope.draw();
  for(const entry of scope.cityData.filter(entry=>entry.key===country.key&&!entry.button.hidden)){
   const actual=regionalProjection.invert([parseFloat(entry.button.style.left)*7,parseFloat(entry.button.style.top)*7]);
   assert.ok(Math.hypot(actual[0]-entry.xy[0],actual[1]-entry.xy[1])<1e-8,'Local zoom must keep visible pin tips at their geographic positions');
  }
 }
}
console.log('Single country view passed: all stops remain on-screen at mobile, tablet and desktop widths.');

const footprint=await readFile(new URL('../footprint.js',import.meta.url),'utf8');
const introCode=footprint.slice(footprint.indexOf('  let introduced=false;'),footprint.indexOf('  new IntersectionObserver'));
let nextFrame,draws=0,reduce=false,active=false;
const introClasses=new Set();
const introScope={introActive:false,surface:{classList:{add:value=>introClasses.add(value),remove:value=>introClasses.delete(value)}},rotation:[55,-12,0],scale:305,section:{classList:{contains:()=>active}},performance:{now:()=>0},matchMedia:()=>({matches:reduce}),draw:()=>draws++,requestAnimationFrame:callback=>{nextFrame=callback;return 1;}};
vm.runInNewContext(introCode,introScope);
introScope.introduceGlobe();assert.equal(nextFrame,undefined,'Do not spin a hidden globe');
active=true;introScope.introduceGlobe();nextFrame(100);assert.equal(introScope.rotation[0],55,'Faces fade before rotation starts');assert.ok(introClasses.has('globe-introducing'));nextFrame(1600);assert.ok(introScope.rotation[0]>55,'Intro rotates the real globe');nextFrame(3000);
assert.equal(introScope.introActive,false);assert.equal(introClasses.has('globe-introducing'),false,'Face icons return after the globe settles');
assert.deepEqual(Array.from(introScope.rotation),[55,-12,0],'Intro finishes at the original view');assert.equal(introScope.scale,305,'Intro preserves scale');
nextFrame=null;introScope.introduceGlobe();assert.equal(nextFrame,null,'Intro runs only once');
reduce=true;const reducedScope={...introScope,requestAnimationFrame(){throw Error('Reduced motion must not animate');}};vm.runInNewContext(introCode,reducedScope);reducedScope.introduceGlobe();
console.log('Globe intro passed: visible-only, original final view, unchanged scale and one-time animation.');

// The itinerary uses the same orthographic rendering and drag controls as the footprint.
(() => {
 const panel=document.querySelector('.globe-panel');
 const root=document.createElement('div');root.className='planned-explorer';
 root.innerHTML='<div class="planned-surface footprint-globe" tabindex="0" role="group" aria-label="Planned destinations globe. Drag or use arrow keys to rotate. Scroll normally to move down the page."><svg viewBox="0 0 700 700" aria-hidden="true"></svg><div class="planned-markers footprint-markers"></div></div><div class="footprint-globe-controls"><span>DRAG TO EXPLORE · SCROLL TO MOVE DOWN</span><button type="button" class="planned-reset footprint-reset">← Back to full globe</button></div><nav class="planned-options" aria-label="Planned destinations"></nav>';
 panel.prepend(root);
 const surface=root.querySelector('.planned-surface'),layer=root.querySelector('.planned-markers'),options=root.querySelector('.planned-options');
 const svg=d3.select(surface.querySelector('svg'));
 const projection=d3.geoOrthographic().translate([350,350]).scale(305).rotate([65,20,0]);
 const path=d3.geoPath(projection);
 const regionalProjection=d3.geoMercator().clipExtent([[0,0],[700,700]]);
 const regionalPath=d3.geoPath(regionalProjection);
 const defs=svg.append('defs');
 const water=defs.append('radialGradient').attr('id','planned-ocean').attr('cx','30%').attr('cy','25%').attr('r','85%');
 water.append('stop').attr('stop-color','#124278');water.append('stop').attr('offset','1').attr('stop-color','#020e30');
 const terrain=defs.append('linearGradient').attr('id','planned-land').attr('x2','0').attr('y2','1');
 terrain.append('stop').attr('stop-color','#81b287');terrain.append('stop').attr('offset','.45').attr('stop-color','#367b55');terrain.append('stop').attr('offset','.7').attr('stop-color','#296647');terrain.append('stop').attr('offset','1').attr('stop-color','#164634');
 const regionalOcean=svg.append('rect').attr('width',700).attr('height',700).attr('fill','url(#planned-ocean)').attr('display','none');
 const oceanCircle=svg.append('circle').attr('cx',350).attr('cy',350).attr('r',305).attr('fill','url(#planned-ocean)').attr('stroke','#88cfdf44');
 const grid=svg.append('path').datum(d3.geoGraticule10()).attr('fill','none').attr('stroke','#c5f5ff16').attr('stroke-width',.6);
 const land=svg.append('g').selectAll('path').data(window.footprintCountries.features).join('path').attr('stroke','#beded153').attr('stroke-width',.65);
 const destinations=[{name:'Argentina',code:'ARG',key:'argentina',xy:[-65,-35]},{name:'Chile',code:'CHL',key:'chile',xy:[-71,-34]},{name:'Bolivia',code:'BOL',key:'bolivia',xy:[-65,-17]}];
 const flagCodes={ARG:'ar',CHL:'cl',BOL:'bo'};
 destinations.forEach(d=>{
  const pattern=defs.append('pattern').attr('id','planned-flag-'+d.code).attr('patternUnits','userSpaceOnUse').attr('width',1).attr('height',1).attr('viewBox','0 0 3 2').attr('preserveAspectRatio','none');
  pattern.append('image').attr('href','assets/flag-'+flagCodes[d.code]+'.svg').attr('width',3).attr('height',2).attr('preserveAspectRatio','none');
 });
 const reset=root.querySelector('.planned-reset');root.insertBefore(reset,surface);reset.setAttribute('aria-label','Return to all countries');
 let city=null,selected=null,rotation=[65,20,0],scale=305,frame,cameraControls;
 const cityData=[...document.querySelectorAll('.city-pin')].map(pin=>{
  const box=document.querySelector('#stop-'+pin.dataset.stop+' .city-weather');
  return {name:pin.getAttribute('aria-label'),key:pin.dataset.country,xy:[Number(box.dataset.lon),Number(box.dataset.lat)],pin};
 });
 const entries=[...destinations,...cityData];
 entries.forEach(item=>{
  const b=document.createElement('button');b.type='button';b.className='planned-pin';b.setAttribute('aria-label',item.name);b.innerHTML='<img src="assets/apple-map-pin.png" alt="" width="28" height="32"><span></span>';b.querySelector('span').textContent=item.name;
  b.addEventListener('click',()=>item.pin?selectCity(item):select(item));item.button=b;layer.append(b);
 });
 const countryBorder=svg.append('path').attr('class','planned-country-border').attr('fill','none').attr('stroke','#fff0bd').attr('stroke-width',2).attr('pointer-events','none');
 function draw(){
  const mapProjection=selected?regionalProjection:projection,mapPath=selected?regionalPath:path;
  oceanCircle.attr('r',scale).attr('display',selected?'none':null);regionalOcean.attr('display',selected?null:'none');cameraControls?.sync();projection.rotate(rotation).scale(scale);grid.attr('d',mapPath);
  land.attr('d',mapPath).attr('fill',f=>destinations.some(d=>d.code===f.properties.code)?'url(#planned-flag-'+f.properties.code+')':'url(#planned-land)');
  destinations.forEach(d=>{
   const feature=window.footprintCountries.features.find(f=>f.properties.code===d.code);
   if(!feature)return;
   const bounds=mapPath.bounds(feature),w=bounds[1][0]-bounds[0][0],h=bounds[1][1]-bounds[0][1];
   if(Number.isFinite(w)&&w>0&&h>0){
    // Argentina's bounding-box midpoint lies near its tapered eastern border.
    // Center its sun on the country's geographic center instead.
    const flagCenter=d.code==='ARG'?mapProjection(d3.geoCentroid(feature)):null;
    defs.select('#planned-flag-'+d.code).attr('x',flagCenter?flagCenter[0]-w/2:bounds[0][0]).attr('y',flagCenter?flagCenter[1]-h/2:bounds[0][1]).attr('width',w).attr('height',h);
   }
  });
  countryBorder.datum(selected?window.footprintCountries.features.find(f=>f.properties.code===selected.code):null).attr('d',selected?regionalPath:null);
  const center=projection.invert([350,350]);
  const cityView=selected;
  entries.forEach(item=>{
   const active=cityView?item.pin&&item.key===selected.key:!item.pin;
   const xy=mapProjection(item.xy);item.button.hidden=!active||(!selected&&d3.geoDistance(item.xy,center)>Math.PI/2-.04)||xy[0]<10||xy[0]>690||xy[1]<10||xy[1]>690;
   item.point=xy;item.cluster=null;delete item.button.dataset.clusterCount;
   item.button.setAttribute('aria-label',item.name);
   item.button.querySelector('span').textContent=item.name;
   // Pin tips stay on the projected coordinates. Never repel pins into the ocean.
   item.button.style.left=xy[0]/7+'%';item.button.style.top=xy[1]/7+'%';
  });
  surface.classList.toggle('planned-country-view',!!cityView);
  root.classList.toggle('showing-country',!!selected);
  surface.setAttribute('aria-label',selected?selected.name+' map. Choose a pin or a stop from the list.':'Planned destinations globe. Drag or use arrow keys to rotate. Choose a country below.');
 }
 function list(nearby=null){
  options.replaceChildren();const title=document.createElement('p');title.textContent=nearby?'NEARBY STOPS · CHOOSE A CITY':selected?selected.name+' / CHOOSE A STOP':'WHERE WE’RE GOING';options.append(title);
  if(selected){const guide=document.createElement('a');guide.className='globe-entry-link';guide.href='#entry-'+selected.key;guide.textContent=document.documentElement.lang==='es'?'Ingreso · EE. UU. ↗':'U.S. entry guide ↗';guide.setAttribute('aria-haspopup','dialog');guide.addEventListener('click',event=>{event.preventDefault();const panel=document.getElementById('entry-'+selected.key);if(panel){panel.showModal();panel.scrollTop=0;panel.addEventListener('close',()=>guide.focus({preventScroll:true}),{once:true});}});options.append(guide);}
  (nearby||(selected?cityData.filter(c=>c.key===selected.key):destinations)).forEach(item=>{const b=document.createElement('button');b.type='button';b.textContent=item.name;b.dataset.stopName=item.name;b.setAttribute('aria-pressed',String(city===item));b.addEventListener('pointerenter',()=>highlight(item));b.addEventListener('focus',()=>highlight(item));b.addEventListener('pointerleave',()=>highlight(city));b.addEventListener('blur',()=>highlight(city));b.addEventListener('click',()=>item.pin?selectCity(item):select(item));options.append(b);});
  if(nearby){const back=document.createElement('button');back.type='button';back.textContent='← All cities';back.addEventListener('click',()=>list());options.append(back);}
 }
 function highlight(item){entries.forEach(entry=>entry.button.classList.toggle('is-highlighted',entry===item||!!entry.cluster?.includes(item)));}
 function fitCountry(){
  // Frame the itinerary, rather than shrinking a long country to fit its full extent.
  // The map and all pin tips use this same projection; no screen-space offsets.
  const coordinates=cityData.filter(item=>item.key===selected.key).map(item=>item.xy);
  const itinerary={type:'MultiPoint',coordinates};
  regionalProjection.fitExtent([[85,110],[615,615]],coordinates.length>1?itinerary:window.footprintCountries.features.find(f=>f.properties.code===selected.code));
  
 }
 function selectCity(item){city=item;highlight(item);options.querySelectorAll('[data-stop-name]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.stopName===item.name)));item.pin.click();}
 function select(item){
  cameraControls?.stop();city=null;reset.hidden=!item;reset.textContent='← Back to full globe';
  selected=item;cancelAnimationFrame(frame);const from=rotation.slice(),start=performance.now(),to=item?[-item.xy[0],-item.xy[1],0]:[65,20,0];
  if(selected)fitCountry();
  highlight(null);
  to[0]=from[0]+((to[0]-from[0])%360+540)%360-180;
  const duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:900;list();
  if(selected){rotation=to;draw();if(duration)surface.animate([{opacity:.5},{opacity:1}],{duration:240,easing:'ease-out'});return;}
  function tick(now){const t=duration?Math.min(1,(now-start)/duration):1,e=1-Math.pow(1-t,3);rotation=from.map((v,i)=>v+(to[i]-v)*e);scale=305;draw();if(t<1)frame=requestAnimationFrame(tick);}
  frame=requestAnimationFrame(tick);
 }
 root.querySelector('.planned-reset').addEventListener('click',()=>select(null));
 land.on('click',(event,f)=>{const item=destinations.find(d=>d.code===f.properties.code);if(item)select(item);});
 function stopIntro(){cancelAnimationFrame(frame);surface.classList.remove('globe-introducing');}
 cameraControls=LPGlobe.controls({surface,container:root.querySelector('.footprint-globe-controls'),getView:()=>({rotation,scale}),setView:view=>{if(!selected){rotation=view.rotation;scale=view.scale;}draw();},stopAnimation:stopIntro});
 document.querySelectorAll('[data-globe-mode]').forEach(button=>button.addEventListener('click',()=>{
  stopIntro();if(button.dataset.globeMode!=='planned')return;
  selected=null;city=null;reset.hidden=true;rotation=[65,20,0];scale=305;highlight(null);list();draw();
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  surface.classList.add('globe-introducing');const from=rotation.slice(),start=performance.now()+200;
  function spin(now){
   const progress=Math.max(0,Math.min(1,(now-start)/2800)),ease=(1-Math.cos(Math.PI*progress))/2;
   rotation=[from[0]+360*ease,from[1],from[2]];
   if(progress===1)rotation=from;
   draw();if(progress<1)frame=requestAnimationFrame(spin);else surface.classList.remove('globe-introducing');
  }
  frame=requestAnimationFrame(spin);
 }));
 reset.hidden=true;list();draw();
})();

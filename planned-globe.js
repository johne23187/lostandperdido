// The itinerary uses the same orthographic rendering and drag controls as the footprint.
(() => {
 const panel=document.querySelector('.globe-panel');
 const root=document.createElement('div');root.className='planned-explorer';
 root.innerHTML='<div class="planned-surface footprint-globe" tabindex="0" role="group" aria-label="Planned destinations globe. Drag or use arrow keys to rotate."><svg viewBox="0 0 700 700" aria-hidden="true"></svg><div class="planned-markers footprint-markers"></div></div><div class="footprint-globe-controls"><span>DRAG TO EXPLORE · SELECT A PIN</span><button type="button" class="planned-reset footprint-reset">← Back to full globe</button></div><nav class="planned-options" aria-label="Planned destinations"></nav>';
 panel.prepend(root);
 const surface=root.querySelector('.planned-surface'),layer=root.querySelector('.planned-markers'),options=root.querySelector('.planned-options');
 const svg=d3.select(surface.querySelector('svg'));
 const projection=d3.geoOrthographic().translate([350,350]).scale(305).rotate([65,20,0]);
 const path=d3.geoPath(projection);
 const defs=svg.append('defs');
 const water=defs.append('radialGradient').attr('id','planned-ocean').attr('cx','30%').attr('cy','25%').attr('r','85%');
 water.append('stop').attr('stop-color','#124278');water.append('stop').attr('offset','1').attr('stop-color','#020e30');
 const terrain=defs.append('linearGradient').attr('id','planned-land').attr('x2','0').attr('y2','1');
 terrain.append('stop').attr('stop-color','#81b287');terrain.append('stop').attr('offset','.45').attr('stop-color','#367b55');terrain.append('stop').attr('offset','.7').attr('stop-color','#296647');terrain.append('stop').attr('offset','1').attr('stop-color','#164634');
 svg.append('circle').attr('cx',350).attr('cy',350).attr('r',305).attr('fill','url(#planned-ocean)').attr('stroke','#88cfdf44');
 const grid=svg.append('path').datum(d3.geoGraticule10()).attr('fill','none').attr('stroke','#c5f5ff16').attr('stroke-width',.6);
 const land=svg.append('g').selectAll('path').data(window.footprintCountries.features).join('path').attr('stroke','#beded153').attr('stroke-width',.65);
 const destinations=[{name:'Argentina',code:'ARG',key:'argentina',xy:[-65,-35]},{name:'Chile',code:'CHL',key:'chile',xy:[-71,-34]},{name:'Bolivia',code:'BOL',key:'bolivia',xy:[-65,-17]}];
 const flagCodes={ARG:'ar',CHL:'cl',BOL:'bo'};
 destinations.forEach(d=>{
  const pattern=defs.append('pattern').attr('id','planned-flag-'+d.code).attr('patternUnits','objectBoundingBox').attr('width',1).attr('height',1).attr('viewBox','0 0 3 2').attr('preserveAspectRatio','none');
  pattern.append('image').attr('href','assets/flag-'+flagCodes[d.code]+'.svg').attr('width',3).attr('height',2).attr('preserveAspectRatio','none');
 });
 const reset=root.querySelector('.planned-reset');root.insertBefore(reset,surface);reset.setAttribute('aria-label','Reset zoom and return to the full globe');
 let selected=null,rotation=[65,20,0],scale=305,drag=null,moved=false,frame;
 const cityData=[...document.querySelectorAll('.city-pin')].map(pin=>{
  const box=document.querySelector('#stop-'+pin.dataset.stop+' .city-weather');
  return {name:pin.getAttribute('aria-label'),key:pin.dataset.country,xy:[Number(box.dataset.lon),Number(box.dataset.lat)],pin};
 });
 const entries=[...destinations,...cityData];
 entries.forEach(item=>{
  const b=document.createElement('button');b.type='button';b.className='planned-pin';b.setAttribute('aria-label',item.name);b.innerHTML='<img src="assets/apple-map-pin.png" alt="" width="28" height="32"><span></span>';b.querySelector('span').textContent=item.name;
  b.addEventListener('click',()=>item.pin?item.pin.click():select(item));item.button=b;layer.append(b);
 });
 function draw(){
  projection.rotate(rotation).scale(scale);grid.attr('d',path);
  land.attr('d',path).attr('fill',f=>destinations.some(d=>d.code===f.properties.code)?'url(#planned-flag-'+f.properties.code+')':'url(#planned-land)');
  const center=projection.invert([350,350]);
  entries.forEach(item=>{
   const active=selected?item.pin&&item.key===selected.key:!item.pin;
   const xy=projection(item.xy);item.button.hidden=!active||d3.geoDistance(item.xy,center)>Math.PI/2-.04||xy[0]<10||xy[0]>690||xy[1]<10||xy[1]>690;
   item.button.style.left=xy[0]/7+'%';item.button.style.top=xy[1]/7+'%';
  });
 }
 function list(){
  options.replaceChildren();const title=document.createElement('p');title.textContent=selected?selected.name+' / Pick a city':'WHERE WE’RE GOING';options.append(title);
  (selected?cityData.filter(c=>c.key===selected.key):destinations).forEach(item=>{const b=document.createElement('button');b.type='button';b.textContent=item.name;b.addEventListener('click',()=>item.pin?item.pin.click():select(item));options.append(b);});
 }
 function select(item){
  selected=item;cancelAnimationFrame(frame);const from=rotation.slice(),old=scale,start=performance.now(),to=item?[-item.xy[0],-item.xy[1],0]:[65,20,0];
  to[0]=from[0]+((to[0]-from[0])%360+540)%360-180;
  const duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:900;list();
  function tick(now){const t=duration?Math.min(1,(now-start)/duration):1,e=1-Math.pow(1-t,3);rotation=from.map((v,i)=>v+(to[i]-v)*e);scale=old+((item?560:305)-old)*e;draw();if(t<1)frame=requestAnimationFrame(tick);}
  frame=requestAnimationFrame(tick);
 }
 root.querySelector('.planned-reset').addEventListener('click',()=>select(null));
 land.on('click',(event,f)=>{if(!moved){const item=destinations.find(d=>d.code===f.properties.code);if(item)select(item);}});
 surface.addEventListener('pointerdown',e=>{if(e.target.closest('button')||e.button!==0)return;cancelAnimationFrame(frame);moved=false;drag={x:e.clientX,y:e.clientY,r:rotation.slice()};surface.classList.add('dragging');});
 surface.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;moved=moved||Math.hypot(dx,dy)>5;rotation=[drag.r[0]+dx*180/surface.clientWidth,Math.max(-85,Math.min(85,drag.r[1]-dy*180/surface.clientWidth)),0];draw();});
 function end(){drag=null;surface.classList.remove('dragging');}window.addEventListener('pointerup',end);surface.addEventListener('pointerleave',end);surface.addEventListener('pointercancel',end);
 surface.addEventListener('keydown',e=>{if(e.target!==surface||!e.key.startsWith('Arrow'))return;e.preventDefault();cancelAnimationFrame(frame);if(e.key==='ArrowLeft')rotation[0]-=12;if(e.key==='ArrowRight')rotation[0]+=12;if(e.key==='ArrowUp')rotation[1]=Math.min(85,rotation[1]+12);if(e.key==='ArrowDown')rotation[1]=Math.max(-85,rotation[1]-12);draw();});
 list();draw();
})();

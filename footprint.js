/* Local orthographic globe. No remote requests are required to explore it. */
(() => {
  const section = document.getElementById('guides');
  const surface = document.querySelector('.footprint-globe');
  const svg = d3.select('.footprint-earth');
  const markerLayer = document.querySelector('.footprint-markers');
  const selection = document.querySelector('.footprint-selection');
  const places = [
    ['USA','USA',[-98,38],['john','mateo']],
    ['England',null,[-1.5,52.5],['john']],
    ['Italy','ITA',[12.5,42.5],['john']],
    ['Senegal','SEN',[-14.5,14.5],['john']],
    ['Colombia','COL',[-74,4.5],['john','mateo']],
    ['Antigua',null,[-61.8,17.1],['john']],
    ['Dominican Republic','DOM',[-70.2,18.9],['john']],
    ['Canada','CAN',[-106,57],['john']],
    ['Puerto Rico','PRI',[-66.4,18.2],['john']],
    ['Bahamas','BHS',[-77.4,25],['john']],
    ['India','IND',[79,22],['john']],
    ['Bolivia','BOL',[-64.7,-17],['mateo']],
    ['Chile','CHL',[-71,-33],['mateo']],
    ['Brasil','BRA',[-51,-13],['mateo']],
    ['Belarus','BLR',[28,53.5],['mateo']],
    ['Türkiye','TUR',[35,39],['mateo']],
    ['Ireland','IRL',[-8,53],['mateo']]
  ].map(([name,code,coordinates,travelers])=>({name,code,coordinates,travelers}));
  const colors = {john:'#f1b45f',mateo:'#75d5ca'};
  let filter = 'both', selected = null, rotation = [55,-12,0], flight, drag = null, paintFrame;
  const projection = d3.geoOrthographic().translate([350,350]).scale(305).clipAngle(90).precision(.35);
  const path = d3.geoPath(projection);
  const defs = svg.append('defs');
  const ocean = defs.append('radialGradient').attr('id','footprint-ocean').attr('cx','30%').attr('cy','25%').attr('r','80%');
  ocean.append('stop').attr('stop-color','#2a6174'); ocean.append('stop').attr('offset','1').attr('stop-color','#081827');
  svg.append('circle').attr('cx',350).attr('cy',350).attr('r',311).attr('fill','none').attr('stroke','#88cfdf44').attr('stroke-width',2);
  svg.append('circle').attr('cx',350).attr('cy',350).attr('r',305).attr('fill','url(#footprint-ocean)');
  const grid = svg.append('path').datum(d3.geoGraticule10()).attr('fill','none').attr('stroke','#c5f5ff16').attr('stroke-width',.6);
  const countries = svg.append('g').selectAll('path').data(window.footprintCountries.features).join('path').attr('stroke','#beded153').attr('stroke-width',.65);
  countries.style('cursor', feature => places.some(p=>p.code===feature.properties.code)?'pointer':null).on('click', (event, feature) => {
    if (suppressClick) return;
    const place=places.find(p=>p.code===feature.properties.code);
    if(place && travelersFor(place).length) choose(place);
  });
  let suppressClick=false;
  function travelersFor(place) { return place.travelers.filter(t => filter === 'both' || filter === t); }
  function person(t) { return `<img class="traveler-head traveler-head-${t}" src="assets/${t === 'john' ? 'john-yankees-smiling' : 'mateo-yankees-head'}.png" alt="${t === 'john' ? 'John' : 'Mateo'} wearing a blue Yankees cap" width="48" height="48" draggable="false">`; }
  places.forEach(place => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'footprint-marker';
    button.title = place.name; button.setAttribute('aria-label', place.name + ', visited by ' + place.travelers.join(' and '));
    button.addEventListener('click', event => { event.stopPropagation(); choose(place); });
    place.button = button; markerLayer.append(button);
  });
  function draw() {
    projection.rotate(rotation);
    grid.attr('d',path);
    countries.attr('d',path).attr('fill', feature => {
      const place = places.find(p=>p.code===feature.properties.code);
      const people = place ? travelersFor(place) : [];
      return !people.length ? '#3b5658' : people.length===2 ? '#b5c894' : colors[people[0]];
    });
    const center = projection.invert([350,350]);
    places.forEach(place => {
      const people = travelersFor(place);
      const visible = people.length && d3.geoDistance(place.coordinates,center)<Math.PI/2-.04;
      place.button.hidden = !visible;
      if (!visible) return;
      const [x,y] = projection(place.coordinates);
      place.button.style.left = x/7+'%'; place.button.style.top = y/7+'%';
      place.button.classList.toggle('selected',selected===place);
      const signature = people.join();
      if (place.button.dataset.people!==signature) {
        place.button.innerHTML=people.map(person).join('')+`<span>${place.name}</span>`;
        place.button.dataset.people=signature;
      }
    });
  }
  function scheduleDraw() { cancelAnimationFrame(paintFrame); paintFrame=requestAnimationFrame(draw); }
  function choose(place, openPortfolio = true) {
    cancelAnimationFrame(flight); selected=place;
    if (openPortfolio) window.openCountryPortfolio(place);
    const people=travelersFor(place).map(t=>t==='john'?'John':'Mateo');
    selection.textContent=place.name+' · '+people.join(' & ')+(place.name==='USA' && people.includes('John')?' · John’s home':place.name==='Bolivia'?' · Mateo’s home':' · Visited');
    document.querySelectorAll('.footprint-country').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.place===place.name)));
    const start=performance.now(), from=rotation.slice();
    const target=[-place.coordinates[0],-place.coordinates[1],0];
    target[0]=from[0]+((target[0]-from[0]+540)%360)-180;
    const duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:850;
    function frame(now) {
      const t=duration?Math.min(1,(now-start)/duration):1, eased=1-Math.pow(1-t,3);
      rotation=from.map((v,i)=>v+(target[i]-v)*eased); draw();
      if(t<1) flight=requestAnimationFrame(frame);
    }
    flight=requestAnimationFrame(frame);
  }
  const list=document.querySelector('.traveler-destinations');
  ['john','mateo'].forEach(t=>{
    const group=document.createElement('section'); group.dataset.travelerGroup=t;
    const heading=document.createElement('h4'); heading.innerHTML=person(t)+(t==='john'?'John <small>FROM USA</small>':'Mateo <small>FROM BOLIVIA</small>');
    const options=document.createElement('div');
    places.filter(p=>p.travelers.includes(t)).forEach(place=>{
      const button=document.createElement('button'); button.type='button'; button.className='footprint-country'; button.dataset.place=place.name; button.textContent=place.name; button.setAttribute('aria-pressed','false');
      button.addEventListener('click',()=>choose(place)); options.append(button);
    });
    group.append(heading,options); list.append(group);
  });
  document.querySelectorAll('[data-traveler]').forEach(button=>button.addEventListener('click',()=>{
    filter=button.dataset.traveler;
    document.querySelectorAll('[data-traveler]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelectorAll('[data-traveler-group]').forEach(g=>g.hidden=filter!=='both'&&g.dataset.travelerGroup!==filter);
    if(selected && travelersFor(selected).length) choose(selected, false);
    else { selected=null; selection.textContent='Pick a place. Follow a footprint.'; document.querySelectorAll('.footprint-country').forEach(b=>b.setAttribute('aria-pressed','false')); }
    draw();
  }));
  surface.addEventListener('pointerdown',event=>{
    if(event.target.closest('button') || event.button!==0) return;
    suppressClick=false;
    cancelAnimationFrame(flight); drag={x:event.clientX,y:event.clientY,rotation:rotation.slice()};
     surface.classList.add('dragging');
  });
  surface.addEventListener('pointermove',event=>{
    if(!drag) return;
    if(Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>5) suppressClick=true;
    const factor=180/surface.clientWidth;
    rotation=[drag.rotation[0]+(event.clientX-drag.x)*factor, Math.max(-85,Math.min(85,drag.rotation[1]-(event.clientY-drag.y)*factor)),0];
    scheduleDraw();
  });
  function endDrag(){drag=null;surface.classList.remove('dragging');}
  window.addEventListener('pointerup',endDrag); surface.addEventListener('pointerleave',endDrag); surface.addEventListener('pointercancel',endDrag); surface.addEventListener('lostpointercapture',endDrag);
  surface.addEventListener('keydown',event=>{
    if(event.target!==surface || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;
    event.preventDefault(); cancelAnimationFrame(flight);
    if(event.key==='ArrowLeft')rotation[0]-=12;if(event.key==='ArrowRight')rotation[0]+=12;
    if(event.key==='ArrowUp')rotation[1]=Math.min(85,rotation[1]+12);if(event.key==='ArrowDown')rotation[1]=Math.max(-85,rotation[1]-12);
    draw();
  });
  document.querySelector('.footprint-reset').addEventListener('click',()=>{cancelAnimationFrame(flight);rotation=[55,-12,0];draw();});
  document.querySelectorAll('[data-globe-mode]').forEach(button=>button.addEventListener('click',()=>{
    const footprint=button.dataset.globeMode==='footprint';
    section.classList.toggle('footprint-active',footprint);
    document.querySelectorAll('[data-globe-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelector('.discovery-title').innerHTML=footprint?'Get lost<br><em>with us.</em>':'Unlock the world<br><em>with us.</em>';
    if(footprint)draw();
  }));
  draw();
})();

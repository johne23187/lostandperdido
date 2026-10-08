/* Classic ink-line hosts, with purpose-built seated and zero-gravity poses. */
(() => {
  const es=()=>document.documentElement.lang==='es';
  const t=(en,spanish)=>es()?spanish:en;
  const cap=(x,y,scale=1)=>`<g class="yankees-cap" transform="translate(${x} ${y}) scale(${scale})"><g class="cap-crown"><path d="M-11 1q-1-14 11-14T12 1Z" fill="#132448" stroke="#0a1830" stroke-width=".8"/><path d="M-10 0q11-3 22 1l7 2q-7 5-16 0l-13-1Z" fill="#1f385a" stroke="#0a1830" stroke-width=".8"/><path d="M-3-11Q-7-6-6-1M6-10q3 4 3 9" fill="none" stroke="#61758f" stroke-opacity=".45" stroke-width=".55"/><image href="assets/yankees-cap-logo.svg" x="-4.5" y="-10.5" width="9" height="9"/><ellipse cx="0" cy="-13" rx="1.6" ry=".8" fill="#233c60"/></g></g>`;
  function figure(pose='point',space=false){
    if(space)return `<svg class="guide-figure astronaut-figure" viewBox="0 0 76 98" aria-hidden="true"><g stroke="#243946" stroke-linecap="round" stroke-linejoin="round"><path d="M23 39q-8 8-5 24l9 3 7-22" fill="#95aabc" stroke-width="2"/><path d="M26 57 22 73 14 78M41 58l5 13 12 2" fill="none" stroke="#243946" stroke-width="11"/><path d="M26 57 22 73 14 78M41 58l5 13 12 2" fill="none" stroke="#edf1ed" stroke-width="8"/><path d="m13 75-4 5q-2 4 3 5l9-3M56 69l8 1q5 1 4 5l-11 2" fill="#d2dfe5" stroke-width="2"/><path d="M25 39 16 47 9 43M43 40l12-9 5-13" fill="none" stroke="#243946" stroke-width="10"/><path d="M25 39 16 47 9 43M43 40l12-9 5-13" fill="none" stroke="#edf1ed" stroke-width="7"/><path d="m7 39-4 4 5 4m49-29 3-7 3 4 3-1-4 8" fill="#d2dfe5" stroke-width="2"/><path d="M25 35q9-4 18 1l3 21q-10 8-24 0Z" fill="#f3f4ed" stroke-width="2"/><path d="m24 52 19 1M26 46l5 1m8-6 3 1" fill="none" stroke="#8aa5b6" stroke-width="2"/><circle cx="34" cy="23" r="19" fill="#e4eaf0" stroke-width="2"/><circle cx="34" cy="23" r="14.5" fill="#b9d7e333" stroke-width="1.4"/><circle cx="34" cy="24" r="9" fill="#fff9e9" stroke-width="1.8"/><path d="M31 28q3 3 6 0" fill="none" stroke-width="1.4"/><path d="M23 18q2-5 7-6" fill="none" stroke="#fff" stroke-width="2"/><path d="M28 40h7" stroke="#d36c47" stroke-width="2"/></g><g fill="#243946"><circle cx="31" cy="23" r="1.1"/><circle cx="37" cy="23" r="1.1"/></g></svg>`;
    const seated=pose==='sit'||pose==='sit-wave';
    const arms=pose==='both'?'M30 39 14 29 7 17M30 39 46 29 53 17':pose==='sit'?'M30 39 40 47 44 54M30 39 22 49 20 54':pose==='sit-wave'?'M30 39 17 30 14 17M30 39 40 49 43 54':'M30 39 19 47 12 43M30 39 46 29 55 19';
    const legs=seated?'M30 54 44 54 47 74 52 74M30 54 24 62 26 78 31 78':'M30 54 19 77 14 77M30 54 42 77 47 77';
    const hands=pose==='both'?'<g class="guide-hands" fill="#faf1dd" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 19 3 13q-1-2 1-2l4 5-1-4q0-2 2-1l3 6-1 4Z"/><path d="m53 19 4-6q1-2-1-2l-4 5 1-4q0-2-2-1l-3 6 1 4Z"/></g>':'';
    return `<svg class="guide-figure" viewBox="0 0 64 86" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M30 31v23${arms}${legs}"/></g><g class="guide-nodding-head" style="transform-origin:30px 31px"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="30" cy="21" r="10"/><path d="M27 24q3 3 6 0"/></g><g fill="currentColor"><circle cx="27" cy="20" r="1"/><circle cx="33" cy="20" r="1"/></g>${cap(30,14,.9)}</g>${hands}</svg>`;
  }
  function cue(target,pose='point',space=false,classes=''){
    if(!target)return;
    const node=document.createElement('span');node.className='little-guide '+classes;node.setAttribute('aria-hidden','true');
    node.innerHTML=figure(pose,space)+`<span data-guide-label>${t('click me!','¡haz clic!')}</span>`;
    target.classList.add('has-guide');target.append(node);return node;
  }
  const shelf=document.querySelector('.story-object-shelf');
  const invitation=document.createElement('p');invitation.className='lost-invitation';
  document.querySelector('.about-promise').after(invitation);
  const twin=document.createElement('div');twin.className='shelf-guide';twin.innerHTML=figure('both')+'<span></span>';shelf.after(twin);
  const gps=document.querySelector('.location-gps');
  const gpsHost=document.createElement('div');gpsHost.className='gps-with-guide';gps.before(gpsHost);gpsHost.append(gps);
  const astronaut=document.createElement('button');astronaut.type='button';astronaut.className='little-guide gps-guide';
  astronaut.setAttribute('aria-label','Hear from the astronaut');astronaut.setAttribute('aria-expanded','false');astronaut.setAttribute('aria-controls','gps-astronaut-message');
  astronaut.innerHTML=figure('point',true)+'<span id="gps-astronaut-message" data-guide-label hidden>yo no sabo</span>';
  gpsHost.append(astronaut);
  astronaut.addEventListener('click',()=>{astronaut.querySelector('[data-guide-label]').hidden=false;astronaut.setAttribute('aria-expanded','true');astronaut.setAttribute('aria-label','yo no sabo');});
  cue(document.querySelector('.satellite'),'point',true,'satellite-guide');
  const campGuide=cue(document.querySelector('.paper-card-wrap'),'point',false,'camp-guide');
  campGuide.querySelector('svg').insertAdjacentHTML('beforeend','<g class="camp-balloon"><path d="M12 43Q-3 20 1-8" fill="none" stroke="#8a6259" stroke-width="1"/><ellipse cx="1" cy="-22" rx="11" ry="15" fill="#d73a3e" stroke="#a52a32" stroke-width="1"/><path d="m1-7-2 3h4Z" fill="#a52a32"/><path d="M-5-29q-3 4-2 8" fill="none" stroke="#ffb4a5" stroke-width="2" stroke-linecap="round"/></g>');
  document.querySelector('.memory-launch').addEventListener('click',()=>{campGuide.hidden=true;});
  const van=document.querySelector('.memory-van');
  const vanArt=document.createElement('span');vanArt.className='van-art';const vanImage=van.querySelector('img');vanImage.before(vanArt);vanArt.append(vanImage);
  const vanCrew=document.createElement('span');vanCrew.className='van-crew';vanCrew.setAttribute('aria-hidden','true');
  // Shared 420 × 240 image coordinates lock both seated hips onto the roof rack.
  vanCrew.innerHTML=`<svg viewBox="0 0 420 240"><g transform="translate(110 7) scale(.9)">${figure('sit-wave').replace('<svg class="guide-figure" viewBox="0 0 64 86" aria-hidden="true">','<svg width="64" height="86" viewBox="0 0 64 86">')}</g><g transform="translate(190 1) scale(.9)">${figure('sit').replace('<svg class="guide-figure" viewBox="0 0 64 86" aria-hidden="true">','<svg width="64" height="86" viewBox="0 0 64 86">')}</g></svg>`;vanArt.append(vanCrew);
  function dressFigures(){
    document.querySelectorAll('.storybook-friends:not([data-capped])').forEach(svg=>{svg.dataset.capped='';svg.setAttribute('viewBox','0 -6 76 62');svg.insertAdjacentHTML('beforeend',cap(20,7,.7)+cap(58,7,.7));});
    document.querySelectorAll('.mountain-friend svg:not(.paraglider-canopy):not([data-capped]),.gps-travelers>svg:not([data-capped])').forEach(svg=>{svg.dataset.capped='';svg.insertAdjacentHTML('beforeend',svg.closest('.gps-travelers')?cap(28,17,1.1)+cap(72,17,1.1):cap(svg.closest('.mountain-sitter')?26:30,15,.8));});
    const cover=document.querySelector('.partner-cover');if(cover&&!cover.querySelector('.little-guide'))cue(cover,'sit',false,'magazine-guide');
  }
  dressFigures();
  // Separate only the head artwork; bodies, props and existing travel poses stay put.
  document.querySelectorAll('.mountain-friend>svg:not(.paraglider-canopy),.astronaut-figure').forEach(svg=>{
    const space=svg.classList.contains('astronaut-figure'),ink=svg.querySelector('g');if(!ink)return;
    const head=document.createElementNS('http://www.w3.org/2000/svg','g');head.classList.add('guide-nodding-head');
    head.style.transformOrigin=space?'34px 38px':svg.closest('.mountain-sitter')?'26px 31px':'30px 30px';
    const pieces=[...ink.children].filter(node=>node.tagName==='circle'||(node.tagName==='path'&&/^(M26 24|M22 25|M31 28|M23 18)/.test(node.getAttribute('d')||'')));
    ink.append(head);pieces.forEach(node=>head.append(node));
    const eyes=[...svg.children].find(node=>node.tagName==='g'&&node.hasAttribute('fill')&&node!==ink);if(eyes){eyes.setAttribute('stroke','none');head.append(eyes);}
    const hat=svg.querySelector(':scope>.yankees-cap');if(hat)head.append(hat);
  });
  document.querySelectorAll('.editorial-reader').forEach(reader=>new MutationObserver(dressFigures).observe(reader,{childList:true,subtree:true}));
  const entryData=window.LPEntryGuides;
  window.openEntryGuide=(name,opener)=>{const country=entryData.find(item=>item.name===name||item.key===name);if(!country)return;const panel=document.getElementById('entry-'+country.key);panel.showModal();panel.scrollTop=0;panel.addEventListener('close',()=>opener?.focus({preventScroll:true}),{once:true});};
  entryData.forEach(country=>{
    const panel=document.createElement('dialog');panel.className='country-entry';panel.dataset.country=country.key;panel.id='entry-'+country.key;panel.setAttribute('aria-labelledby',panel.id+'-title');
    document.body.append(panel);
    const link=document.createElement('a');link.className='entry-link';link.href='#'+panel.id;link.setAttribute('aria-haspopup','dialog');link.setAttribute('aria-controls',panel.id);link.dataset.entry=country.key;
    document.querySelector('.route-card.'+country.key+' .route-photo figcaption')?.append(link);
    link.addEventListener('click',event=>{event.preventDefault();panel.showModal();panel.scrollTop=0;});
    panel.addEventListener('click',event=>{if(event.target===panel)panel.close();});
    panel.addEventListener('close',()=>{if(link.isConnected)link.focus({preventScroll:true});});
  });
  function localize(){
    invitation.textContent=t('Are you lost yet?','¿Ya estás perdido?');
    twin.querySelector('span').innerHTML='2 books. <b class="books-still-lost">Still Lost</b>';
    document.querySelectorAll('[data-guide-label]').forEach(node=>node.textContent=node.closest('.gps-guide')?'yo no sabo':node.closest('.satellite-guide')?t('help','ayuda'):t('click me!','¡haz clic!'));
    entryData.forEach(country=>{
      const node=document.querySelector('.country-entry[data-country="'+country.key+'"]');
      const routeLink=document.querySelector('[data-entry="'+country.key+'"]');if(routeLink)routeLink.textContent=t('Entry guide · U.S. citizens','Ingreso · ciudadanos de EE. UU.');
      node.innerHTML=window.LPEntryGuideMarkup(country,t,node.id);
    });
    dressFigures();
  }
  localize();document.addEventListener('lp:languagechange',localize);
  document.querySelector('.get-lost-link').addEventListener('click',event=>{
    event.preventDefault();const target=document.getElementById('hosts-heading');
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
      const source=event.currentTarget.querySelector('svg'),box=source.getBoundingClientRect();const plane=source.cloneNode(true);plane.classList.add('flying-departure');Object.assign(plane.style,{left:box.left+'px',top:box.top+'px'});document.body.append(plane);
      plane.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(35px,${Math.min(innerHeight*.55,420)}px) rotate(80deg)`,opacity:0}],{duration:950,easing:'ease-in-out'}).finished.then(()=>plane.remove());
    }
    target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true});history.replaceState(null,'','#hosts-heading');
  });
})();

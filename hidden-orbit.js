/* Quiet discoveries in the shared sky. Destination submissions use their own shared store. */
(() => {
 const t=(en,es)=>document.documentElement.lang==='es'?es:en;
 const satellite=document.querySelector('.globe-gps-footer .satellite');
 if(!satellite)return;
 const moon=document.createElement('button');moon.type='button';moon.className='after-dark-moon';moon.setAttribute('aria-haspopup','dialog');moon.setAttribute('aria-controls','lost-after-dark');
 moon.innerHTML='<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="after-dark-moon-gold" cx="43%" cy="45%" r="65%"><stop stop-color="#fffbc0"/><stop offset=".48" stop-color="#fff18a"/><stop offset=".8" stop-color="#f8d541"/><stop offset="1" stop-color="#dcae29"/></radialGradient><filter id="moon-painted-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".22" numOctaves="3" seed="12" result="grain"/><feColorMatrix in="grain" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".17"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs><path d="M72 7C30-4 2 23 6 59C10 89 43 105 72 91C83 86 92 77 92 73C91 71 88 72 85 74C52 90 23 66 32 36C38 17 53 12 70 12C76 12 76 8 72 7Z" fill="url(#after-dark-moon-gold)" filter="url(#moon-painted-grain)"/></svg>';
 const moonArt=moon.querySelector('svg');
 moonArt.insertAdjacentHTML('beforeend',`<g class="moon-fisher" stroke="#293d50" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(132 0) scale(-1 1)"><path d="M67 72 54 77 57 88M67 74 69 85 63 94" fill="none" stroke="#edf1ed" stroke-width="7"/><path d="m55 87 6 1m0 7 6-2" stroke="#243946" stroke-width="4"/><path d="M60 53q7-4 13 1l2 19q-5 6-15 1Z" fill="#f3f4ed" stroke-width="1.2"/><path d="M60 57 52 63 44 57M70 57 60 65 47 60" fill="none" stroke="#edf1ed" stroke-width="5"/><path d="M62 61h7v7h-7Z" fill="#243946" stroke-width=".6"/><path d="M61 70h12M61 55h9" stroke="#d3a657" stroke-width="1.5"/><g class="moon-fishing-rod"><path d="M49 65Q34 20 5 10" fill="none" stroke="#c8a86b" stroke-width="1.8"/><path class="moon-fishing-line" d="M5 10Q0 36 9 65T14 100" fill="none" stroke="#dce6df" stroke-width=".6"/><circle cx="14" cy="99" r="1.6" fill="#f8dda0" stroke="none"/></g><path d="m44 57 4 3m-2 0 4 2" stroke="#fff1d8" stroke-width="3"/><image href="assets/john-yankees-smiling-192.webp" x="53" y="29" width="26" height="29" transform="rotate(-15 66 56)" preserveAspectRatio="xMidYMax meet" stroke="none"/></g></g>`);
 const moonSection=satellite.closest('.discover-section');
 satellite.closest('.globe-gps-footer').append(moon);
 function modal(id){const d=document.createElement('dialog');d.id=id;d.className='orbit-secret-dialog';document.body.append(d);d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();});return d;}
 const dark=modal('lost-after-dark');dark.setAttribute('aria-labelledby','after-dark-title');
 const categories=[['Nightlife','Vida nocturna','The city clocks out. We clock in.','La ciudad sale del trabajo. Nosotros salimos a explorar.','Bars, dance floors, live music, and the places worth staying up for.','Bares, baile, música en vivo y lugares que merecen una noche larga.'],['Nighttime adventures','Aventuras nocturnas','Less daylight. More possibility.','Menos luz. Más posibilidades.','Stargazing, night walks, late-night food, and events after sunset.','Estrellas, paseos, comida de madrugada y eventos después del atardecer.'],['Lost Footage','Lost Footage','Some stories miss the final cut.','Algunas historias quedan fuera del montaje.','The candid moments, late-night conversations, and grown-up side of getting lost.','Momentos espontáneos, conversaciones nocturnas y el lado adulto de perderse.']];
 let category=0,selectedNightCity='NYC';
 const cityOptions=()=>window.LPNightCities.map(([key,label])=>`<option value="${key}">${label}</option>`).join('');
 const nightPicks=[
  ['The Ripple Room','183 Bowery, Manhattan','bar','https://www.google.com/maps/search/?api=1&query=The+Ripple+Room+183+Bowery+New+York','NYC'],
  ['Abracadabra','English Harbour, Antigua','club','https://www.visitantiguabarbuda.com/culinary/abracadabra-antigua/','AG'],
  ['Loose Cannon','Galleon Beach, Antigua','sunset','https://www.loosecannonbeachbar.com/','AG'],
  ['VYCE','St. John’s, Antigua','club','https://www.antiguasearch.com/listing/vyce-sports-bar-and-lounge','AG'],
  ['Mr Liquor','Santiago, Dominican Republic','bar','https://mrliquorrd.com/','DR'],
  ['La Ciguapa','Santiago, Dominican Republic','perreo','https://visitsantiago.do/lugar/la-ciguapa/','DR'],
  ['Galipote Afterwork','Santiago, Dominican Republic','bar','https://www.instagram.com/galipoterd/','DR'],
  ['Lovera','Santiago, Dominican Republic','club','https://www.hotellovera.com/en/lovera-discotec-en','DR'],
  ['Cielo Rooftop','AC Hotel / Santiago, Dominican Republic','rooftop','https://www.marriott.com/en-us/dining/restaurant-bar/stiac-ac-hotel-santiago-de-los-caballeros/7324880-cielo-rooftop.mi','DR'],
  ['Mijani The Club','La Placita, Santurce','club','https://www.discoverpuertorico.com/article/guide-to-la-placita-restaurants-bars-nightlife','SJ','La Placita / Top 5 to explore'],
  ['Club Vibra','La Placita, Santurce','perreo','https://www.discoverpuertorico.com/article/guide-to-la-placita-restaurants-bars-nightlife','SJ','La Placita / Top 5 to explore'],
  ['Aguardiente','La Placita, Santurce','club','https://www.discoverpuertorico.com/article/best-places-to-experience-nightlife-san-juan','SJ','La Placita / Top 5 to explore'],
  ['Garabatos','La Placita, Santurce','club','https://www.discoverpuertorico.com/article/best-places-to-experience-nightlife-san-juan','SJ','La Placita / Top 5 to explore'],
  ['Bar El Rubí','La Placita, Santurce','bar','https://www.discoverpuertorico.com/article/best-places-to-experience-nightlife-san-juan','SJ','La Placita / Top 5 to explore'],
  ['Distrito T-Mobile','Convention District, San Juan','district','https://www.distritot-mobile.com/','SJ','Beyond La Placita'],
  ['La 39','La Perla, Old San Juan','bar','https://www.discoverpuertorico.com/article/visiting-la-perla-neighborhood-old-san-juan','SJ','La Perla / The bar pick'],
  ['Pianos','Lower East Side, Manhattan','club','https://pianosnyc.com/','NYC'],
  ['Marquee','Chelsea, Manhattan','club','https://taogroup.com/venues/marquee-new-york/','NYC'],
  ['Lost in Paradise','Long Island City, Queens','perreo','https://www.lostinparadiserooftop.com/','NYC'],
  ['Republic Latin Fusion','Williamsburg, Brooklyn','perreo','https://republiclatinfusion.com/','NYC'],
  ['Dramma','Times Square, Manhattan','club','https://1604broadway.com/','NYC'],
  ['The Delancey Rooftop','Lower East Side, Manhattan','rooftop','https://thedelancey.com/','NYC'],
  ['Fat Taco','Hoboken, New Jersey','perreo','https://www.fattacohoboken.com/','NJ'],
  ['Perreo on the Pier','Watermark / Pier 15, South Street','perreo','https://www.eventbrite.com/e/perreo-on-the-pier-open-air-latin-reggaeton-dance-party-nyc-tickets-1338926006729','NYC'],
  ['BarCode','Elizabeth, New Jersey','perreo','https://barcodenj.com/','NJ']
 ];
 nightPicks.push(...window.LPNightAdventures.filter(p=>p.nightlife).map(p=>[p.name,p.place,p.nightlife,p.url,p.city,'',p.copy,p.detail]));
 function renderNightlife(){
  const room=dark.querySelector('.after-dark-room');
  room.innerHTML=`<span class="night-room-number">01 / ${t('THE NIGHT SHIFT','EL TURNO DE NOCHE')}</span><h3>${t('Miss the bedtime. Keep the story.','Pierde el sueño. Quédate con la historia.')}</h3><p>${t('Different cities. Later nights. A few good reasons to stay lost a little longer.','Otras ciudades. Noches más largas. Razones para seguir perdidos un rato más.')}</p><label class="night-city-label">${t('Choose your city','Elige tu ciudad')}<select class="night-city">${cityOptions()}</select></label><div class="night-vibe-filters" aria-label="${t('Nightlife vibe','Tipo de noche')}"><button type="button" data-vibe="all" aria-pressed="true">${t('All nights','Todas')}</button><button type="button" data-vibe="perreo" aria-pressed="false">Perreo / Reggaeton</button><button type="button" data-vibe="rooftop" aria-pressed="false">${t('Rooftops','Azoteas')}</button><button type="button" data-vibe="club" aria-pressed="false">${t('Dance floors','Pistas de baile')}</button></div><div class="night-venues" aria-live="polite"></div><p class="night-program-note">${t('The venue is the starting point. Check its current lineup for the night, music, and entry details.','El lugar es el punto de partida. Consulta su programación para la música y los detalles de entrada.')}</p>`;
  let vibe='all';const city=room.querySelector('select');city.value=selectedNightCity;
  function draw(){const picks=nightPicks.filter(p=>(p[4]===city.value)&&(vibe==='all'||p[2]===vibe||(vibe==='rooftop'&&p[0]==='Lost in Paradise')));room.querySelector('.night-venues').innerHTML=picks.length?picks.map((p,index)=>`${city.value==='SJ'&&p[5]!==picks[index-1]?.[5]?`<h4 class="night-area-heading">${p[5]}</h4>`:''}<a class="night-venue" href="${p[3]}" target="_blank" rel="noopener noreferrer"><span class="night-venue-symbol" aria-hidden="true">${p[2]==='perreo'?'♫':p[2]==='rooftop'?'☾':'◈'}</span><small>${p[1]}</small><h4>${p[0]}</h4>${p[6]?`<p class="adventure-hook">${t(...p[6])}</p><p class="adventure-detail">${t(...p[7])}</p>`:''}<span class="night-venue-tag">${p[2]==='perreo'?'PERREO / REGGAETON':p[2]==='rooftop'?t('ROOFTOP','AZOTEA'):p[2]==='bar'?t('BAR / LIVE MUSIC','BAR / MÚSICA EN VIVO'):p[2]==='sunset'?t('SUNSET / OPEN AIR','ATARDECER / AL AIRE LIBRE'):p[2]==='district'?t('ENTERTAINMENT DISTRICT','DISTRITO DE ENTRETENIMIENTO'):t('DANCE FLOOR','PISTA DE BAILE')}</span><span class="night-venue-link">${t('Explore the night','Explora la noche')} ↗</span></a>`).join(''):`<div class="night-empty"><span aria-hidden="true">☾</span><strong>${t('This part of the night is still unwritten.','Esta noche todavía está por escribir.')}</strong><p>${t('More places will land here as we explore. Try another city or vibe.','Aquí llegarán más lugares. Prueba otra ciudad o ambiente.')}</p></div>`;}
  city.onchange=()=>{selectedNightCity=city.value;draw();};room.querySelectorAll('[data-vibe]').forEach(b=>b.onclick=()=>{vibe=b.dataset.vibe;room.querySelectorAll('[data-vibe]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));draw();});draw();
 }

 function renderAdventures(){
  const room=dark.querySelector('.after-dark-room');
  const filters=[['all',t('All adventures','Todas')],['music',t('Music & dance','M\u00fasica y baile')],['games',t('Game night','Juegos')],['outdoors',t('Sunset & outside','Atardecer y aire libre')],['food',t('Evening bites','Algo de comer')],['comedy',t('Comedy','Comedia')],['film',t('Film nights','Cine')],['sports',t('Sports & racing','Deportes y carreras')]];
  room.innerHTML=`<span class="night-room-number">02 / ${t('OFF THE ITINERARY','FUERA DEL ITINERARIO')}</span><h3>${t('A good night starts with a little detour.','Una buena noche empieza con un peque\u00f1o desv\u00edo.')}</h3><p>${t('Sunset stops, late discoveries, and a few daytime warm-ups.','Atardeceres, descubrimientos nocturnos y algunas paradas para empezar de d\u00eda.')}</p><label class="night-city-label">${t('Choose your city','Elige tu ciudad')}<select class="night-city">${cityOptions()}</select></label><div class="night-vibe-filters" aria-label="${t('Choose an adventure','Elige una aventura')}"></div><div class="night-venues adventure-venues" aria-live="polite"></div><p class="night-program-note">${t('Follow each link for current dates, hours and bookings. Seasonal events run only on scheduled dates.','Consulta fechas, horarios y reservas en cada enlace. Los eventos de temporada solo se celebran en fechas programadas.')}</p>`;
  let filter='all';const city=room.querySelector('select');city.value=selectedNightCity;
  function draw(){
   const local=window.LPNightAdventures.filter(p=>p.city===city.value);
   room.querySelector('.night-vibe-filters').innerHTML=filters.filter(([key])=>key==='all'||local.some(p=>p.type===key)).map(([key,label])=>`<button type="button" data-adventure="${key}" aria-pressed="${key===filter}">${label}</button>`).join('');
   room.querySelector('.adventure-venues').innerHTML=local.filter(p=>filter==='all'||p.type===filter).map(p=>`<a class="night-venue night-adventure" href="${p.url}" target="_blank" rel="noopener noreferrer"><span class="night-venue-symbol" aria-hidden="true">${p.type==='music'?'\u266b':p.type==='outdoors'?'\u2726':p.type==='games'?'\u2684':p.type==='sports'?'\u2691':'\u263e'}</span><small>${p.place}</small><h4>${p.name}</h4><p class="adventure-hook">${t(...p.copy)}</p><p class="adventure-detail">${t(...p.detail)}</p><span class="night-venue-link">${t('Plan the detour','Planea el desv\u00edo')} \u2197</span></a>`).join('');
   room.querySelectorAll('[data-adventure]').forEach(button=>button.onclick=()=>{filter=button.dataset.adventure;draw();});
  }
  city.onchange=()=>{selectedNightCity=city.value;filter='all';draw();};draw();
 }
 function renderDark(){
  dark.innerHTML=`<div class="night-party-shadow" aria-hidden="true"><svg viewBox="0 0 300 420"><g class="night-dancer" fill="#040507"><g class="dancer-spin"><g class="dancer-finale"><g class="dancer-upper"><g class="dancer-head"><path d="m115 54 5-27q2-7 11-5l17 5 17-2q7 0 8 7l5 25Z"/><path d="M100 54q35-5 83 4l13 6q-38 9-92 0-9-3-4-10Z"/><path d="m128 65 40 1-1 14 8 8-8 5-3 17-13 5-1 18-25-7 9-21q-16-13-6-40Z"/></g><path d="m126 116 28 4 19 18-7 46 1 58-22 10-19-12-23 9 7-56-5-51Z"/><path d="m127 129 12 43-13 26-12-57Z" fill="#040507"/><g class="dancer-arm-left"><path d="m114 133-15 5-13 59q-2 12 9 18l30 14 7-13-28-19 20-48Z"/><path d="m126 213 13 7 4 11-7 5-14-10Z"/></g><g class="dancer-arm-right"><path d="m157 131 19 3 23-36-25-29 8-9 35 34q5 6 0 15l-32 49q-12 9-24-2Z"/><path d="m173 74-8-7 1-11 17-3 8 7-10 12Z"/></g></g><ellipse cx="140" cy="239" rx="29" ry="16"/><g class="dancer-leg-left"><path d="m111 233 30 4-11 69 6 67-17 1-14-73Z"/><path d="m119 368 17 0 5 16 25 7q7 7-4 10l-44-2-3-8Z"/></g><g class="dancer-leg-right"><path d="m141 237 27-2 7 70-22 65-16-5 14-65Z"/><path d="m138 362 18 5-4 21 17 8q5 6-5 8l-37-3 1-15Z"/></g></g></g></g></svg></div><button class="orbit-close" type="button" aria-label="${t('Return to the sky','Volver al cielo')}">×</button><div class="underworld-header"><span class="secret-coordinate">L&amp;P / ${t('YOU FOUND THE OTHER SIDE','ENCONTRASTE EL OTRO LADO')}</span><div class="underworld-moon" aria-hidden="true">☾</div><h2 id="after-dark-title">Lost <em>After Dark</em></h2><p>${t('Good nights rarely follow the itinerary.','Las mejores noches rara vez siguen el itinerario.')}</p><span class="secret-unlocked">${t('OFF THE ITINERARY · AFTER HOURS','FUERA DEL ITINERARIO · DE NOCHE')}</span></div><nav class="after-dark-tabs" aria-label="${t('Explore after dark','Explorar de noche')}">${categories.map((c,i)=>`<button type="button" data-night="${i}" aria-pressed="${category===i}">${t(c[0],c[1])}</button>`).join('')}</nav><section class="after-dark-room" aria-live="polite"></section><footer class="underworld-footer">${t('You weren’t lost. You were looking in the right shadows.','No estabas perdido. Buscabas en las sombras correctas.')}</footer>`;
  dark.querySelector('.orbit-close').onclick=()=>dark.close();
  dark.querySelectorAll('[data-night]').forEach(b=>b.onclick=()=>{category=Number(b.dataset.night);dark.querySelectorAll('[data-night]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderRoom();});renderRoom();
 }
 function renderRoom(){if(category===0){renderNightlife();return;}if(category===1){renderAdventures();return;}const c=categories[category];dark.querySelector('.after-dark-room').innerHTML=`<span class="night-room-number">0${category+1} / ${category===2?t('THE PRIVATE CUT · MATURE AUDIENCES','EL OTRO MONTAJE · PÚBLICO ADULTO'):t('FIELD NOTES AFTER SUNSET','NOTAS DESPUÉS DEL ATARDECER')}</span><h3>${t(c[2],c[3])}</h3><p>${t(c[4],c[5])}</p>${category!==2?`<label class="night-city-label">${t('A different city. A different night.','Otra ciudad. Otra noche.')}<select class="night-city"><option>Mendoza</option><option>Santiago</option><option>La Paz</option><option>New York</option></select></label>`:''}<div class="night-empty"><span aria-hidden="true">${category===2?'▤':category===1?'✦':'◒'}</span><strong class="night-empty-title"></strong><p>${category===2?t('Our first Lost Footage drop is still in the vault. Real clips and stories will land here when we’re ready to share them.','El primer Lost Footage sigue en la bóveda. Aquí llegarán nuestros videos e historias cuando estén listos.'):t('Our own recommendations and experiences will appear here after we explore. No borrowed favorites. No invented nights.','Nuestras recomendaciones y experiencias llegarán después de explorar. Sin favoritos prestados ni noches inventadas.')}</p></div>`;const select=dark.querySelector('.night-city');const update=()=>{dark.querySelector('.night-empty-title').textContent=category===2?t('The vault is waiting.','La bóveda espera.'):(select.value+' / '+t('Field notes coming soon','Próximamente'));};if(select)select.onchange=update;update();}
 let darkEntranceTimer,moonFallTimer;
 function resetFisher(){clearTimeout(moonFallTimer);moon.classList.remove('moon-fishing-fall');moon.removeAttribute('aria-busy');}
 function enterNight(){
  if(document.hidden){resetFisher();return;}
  renderDark();dark.classList.remove('after-dark-entering');
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)dark.classList.add('after-dark-entering');
  dark.showModal();dark.scrollTop=0;resetFisher();
  document.dispatchEvent(new Event('lp:afterdarkintro'));
  clearTimeout(darkEntranceTimer);darkEntranceTimer=setTimeout(()=>dark.classList.remove('after-dark-entering'),5000);
 }
 moon.onclick=()=>{
  if(moon.hasAttribute('aria-busy')||dark.open)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){enterNight();return;}
  moon.setAttribute('aria-busy','true');moon.classList.add('moon-fishing-fall');
  moonFallTimer=setTimeout(enterNight,1150);
 };
 document.addEventListener('keydown',e=>{if(e.key==='Escape')resetFisher();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)resetFisher();});
 dark.addEventListener('close',()=>{clearTimeout(darkEntranceTimer);dark.classList.remove('after-dark-entering');moon.focus({preventScroll:true});});
 const next=modal('where-next');next.setAttribute('aria-labelledby','where-next-title');
 const ship=document.createElement('button');ship.type='button';ship.className='where-next-ship';ship.setAttribute('aria-haspopup','dialog');ship.setAttribute('aria-controls','where-next');
 ship.innerHTML='<svg viewBox="0 0 70 55" aria-hidden="true"><path d="M24 26q2-21 11-21t11 21" fill="#9fd4d6" stroke="#315b67" stroke-width="2"/><path d="M8 31q27-19 54 0-27 23-54 0Z" fill="#dfd9c6" stroke="#315b67" stroke-width="2"/><ellipse cx="35" cy="30" rx="27" ry="7" fill="#819eaa" stroke="#315b67" stroke-width="2"/><path d="m24 43-5 7m16-6v8m11-9 5 7" stroke="#d5b36e" stroke-width="2"/><g fill="#ffe5a1"><circle cx="20" cy="30" r="2"/><circle cx="35" cy="32" r="2"/><circle cx="50" cy="30" r="2"/></g></svg><span></span>';
 window.LPDestinations={mount(container=document){const dock=container.querySelector('[data-destination-ufo]');if(dock)dock.append(ship);}};
 window.LPDestinations.mount();
 const alien=document.createElementNS('http://www.w3.org/2000/svg','g');alien.classList.add('ufo-alien');alien.innerHTML='<path d="M29 29v-8q6-5 12 0v8" fill="#89ba91" stroke="#315b67" stroke-width="1.2"/><path d="M27 12q0-9 8-9t8 9q-1 9-8 12-7-3-8-12Z" fill="#b8dda3" stroke="#315b67" stroke-width="1.2"/><path d="M29 11q5 0 5 6-5-1-5-6m12 0q-5 0-5 6 5-1 5-6" fill="#203e45"/><path d="M33 20q2 1 4 0M41 24l5-5 1-6" fill="none" stroke="#315b67" stroke-width="1.5" stroke-linecap="round"/>';
 ship.querySelector('svg').insertBefore(alien,ship.querySelector('svg').children[1]);
 const mapShip=ship.cloneNode(true);document.querySelector('.gps-expanded-screen .gps-compass-dock')?.append(mapShip);let activeShip=ship;
 let pending=false,submissionId=null;
 next.innerHTML=`<button class="orbit-close" type="button" aria-label="${t('Close suggestions','Cerrar sugerencias')}">×</button><span class="secret-coordinate">L&amp;P / ${t('MISSION CONTROL','CONTROL DE MISIÓN')}</span><h2 id="where-next-title">${t('Where to next?','¿A dónde vamos?')}</h2><p>${t('Give our questionable sense of direction a new destination.','Dale un nuevo destino a nuestro dudoso sentido de orientación.')}</p><form class="destination-form"><div class="destination-fields"><label>${t('Country','País')}<input name="country" required maxlength="40" autocomplete="country-name"></label><label>${t('City','Ciudad')}<input name="city" required maxlength="60" autocomplete="address-level2"></label></div><label>${t('Why should we get lost there?','¿Por qué deberíamos perdernos allí?')}<textarea name="reason" rows="3" maxlength="500" placeholder="${t('A place, an experience, or simply a very good hunch.','Un lugar, una experiencia o una buena corazonada.')}"></textarea></label><label class="destination-trap" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label><small>${t('Your destination and note will appear on this shared list.','Tu destino y nota aparecerán en esta lista compartida.')}</small><button type="submit">${t('Send the coordinates','Enviar las coordenadas')} ↗</button></form><p class="destination-status" role="status"></p><div class="destination-list"></div><button type="button" class="destination-refresh">${t('Refresh destinations','Actualizar destinos')} ↻</button>`;
 const form=next.querySelector('form'),status=next.querySelector('.destination-status'),submit=form.querySelector('[type=submit]');
 next.querySelector('.orbit-close').onclick=()=>next.close();next.addEventListener('close',()=>activeShip.focus({preventScroll:true}));
 async function request(options){
  const unavailable=()=>new Error(t('Destination suggestions are temporarily unavailable. Please try again shortly.','Las sugerencias no están disponibles por ahora. Inténtalo de nuevo en un momento.'));
  let r;try{r=await fetch('/api/destinations',{...options,signal:AbortSignal.timeout(12000)});}catch{throw unavailable();}
  if(r.status===429)throw new Error(t('Let this destination land. Try again in a minute.','Espera un minuto antes de enviar otro destino.'));
  if(!r.ok)throw unavailable();
  let data;try{data=await r.json();}catch{throw unavailable();}
  if(!data||typeof data!=='object'||(options?.method==='POST'?!data.story:!Array.isArray(data.stories)))throw unavailable();
  return data;
 }
 let destinations=[],destinationPage=0;
 const pager=document.createElement('nav');pager.className='destination-pager';pager.setAttribute('aria-label',t('Destination pages','Paginas de destinos'));next.querySelector('.destination-list').after(pager);
 function drawDestination(){
  const list=next.querySelector('.destination-list');list.replaceChildren();pager.replaceChildren();
  if(!destinations.length){list.textContent=t('Uncharted territory. Leave the first coordinates.','Territorio nuevo. Deja las primeras coordenadas.');return;}
  const item=destinations[destinationPage],card=document.createElement('article'),title=document.createElement('strong'),note=document.createElement('p');title.textContent=item.place+', '+item.name;note.textContent=item.story;card.append(title,note);list.append(card);
  const prev=document.createElement('button'),label=document.createElement('span'),forward=document.createElement('button');prev.type=forward.type='button';prev.textContent=t('Previous','Anterior');forward.textContent=t('Next','Siguiente');prev.disabled=destinationPage===0;forward.disabled=destinationPage===destinations.length-1;label.textContent=(destinationPage+1)+' / '+destinations.length;prev.onclick=()=>{destinationPage--;drawDestination();};forward.onclick=()=>{destinationPage++;drawDestination();};pager.append(prev,label,forward);
 }
 function cards(items){destinations=items.flatMap(item=>{const parts=item.story.match(/[\s\S]{1,120}(?:\s|$)|[\s\S]{1,120}/g)||[''];return parts.map((story,i)=>({...item,story,place:item.place+(parts.length>1?' ('+(i+1)+'/'+parts.length+')':'')}));});destinationPage=Math.min(destinationPage,Math.max(0,destinations.length-1));drawDestination();}
 let revision=0;
 async function refresh(){const version=revision;try{const data=await request();if(version===revision){cards(data.stories);status.textContent='';}}catch(e){if(version===revision)status.textContent=e.message;}}
 const missionPilot=document.createElement('span');missionPilot.className='mission-pilot';missionPilot.setAttribute('aria-hidden','true');missionPilot.append(ship.querySelector('svg').cloneNode(true));next.querySelector('.secret-coordinate').prepend(missionPilot);
 let launchTimer;
 function resetLaunch(cancelSound=true){clearTimeout(launchTimer);if(cancelSound)document.dispatchEvent(new Event('lp:ufocancel'));[ship,mapShip].forEach(el=>{el.classList.remove('ufo-launching');el.removeAttribute('aria-busy');});}
 function arrive(){if(document.hidden){resetLaunch();return;}next.showModal();refresh();resetLaunch(false);}
 ship.onclick=mapShip.onclick=event=>{
  if(ship.hasAttribute('aria-busy')||mapShip.hasAttribute('aria-busy')||next.open)return;
  activeShip=event.currentTarget;
  document.dispatchEvent(new Event('lp:ufolaunch'));
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){arrive();return;}
  activeShip.setAttribute('aria-busy','true');activeShip.classList.add('ufo-launching');launchTimer=setTimeout(arrive,1400);
 };
 document.addEventListener('keydown',e=>{if(e.key==='Escape')resetLaunch();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)resetLaunch();});
 mapShip.closest('dialog')?.addEventListener('close',resetLaunch);
 next.querySelector('.destination-refresh').onclick=refresh;
 form.addEventListener('input',()=>submissionId=null);
 form.addEventListener('submit',async e=>{e.preventDefault();if(pending||!form.reportValidity())return;const reason=form.elements.reason.value.trim();if(reason.split(/\s+/u).length>100){status.textContent=t('Keep your note to 100 words.','Máximo 100 palabras.');return;}pending=true;submit.disabled=true;submissionId??=crypto.randomUUID();status.textContent=t('Sending coordinates…','Enviando coordenadas…');try{await request({method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:submissionId,name:form.elements.country.value,place:form.elements.city.value,story:reason||t('A new place to get lost.','Un nuevo lugar para perdernos.'),website:form.elements.website.value})});revision++;form.reset();submissionId=null;await refresh();status.textContent=t('Coordinates received. Officially on our radar.','Coordenadas recibidas. Ya está en nuestro radar.');}catch(error){status.textContent=error.message;}finally{pending=false;submit.disabled=false;}});
 function labels(){moon.setAttribute('aria-label',t('Discover Lost After Dark','Descubre Lost After Dark'));moon.title=t('Lost After Dark','Lost After Dark');ship.querySelector('span').textContent=t('Where to next?','¿A dónde vamos?');ship.setAttribute('aria-label',t('Suggest where we should travel next','Sugiere nuestro próximo destino'));}
 const labelBoth=()=>{labels();mapShip.querySelector('span').textContent=ship.querySelector('span').textContent;mapShip.setAttribute('aria-label',ship.getAttribute('aria-label'));};
 labelBoth();document.addEventListener('lp:languagechange',()=>{labelBoth();if(dark.open)renderDark();});
})();





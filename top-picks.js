/* Our own picks, with artwork linked back to the artists and shows. */
(() => {
 const data={"artists": [{"key": "ozuna", "name": "Ozuna", "url": "https://open.spotify.com/artist/1i8SpTcr7yvPOmcqrbnVXY"}, {"key": "omega", "name": "Omega", "url": "https://open.spotify.com/artist/1UjxAZqzphB1tsMb1aWBj0"}, {"key": "bad-bunny", "name": "Bad Bunny", "url": "https://open.spotify.com/artist/4q3ewBCX7sLwd24euuV69X"}, {"key": "el-alfa", "name": "El Alfa", "url": "https://open.spotify.com/artist/2oQX8QiMXOyuqbcZEFsZfm"}, {"key": "anthony-santos", "name": "Anthony Santos", "url": "https://open.spotify.com/artist/06TVTkMAOR935MhkjX0i2A"}, {"key": "fran-aliss", "name": "Fran Aliss", "url": "https://open.spotify.com/artist/3PlgEHWfJplE2qFIVCls6E"}, {"key": "feel-trip", "name": "feel trip.", "url": "https://open.spotify.com/artist/7ysdcHcrr06qQJ1BL0dKVU"}], "songs": [{"key": "mi-buena-suerte", "name": "mi buena suerte.", "artist": "feel trip.", "url": "https://open.spotify.com/track/6xVXJynT4L6aPmbI6Rzw5M"}, {"key": "hipnotizado", "name": "Hipnotizado", "artist": "Fran Aliss", "url": "https://open.spotify.com/track/2KGSIsAOIyXltuVeOThuch"}, {"key": "omega-song", "name": "Tu No Tá Pa’ Mi", "artist": "Omega", "url": "https://open.spotify.com/track/6n5AS39NnVJiilJmeNy6jT"}], "shows": [{"key": "icarly", "name": "iCarly", "url": "https://www.tvmaze.com/shows/808/icarly"}, {"key": "spongebob", "name": "SpongeBob SquarePants", "url": "https://www.tvmaze.com/shows/713/spongebob-squarepants"}, {"key": "the-office", "name": "The Office", "url": "https://www.tvmaze.com/shows/526/the-office"}]};
 data.artists.push(...[['juanes','Juanes','0UWZUmn7sybxMCqrw9tGa7'],['drake','Drake','3TVXtAsR1Inumwj472S9r4'],['future','Future','1RyvyyTE3xzB2ZywiAwp0i'],['kanye','Kanye West','5K4W6rqBFWDnAN6FQUkS6x']].map(([key,name,id])=>({key,name,url:'https://open.spotify.com/artist/'+id})));
 data.songs.push(...[
  ['puffin','PUFFIN ON ZOOTIEZ','Future','1qMMYpVatbRITKCfq1gasi','future'],
  ['drankin','Drankin N Smokin','Future & Lil Uzi Vert','2JD1xn6q8dLmBq8PaXGpOl','future'],
  ['how-bout-now','How Bout Now','Drake','4n4BflhWjCHIxrI4v7Xt9s','drake'],
  ['too-much-sauce','Too Much Sauce','DJ ESCO feat. Future & Lil Uzi Vert','4S47OhdoxuZbowpuQT49b6','future']
 ].map(([key,name,artist,id,art])=>({key,name,artist,art,url:id?'https://open.spotify.com/track/'+id:'https://open.spotify.com/search/'+encodeURIComponent(name+' '+artist)})));
 data.artists.push(...[
  ['romeo-santos','Romeo Santos','5lwmRuXgjX8xIwlnauTZIP'],
  ['el-prodigio','El Prodigio','0mXFUCl68VMz2BhKzq1zCO'],
  ['lil-wayne','Lil Wayne','55Aa2cqylxrFIXC767Z865'],
  ['lil-uzi','Lil Uzi Vert','4O15NlyKLIASxsJ0PrXPfz'],
  ['rauw-alejandro','Rauw Alejandro','1mcTU81TzQhprhouKaTkpq']
 ].map(([key,name,id])=>({key,name,url:'https://open.spotify.com/artist/'+id})));
 data.songs.push(...[
  ['nossa','Ai Se Eu Te Pego','Michel Teló','3M1acP5ae6TRfpm5k0Kogm'],
  ['mia','MIA (feat. Drake)','Bad Bunny · Drake','116H0KvKr2Zl4RPuVBruDO'],
  ['you-better-move','You Better Move','Lil Uzi Vert','5SshoyoXGedXXMCXUkdmX4'],
  ['prices','Prices','Lil Uzi Vert','1ddV89RtsGqS375oFK2Boe'],
  ['xtcy','XTCY','Kanye West','64wdPpi4OeCQF4W2oMZ9Wt']
 ].map(([key,name,artist,id])=>({key,name,artist,art:key==='xtcy'?'kanye':key,url:'https://open.spotify.com/track/'+id})));
 data.songs.push(...[
  ['la-camisa-negra','La Camisa Negra','Juanes','3hTsTyv23ZQI2cX3kwUEbB'],
  ['y-como-es-el','¿Y Cómo Es Él?','José Luis Perales','7aSxNjoVoAwNL7HDAKwGtC'],
  ['la-cancion','LA CANCIÓN','J Balvin · Bad Bunny','0fea68AdmYNygeTGI4RC18'],
  ['callaita','Callaíta','Bad Bunny · Tainy','2TH65lNHgvLxCKXM3apjxI'],
  ['dile-que-tu-me-quieres','Dile Que Tú Me Quieres','Ozuna','20ZAJdsKB5IGbGj4ilRt2o'],
  ['adicto','Adicto','Tainy · Anuel AA · Ozuna','2q50wDLj6op6noAaRsjRMQ'],
  ['bipolar','Bipolar','Chris Jedi · Ozuna · Brytiago','07Kfdbf4MtfU8A2uGNszf8'],
  ['adios-amor','Adiós Amor','Christian Nodal','0YqWX5Vddrp61cCn91oFUW'],
  ['cuando-volveras','Cuándo Volverás','Aventura','2O9lZKmI3tKt3NgUERaGX3'],
  ['mi-corazoncito','Mi Corazoncito','Aventura','5I76YtdZkFQReVgKppRd78']
 ].map(([key,name,artist,id])=>({key,name,artist,url:'https://open.spotify.com/track/'+id})));
 data.albums=[
  ['kids-see-ghosts','KIDS SEE GHOSTS','Kanye West & Kid Cudi','1oK1GzEMNDjCt7EYYpomwc'],
  ['so-much-fun','So Much Fun','Young Thug','1bnHPO4dKK7IjvgrtVBcQh'],
  ['reading-too-late',"If You're Reading This It's Too Late",'Drake','5bqZfS9HUBTtxW0UiG05qC'],
  ['dark-lane','Dark Lane Demo Tapes','Drake','6OQ9gBfg5EXeNAEwGSs6jK'],
  ['friday-night-lights','Friday Night Lights','J. Cole','4ghGEhWzY5ffry2IqgrnRg'],
  ['dreamville','Revenge of the Dreamers III','Dreamville & J. Cole','2n3quCZ0anEa46j2IveacI'],
  ['life-of-pablo','The Life of Pablo','Kanye West','7gsWAHLeT0w7es6FofOXk1'],
  ['damn','DAMN.','Kendrick Lamar','4eLPsYPBmXABThSJ821sqY'],
  ['die-lit','Die Lit','Playboi Carti','7dAm8ShwJLFm9SaJ6Yc58O'],
  ['her-loss','Her Loss','Drake & 21 Savage','5MS3MvWHJ3lOZPLiMxzOU6']
 ].map(([key,name,artist,id])=>({key,name,artist,url:'https://open.spotify.com/album/'+id}));
 data.shows.push({key:'phineas-ferb',name:'Phineas and Ferb',url:'https://www.tvmaze.com/shows/672/phineas-and-ferb'});
 data.shows.push({key:'peaky-blinders',name:'Peaky Blinders',url:'https://www.tvmaze.com/shows/269/peaky-blinders'},{key:'sopranos',name:'The Sopranos',url:'https://www.tvmaze.com/shows/527/the-sopranos'});
 data.movies=[
  ['pulp-fiction','Pulp Fiction','Pulp_Fiction'],
  ['kill-bill','Kill Bill: Vol. 1','Kill_Bill:_Volume_1'],
  ['kill-bill-2','Kill Bill: Vol. 2','Kill_Bill:_Volume_2'],
  ['django','Django Unchained','Django_Unchained'],
  ['scarface','Scarface','Scarface_(1983_film)'],
  ['the-odyssey','The Odyssey','The_Odyssey_(2026_film)'],
  ['spider-man','Spider-Man: Brand New Day','Spider-Man:_Brand_New_Day'],
  ['buddy','Buddy','Buddy_(2026_film)'],
  ['obsession','Obsession','Obsession_(2025_film)'],
  ['superbad','Superbad','Superbad'],
  ['project-x','Project X','Project_X_(2012_film)'],
  ['young-washington','Young Washington','Young_Washington']
 ].map(([key,name,page])=>({key,name,url:'https://en.wikipedia.org/wiki/'+page}));
 data.sports=[
  {key:'ufc',name:'UFC',label:['FIGHT NIGHT','NOCHE DE COMBATE'],url:'https://www.ufc.com/',art:'<path d="m30 8 22 12v24L30 56 8 44V20Z"/><path d="M20 22h20v20H20zM20 27h20M25 22v20M35 22v20"/>'},
  {key:'wwe',name:'WWE',label:['MAIN EVENT ENERGY','ENERGÍA DE EVENTO ESTELAR'],url:'https://www.wwe.com/',art:'<path d="m7 27 23-10 23 10-23 12ZM7 27v19l23 11 23-11V27M30 39v18M7 18v13m46-13v13M30 9v12M30 31v13M7 21l23-10 23 10M7 34l23 11 23-11"/>'},
  {key:'mlb',name:'MLB',label:['EXTRA INNINGS','ENTRADAS EXTRA'],url:'https://www.mlb.com/',art:'<circle cx="30" cy="30" r="24"/><path d="M16 10q22 20 0 40M44 10q-22 20 0 40M16 17l7-2M19 25l7-1M19 35l7 1M16 43l7 2M37 15l7 2M34 24l7 1M34 36l7-1M37 45l7-2"/>'},
  {key:'nba',name:'NBA',label:['COURTSIDE STATE OF MIND','MENTALIDAD DE PRIMERA FILA'],url:'https://www.nba.com/',art:'<circle cx="30" cy="30" r="24"/><path d="M6 30h48M30 6v48M13 13q34 8 34 34M13 47q8-34 34-34"/>'}
 ];
 const lineups={
  ufc:{logo:'ufc',portraits:[['justin-gaethje','Justin Gaethje'],['ilia-topuria','Ilia Topuria'],['waldo-cortes-acosta','Waldo Cortes-Acosta'],['payton-talbott','Payton Talbott'],['carlos-prates','Carlos Prates']]},
  wwe:{logo:'wwe',portraits:[['john-cena','John Cena'],['rey-mysterio','Rey Mysterio'],['undertaker','Undertaker'],['randy-orton','Randy Orton'],['triple-h','Triple H']]},
  mlb:{logo:'yankees',name:'Yankees',label:['MLB / NEW YORK','MLB / NUEVA YORK'],url:'https://www.mlb.com/yankees',portraits:[['rice','Ben Rice'],['lombard','George Lombard Jr.'],['judge','Aaron Judge'],['schlittler','Cam Schlittler'],['stanton','Giancarlo Stanton']]},
  nba:{logo:'knicks',name:'Knicks',label:['NBA / NEW YORK','NBA / NUEVA YORK'],url:'https://www.nba.com/knicks',portraits:[['kat','Karl-Anthony Towns'],['brunson','Jalen Brunson'],['anunoby','OG Anunoby'],['hart','Josh Hart'],['bridges','Mikal Bridges']]}
 };
 data.sports.forEach(sport=>{Object.assign(sport,lineups[sport.key]);sport.favorites=sport.portraits.map(([,name])=>name).join(' \u00b7 ');});
 const opener=document.querySelector('.top-picks-launch');
 const dialog=document.createElement('dialog');dialog.id='lp-top-picks';dialog.className='top-picks-dialog';dialog.setAttribute('aria-labelledby','top-picks-title');document.body.append(dialog);
 const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let filter='all',spotifyAPI=null,controller=null,radioGeneration=0,lastSong=null;
 const shufflePool=data.songs.filter(song=>song.url.includes('/track/'));
 let queue=[];
 function nextSong(){
  if(!queue.length){queue=[...shufflePool];for(let i=queue.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[queue[i],queue[j]]=[queue[j],queue[i]];}if(queue.length>1&&queue[queue.length-1]===lastSong)[queue[0],queue[queue.length-1]]=[queue[queue.length-1],queue[0]];}
  return lastSong=queue.pop();
 }
 function stopRadio(){radioGeneration++;controller?.destroy();controller=null;dialog.querySelector('#picks-spotify')?.replaceChildren();}
 function shuffle(){
  stopRadio();const generation=radioGeneration,song=nextSong(),id=song.url.split('/').pop();
  const host=dialog.querySelector('#picks-spotify');host.replaceChildren();
  const mount=document.createElement('div');host.append(mount);
  // A usable embed is present even if the controller script is blocked.
  mount.innerHTML='<iframe title="Spotify: '+esc(song.name)+'" src="https://open.spotify.com/embed/track/'+id+'?theme=0" width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>';
  const start=()=>{if(generation!==radioGeneration||!dialog.open)return;spotifyAPI.createController(mount,{uri:'spotify:track:'+id,width:'100%',height:152},player=>{if(generation!==radioGeneration||!dialog.open){player.destroy();return;}controller=player;player.addListener('ready',()=>{if(dialog.open&&generation===radioGeneration)player.play();});});};
  if(spotifyAPI)start();else{pendingRadio=start;if(!document.getElementById('picks-spotify-api')){const script=document.createElement('script');script.id='picks-spotify-api';script.src='https://open.spotify.com/embed/iframe-api/v1';script.async=true;script.onerror=()=>script.remove();document.head.append(script);}}
 }
 let pendingRadio=null;
 window.onSpotifyIframeApiReady=api=>{spotifyAPI=api;pendingRadio?.();pendingRadio=null;};
 const t=(en,es)=>document.documentElement.lang==='es'?es:en;
 const photo=(key,name,cls='')=>`<img class="${cls}" src="assets/top-picks/${key}.jpg" alt="${esc(name)}" loading="lazy" decoding="async">`;
 const crown=`<svg viewBox="0 0 80 64" aria-hidden="true"><path d="m12 21 15 12L40 13l13 20 15-12-7 29H19Z"/><path d="M20 56h40M25 45h30"/><circle cx="12" cy="17" r="3"/><circle cx="40" cy="9" r="3"/><circle cx="68" cy="17" r="3"/></svg>`;
 const hallArt={restaurants:'<circle cx="50" cy="48" r="24"/><circle cx="50" cy="48" r="17"/><path d="M14 22v22m-5-22v14q5 8 10 0V22M14 43v33m69-54q-10 8-8 28h8m0-28v54"/>',hotels:'<path d="M23 78V25l27-11 27 11v53M18 78h64M41 78V56q9-13 18 0v22M32 32h5m26 0h5M32 43h5m26 0h5M48 28h4m-4 11h4"/><path d="m46 8 4-5 4 5"/>',excursions:'<path d="m10 70 27-43 18 28 13-18 23 33ZM28 42l9-15 11 17M54 80q-18-9-2-17t-8-15"/><circle cx="72" cy="20" r="8"/><path d="M72 6V2m14 18h5M82 9l4-4"/>'};
 const hallEmblem=key=>`<div class="hall-emblem" aria-hidden="true"><svg viewBox="0 0 100 96"><path class="hall-laurel" d="M16 86Q-6 61 9 33M84 86q22-25 7-53M11 70 3 65m8 4 5-9M8 55 1 48m7 8 7-7m74 21 8-5m-8 4-5-9m8-5 7-7m-7 8-7-7"/>${hallArt[key]}</svg><span>L&amp;P / HONORS</span></div>`;
 function content(){
  const songs=`<section class="picks-section picks-songs"><header><h3>${t('The road-trip soundtrack','La banda sonora del viaje')}</h3></header><div class="picks-track-list">${data.songs.map((song,i)=>`<a class="picks-track" href="${song.url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(song.name+' — '+t('Listen on Spotify','Escuchar en Spotify'))}"><span class="picks-track-number">${String(i+1).padStart(2,'0')}</span>${photo(song.art||song.key,song.name+' / '+song.artist)}<span><strong>${esc(song.name)}</strong><small>${esc(song.artist)}</small></span><span class="picks-play" aria-hidden="true">↗</span></a>`).join('')}</div><p class="picks-small">${t('Listen on Spotify ↗','Escuchar en Spotify ↗')}</p></section>`;
  const artists=`<section class="picks-section picks-artists"><header><h3>${t('Always in the queue','Siempre en la fila')}</h3></header><div class="picks-artist-grid">${data.artists.map((artist,i)=>`<a class="picks-artist" style="--pick-hue:${[315,30,145,265,5,205,60][i%7]}" href="${artist.url}" target="_blank" rel="noopener noreferrer">${photo(artist.key,artist.name)}<strong>${esc(artist.name)}</strong><small>Spotify ↗</small></a>`).join('')}</div></section>`;
  const shows=`<section class="picks-section picks-shows"><header><h3>${t('Comfort shows. Cero shame.','Series de confort. Zero shame.')}</h3></header><div class="picks-show-grid">${data.shows.map((show,i)=>`<a class="picks-show" href="${show.url}" target="_blank" rel="noopener noreferrer">${photo(show.key,show.name)}<span><small>${String(i+1).padStart(2,'0')} / ${t('OUR FAVORITES','FAVORITAS')}</small><strong>${esc(show.name)}</strong></span></a>`).join('')}</div><small class="picks-small">${t('Show details & artwork: TVmaze ↗','Detalles e imágenes de las series: TVmaze ↗')}</small></section>`;
  const albums=`<section class="picks-section"><header><h3>${t('Albums & mixtapes','Discos y mixtapes')}</h3></header><div class="picks-album-grid">${data.albums.map(album=>`<a class="picks-album" href="${album.url}" target="_blank" rel="noopener noreferrer">${photo(album.key,album.name+' / '+album.artist)}<span><strong>${esc(album.name)}</strong><small>${esc(album.artist)}</small><small>${t('Listen on Spotify','Escuchar en Spotify')} &nearr;</small></span></a>`).join('')}</div></section>`;
  const movies=`<section class="picks-section picks-movies"><header><h3>${t('One more movie. Then we pack.','Una peli más. Y hacemos las maletas.')}</h3></header><div class="picks-movie-grid">${data.movies.map((movie,i)=>`<a class="picks-movie" href="${movie.url}" target="_blank" rel="noopener noreferrer"><div class="picks-movie-poster">${photo(movie.key,movie.name)}<span class="picks-movie-reel" aria-hidden="true">${String(i+1).padStart(2,'0')} / L&amp;P CINEMA</span></div><span class="picks-movie-caption"><strong>${esc(movie.name)}</strong><span aria-hidden="true">&nearr;</span></span></a>`).join('')}</div></section>`;
  const sports=`<section class="picks-section picks-sports"><header><h3>${t('Different time zone. Same team.','Otra zona horaria. El mismo equipo.')}</h3></header><div class="picks-sports-grid">${data.sports.map(sport=>`<a class="picks-sport picks-sport-${sport.key}" href="${sport.url}" target="_blank" rel="noopener noreferrer"><img class="sport-logo-backdrop" src="assets/top-picks/${sport.logo}-logo.svg" alt="" aria-hidden="true" loading="lazy"><div class="sport-portraits">${sport.portraits.map(([key,name])=>`<span class="sport-portrait" title="${esc(name)}"><img src="assets/top-picks/${['triple-h','rice','lombard','judge','chisholm','stanton'].includes(key)?key+'-brown.jpg':sport.key==='nba'?key+'-clear.png':key+'.png'}" alt="${esc(name)}" loading="lazy" decoding="async" width="100" height="100"></span>`).join('')}</div><span class="sport-title"><small>${t(...sport.label)}</small><strong>${sport.name}</strong><span class="sport-favorites">${sport.favorites}</span></span><b aria-hidden="true">&nearr;</b></a>`).join('')}</div></section>`;
  const ceremony=`<div class="hall-ceremony"><div class="hall-crest" aria-hidden="true">${crown}<span>L&amp;P</span></div><span class="hall-overline">${t('THE HIGHEST HONOR WE GIVE A PLACE','NUESTRO MAYOR HONOR PARA UN LUGAR')}</span><h3 id="hall-title" tabindex="-1">Hall of Lost<span>.</span></h3><p class="hall-vow">${t('Some places earn a pin.<br>A rare few earn a place here.','Algunos lugares merecen un pin.<br>Muy pocos merecen estar aquí.')}</p><div class="hall-rule" aria-hidden="true">✦</div><p class="hall-dedication">${t('For the tables that brought us together. The stays that felt like home. The adventures that changed the way we see the world.','Por las mesas que nos unieron. Las estancias que fueron hogar. Las aventuras que cambiaron nuestra forma de ver el mundo.')}</p><span class="hall-signature">${t('Chosen personally. Remembered always.','Elegidos personalmente. Recordados siempre.')}<b>John &amp; Mateo</b></span></div>`;
  const travel=`<section class="picks-section hall-of-lost" id="hall-of-lost"><button type="button" class="hall-back" data-picks-filter="all">← ${t('Back to Top Picks','Volver a Top Picks')}</button>${ceremony}<header class="hall-gallery-heading"><span>${t('THREE DISTINCTIONS. ONE STANDARD.','TRES DISTINCIONES. UN MISMO ESTÁNDAR.')}</span><nav class="hall-categories" aria-label="${t('Travel favorites','Favoritos de viaje')}">${[['restaurants',t('Restaurants','Restaurantes')],['hotels',t('Hotels','Hoteles')],['excursions',t('Excursions','Excursiones')]].map(([key,label])=>`<button type="button" data-picks-filter="${key}" aria-pressed="${filter===key}">${label}</button>`).join('')}</nav><p>${t('A place in our story. An honor earned in person.','Un lugar en nuestra historia. Un honor ganado en persona.')}</p></header><div class="picks-travel-grid">${[['restaurants',t('Restaurants','Restaurantes'),t('A table we’d cross borders for.','Una mesa por la que cruzaríamos fronteras.')],['hotels',t('Hotels','Hoteles'),t('Checked in. Never quite checked out.','Hicimos check-in. El corazón se quedó.')],['excursions',t('Excursions','Excursiones'),t('The detour that became the story.','El desvío que se convirtió en historia.')]].filter(([key])=>filter==='all'||filter==='hall'||filter===key).map(([key,title,copy])=>`<article class="picks-travel-card hall-${key}" id="hall-${key}">${hallEmblem(key)}<small>${key==='restaurants'?t('THE TABLE','LA MESA'):key==='hotels'?t('THE STAY','LA ESTANCIA'):t('THE ADVENTURE','LA AVENTURA')}</small><h4>${title}</h4><p>${copy}</p><div class="hall-induction"><span>${t('THE FIRST HONORS AWAIT','LOS PRIMEROS HONORES ESPERAN')}</span><p>${t('The inaugural selection will be revealed after our journey. Every name will have a story.','La selección inaugural llegará después de nuestro viaje. Cada nombre tendrá una historia.')}</p></div></article>`).join('')}</div></section>`;
  return (filter==='all'||filter==='songs'?songs:'')+(filter==='all'||filter==='artists'?artists:'')+(filter==='all'||filter==='albums'?albums:'')+(filter==='all'||filter==='shows'?shows:'')+(filter==='all'||filter==='movies'?movies:'')+(filter==='all'||filter==='sports'?sports:'')+(['all','hall','restaurants','hotels','excursions'].includes(filter)?travel:'');
 }
 function setHallMode(){const active=['hall','restaurants','hotels','excursions'].includes(filter);dialog.setAttribute('data-hall-active',String(active));dialog.setAttribute('aria-labelledby',active?'hall-title':'top-picks-title');}
 function render(){
  setHallMode();
  opener.setAttribute('aria-label',t('Open Lost & Perdido’s Top Picks','Abrir los Top Picks de Lost & Perdido'));
  dialog.innerHTML=`<div class="picks-topbar"><span>LOST &amp; PERDIDO / PERSONAL ROTATION</span><button type="button" class="picks-close" aria-label="${t('Close Top Picks','Cerrar Top Picks')}">×</button></div><header class="picks-hero"><div class="picks-cover" aria-hidden="true">${['ozuna','bad-bunny','fran-aliss','feel-trip'].map(key=>photo(key,'')).join('')}<span>LOST &amp;<br>PERDIDO’S<br>TOP PICKS ✦</span></div><div><p class="picks-eyebrow">${t('CURATED BY JOHN & MATEO','ELEGIDO POR JOHN Y MATEO')}</p><h2 id="top-picks-title"><span class="picks-full-brand">Lost &amp; Perdido’s</span><br><em>Top Picks.</em></h2><p>${t('Good music. Familiar faces. Un poquito de todo.','Buena música. Caras conocidas. A little bit of everything.')}</p><span class="picks-count">${data.songs.length} ${t('songs','canciones')} · ${data.artists.length} ${t('artists','artistas')} · ${data.albums.length} ${t('albums','discos')}</span></div></header><button type="button" class="hall-entry" data-picks-filter="hall"><i class="hall-entry-crown">${crown}</i><span><small>${t('THE LOST & PERDIDO HONORS','LOS HONORES DE LOST & PERDIDO')}</small><strong>Hall of Lost.</strong><span>${t('Restaurants · Hotels · Excursions','Restaurantes · Hoteles · Excursiones')}</span></span><b class="hall-enter-label">${crown}${t('Enter the Hall','Entra al salón')} <span aria-hidden="true">↗</span></b></button><section class="picks-radio" aria-label="Spotify shuffle"><div id="picks-spotify"></div><div class="picks-radio-controls"><button type="button" data-shuffle><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h2c5 0 9 12 14 12h2M17 14l4 4-4 4M3 18h2c2 0 4-2 5-4m4-4c2-3 3-4 5-4h2M17 2l4 4-4 4"/></svg>${t('Shuffle another','Otra al azar')}</button><span class="picks-radio-status">${t('Tap play in Spotify if the music hasn’t started.','Pulsa reproducir en Spotify si no comienza la música.')}</span></div></section><nav class="picks-filters" aria-label="${t('Browse our picks','Explora nuestros favoritos')}">${[['all',t('Everything','Todo')],['songs',t('Songs','Canciones')],['artists',t('Artists','Artistas')],['albums',t('Albums','Álbumes')],['shows',t('TV shows','Series')],['movies',t('Movies','Películas')],['sports',t('Sports','Deportes')],['hall','Hall of Lost']].map(([key,label])=>`<button type="button" data-picks-filter="${key}" aria-pressed="${filter===key}">${label}</button>`).join('')}</nav><div class="picks-content">${content()}</div><footer class="picks-footer">LOST &amp; PERDIDO · ${t('A little lost. Great taste.','Un poco perdidos. Mucho gusto.')}</footer>`;
 }
 dialog.addEventListener('click',event=>{
  if(event.target.closest('[data-shuffle]')){shuffle();return;}
  if(event.target.closest('.picks-close')){dialog.close();return;}
  const choice=event.target.closest('[data-picks-filter]');if(!choice)return;
  filter=choice.dataset.picksFilter;
  setHallMode();
  dialog.querySelectorAll('[data-picks-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button===choice)));
  dialog.querySelector('.picks-content').innerHTML=content();
  if(!choice.isConnected)dialog.querySelector('.hall-categories [data-picks-filter="'+filter+'"]')?.focus({preventScroll:true});
  if(['hall','restaurants','hotels','excursions'].includes(filter)){dialog.scrollTop=0;if(filter==='hall')dialog.querySelector('#hall-title')?.focus({preventScroll:true});}else{dialog.scrollTop=0;dialog.querySelector('.hall-entry')?.focus({preventScroll:true});}
 });
 opener.addEventListener('click',()=>{filter='all';render();dialog.showModal();shuffle();dialog.scrollTop=0;dialog.querySelector('.picks-close').focus();});
 dialog.addEventListener('close',()=>{stopRadio();opener.focus({preventScroll:true});});
 document.addEventListener('lp:languagechange',()=>{if(dialog.open){stopRadio();render();shuffle();}else opener.setAttribute('aria-label',t('Open Lost & Perdido’s Top Picks','Abrir los Top Picks de Lost & Perdido'));});
})();

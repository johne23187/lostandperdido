/* Uncommissioned previews use personal photographs, never fabricated endorsements. */
(() => {
 const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const stingrayBadge = language => '<a class="stingray-badge" href="https://stingraycityantigua.com/" target="_blank" rel="noopener noreferrer" aria-label="'+(language==='es'?'Visita Stingray City (sitio externo)':'Visit Stingray City (external website)')+'"><img src="assets/stingray-city-logo.png" alt="Stingray City Antigua" width="90" height="53" loading="lazy"></a>';
 function render(language,kind,choice){
  const es=language==='es',t=(en,translation)=>es?translation:en,partnership=Number(kind)===2;
  choice=choice||(partnership?'dji':'instagram');
  const options=partnership?[['dji','DJI'],['airalo','Airalo'],['patagonia','Patagonia'],['samsonite','Samsonite'],['safetywing','SafetyWing']]:[['instagram','Instagram'],['youtube','YouTube'],['tiktok','TikTok']];
  const brandLinks={dji:'https://www.dji.com/',airalo:'https://www.airalo.com/',patagonia:'https://www.patagonia.com/',samsonite:'https://www.samsonite.com/',safetywing:'https://safetywing.com/'};
  const brand=options.find(item=>item[0]===choice)?.[1]||'DJI';
  const caption=partnership?(choice==='samsonite'?t('Pack a little. Bring back a lot.','Lleva poco. Vuelve con mucho.'):choice==='safetywing'?t('A little lost. A little more prepared.','Un poco perdidos. Un poco más preparados.'):choice==='airalo'?t('New place. Same connection.','Nuevo lugar. La misma conexión.'):choice==='patagonia'?t('Pack less. Go further.','Lleva menos. Llega más lejos.'):t('Keep the moment. Share the journey.','Guarda el momento. Comparte el viaje.')):t('A little lost. A lot to discover.','Un poco perdidos. Mucho por descubrir.');
  const photo=partnership?(choice==='samsonite'?'assets/travel-previews/2f7373996064-cover.jpg':choice==='safetywing'?'assets/partner-safetywing-journey.jpg':choice==='airalo'?'assets/travel-previews/707fe00aa123-cover.jpg':choice==='patagonia'?'assets/mateo-meadow-composite.png':'assets/travel-previews/ad79ef0f076d-cover.jpg'):'assets/travel-previews/6491edeb4000-cover.jpg';
  const alt=partnership?(choice==='samsonite'?t('John exploring a colorful cobblestone street in Colombia with his backpack','John explorando una calle empedrada y colorida de Colombia con su mochila'):choice==='safetywing'?t('John with his backpack beneath Yosemite mountains','John con su mochila al pie de las montañas de Yosemite'):choice==='airalo'?t('John exploring London beside Big Ben, from our travels','John explorando Londres junto al Big Ben, de nuestros viajes'):choice==='patagonia'?t('Creative composite of Mateo facing a mountain meadow with his arms outstretched','Composición creativa de Mateo de espaldas en una pradera de montaña con los brazos abiertos'):t('John in Milan, personal travel photo','John en Milán, foto personal')):t('John with a stingray in Antigua','John con una mantarraya en Antigua');
  const account='<div class="studio-account"><img src="assets/2EA6D4BC-C72D-4AC1-BC61-01DF255EEA1E_1_105_c.jpeg" alt="" width="30" height="30"><span><b>lostandperdido</b><small>'+ (partnership?'L&P × '+brand+' · '+t('Concept','Concepto'):'Stingray City Antigua · '+t('Concept','Concepto'))+'</small></span></div>';
  const disclosure=partnership?t('Uncommissioned concept · no existing partnership or endorsement','Concepto no contratado · sin alianza ni respaldo de la marca'):t('Personal excursion · illustrative collaboration concept, not a sponsored post','Excursión personal · concepto ilustrativo de colaboración, no publicación patrocinada');
    const product=choice==='samsonite'?'<img class="studio-product studio-luggage" src="assets/luggage-preview.svg" alt="'+t('Suitcase illustration for the Samsonite concept','Ilustración de maleta para el concepto de Samsonite')+'">':choice==='safetywing'?'<div class="studio-insurance-note"><svg viewBox="0 0 32 36" aria-hidden="true"><path d="M16 3 29 8v11q-2 10-13 15Q5 29 3 19V8Z"/><path d="m9 18 5 5 10-12"/></svg><span>'+t('TRAVEL INSURANCE','SEGURO DE VIAJE')+'</span></div>':choice==='dji'?'<img class="studio-product" src="assets/drone-preview.svg" alt="Drone illustration for the DJI concept">':choice==='airalo'?'<div class="studio-esim-card"><span>eSIM</span><b>'+t('LONDON · ONLINE','LONDRES · EN LÍNEA')+'</b><small>'+t('Stay connected.','Sigue conectado.')+'</small><span aria-hidden="true">▂ ▄ ▆ █</span></div>':'';
    const patagoniaFigure='';
    const visual='<div class="studio-post-visual"><img class="studio-scene" src="'+photo+'" alt="'+esc(alt)+'" loading="lazy">'+(partnership?'<div class="studio-brand-lockup"><a href="'+brandLinks[choice]+'" target="_blank" rel="noopener noreferrer">'+brand+'</a><span>× LOST &amp; PERDIDO</span></div>'+product+patagoniaFigure+'<p class="studio-post-headline">'+esc(caption)+'</p>':stingrayBadge(language))+(choice==='youtube'?'<div class="studio-video-controls" aria-hidden="true"><span>▶</span><span>0:00 / 8:24</span><span>⚙ ⛶</span><i></i></div>':'')+(choice==='tiktok'?'<div class="studio-tiktok-tools" aria-hidden="true"><span>◉</span><span>♥</span><span>●</span><span>↗</span></div><div class="studio-tiktok-overlay"><b>@lostandperdido</b><p>'+esc(caption)+'</p><small>♫ '+t('Original sound · Lost & Perdido','Sonido original · Lost & Perdido')+'</small></div>':'')+'</div>';
  const youtube=choice==='youtube',tiktok=choice==='tiktok';
  const platformHeader=tiktok?'<div class="studio-tiktok-tabs" aria-hidden="true">'+t('Following','Siguiendo')+' <b>'+t('For You','Para ti')+'</b> ⌕</div>':'<div class="studio-platform-bar"><strong>'+(youtube?'<span class="youtube-mark">▶</span> YouTube':'Instagram')+'</strong><span aria-hidden="true">'+(youtube?'⌕ ⋮':'＋ ♡')+'</span></div>';
  const body=tiktok?visual:youtube?visual+'<div class="studio-youtube-title"><b>'+t('Stingray City, Antigua | Getting lost with us','Stingray City, Antigua | Perdiéndonos juntos')+'</b><small>'+t('Episode preview · Personal excursion','Vista previa · Excursión personal')+'</small></div>'+account+'<div class="studio-youtube-actions" aria-hidden="true">♡ '+t('Like','Me gusta')+'　↗ '+t('Share','Compartir')+'　⊕</div>':account+visual+'<div class="studio-post-actions" aria-hidden="true">♡ ◯ ⤴ <span>♧</span></div>';
  return '<div class="modern-phone-stage" data-studio-kind="'+kind+'" data-studio-language="'+language+'"><div class="studio-choice-row" role="group" aria-label="'+t('Choose a preview','Elige una vista previa')+'">'+options.map(([id,label])=>'<button type="button" data-phone-choice="'+id+'" aria-pressed="'+(choice===id)+'">'+label+'</button>').join('')+'</div><div class="studio-phone studio-platform-'+choice+'"><div class="studio-phone-status" aria-hidden="true"><span>9:41</span><i></i><span>▮▮▮ ▰</span></div>'+platformHeader+body+(!tiktok?'<div class="studio-caption">'+(!youtube?'<strong>lostandperdido</strong> '+esc(caption):'')+'<small>'+disclosure+'</small></div>':'')+'<div class="studio-phone-nav" aria-hidden="true">'+(tiktok?'⌂　♧　⊞　▣　♙':youtube?'⌂　▷　⊕　▣　◉':'⌂　⌕　⊞　▷　◉')+'</div></div>'+(tiktok?'<small class="studio-outside-disclosure">'+disclosure+'</small>':'')+'<p class="studio-preview-note">'+(partnership?t('Imagine your brand in the next chapter.','Imagina tu marca en el próximo capítulo.'):t('A story shaped for the way people watch.','Una historia pensada para cómo vemos el mundo.'))+'</p></div>';
 }
 window.LPStudio={render,stingrayBadge};
 document.addEventListener('click',event=>{const button=event.target.closest('[data-phone-choice]');if(!button)return;const stage=button.closest('.modern-phone-stage'),holder=document.createElement('div');holder.innerHTML=render(stage.dataset.studioLanguage,stage.dataset.studioKind,button.dataset.phoneChoice);const replacement=holder.firstElementChild;stage.replaceWith(replacement);replacement.querySelector('[data-phone-choice="'+button.dataset.phoneChoice+'"]').focus({preventScroll:true});});
})();
(() => {
  const prompts=[['Ask a local where they love to eat.','Pregúntale a alguien de aquí dónde le encanta comer.'],['Learn one phrase. Start one conversation.','Aprende una frase. Empieza una conversación.'],['Take the scenic way. Leave room for surprise.','Elige el camino bonito. Deja espacio para la sorpresa.'],["North? We were following the smell of coffee.", "¿El norte? Seguíamos el olor a café."],["Recalculating… our entire itinerary.", "Recalculando… todo el itinerario."],["Wrong turn. Great story.", "Giro equivocado. Buena historia."],["¿Por aquí? Famous last words.", "¿Por aquí? Así empiezan nuestras historias."],["Find a bakery. Call it a landmark.", "Busca una panadería. Ya tienes un punto de referencia."],["Two languages. Still lost.", "Dos idiomas. Igual de perdidos."],["Less scrolling. More strolling.", "Menos pantalla. Más caminata."],["Your next friend might have the directions.", "Tu próximo amigo quizá sepa el camino."],["The map says left. The adventure says vamos.", "El mapa dice izquierda. La aventura dice vamos."],["Take a side street. Bring your curiosity.", "Toma una callecita. Lleva tu curiosidad."],["We packed light. Except for the questions.", "Viajamos ligeros. Menos las preguntas."],["A little lost. Right where we belong.", "Un poco perdidos. Justo donde queremos estar."],["Follow the music for a block.", "Sigue la música una cuadra."],["Today’s destination: a good conversation.", "Destino de hoy: una buena conversación."],["One new word is a pretty good souvenir.", "Una palabra nueva es un buen recuerdo."],["If all else fails, stop for empanadas.", "Si nada funciona, para por unas empanadas."],["Leave a little room for allá.", "Deja un poquito de espacio para allá."],["The best route might come from someone’s abuela.", "La mejor ruta quizá te la cuente una abuela."]];
  prompts.push(...[["Vamos, but first: cafecito.", "Vamos, but first: cafecito."], ["Plot twist: the detour has ocean views.", "Plot twist: el desvío tiene vista al mar."], ["No signal. Sí hay aventura.", "No signal. Sí hay aventura."], ["Ask for directions. Stay for the story.", "Pide indicaciones. Quédate por la historia."], ["Today’s forecast: 90% chance of getting lost.", "Pronóstico: 90% de probabilidad de perdernos."], ["Un pasito más. The view is coming.", "Un pasito más. The view is coming."], ["Take the bus whose name you just learned.", "Súbete al bus cuyo nombre acabas de aprender."], ["Your accent is a souvenir in progress.", "Tu acento es un recuerdo en construcción."], ["The itinerary left the group chat.", "El itinerario salió del grupo."], ["Dale suave. We’re on local time.", "Dale suave. We’re on local time."], ["Find a plaza. Let the afternoon happen.", "Busca una plaza. Deja que pase la tarde."], ["Collect sunsets, not just boarding passes.", "Colecciona atardeceres, no solo pases de abordar."], ["¿Ya llegamos? Emotionally, sí.", "¿Ya llegamos? Emotionally, sí."], ["Try the fruit you can’t pronounce yet.", "Prueba la fruta que todavía no sabes pronunciar."], ["One backpack. Demasiadas historias.", "One backpack. Demasiadas historias."], ["Trade a perfect sentence for a real hello.", "Cambia una frase perfecta por un hola de verdad."], ["The scenic route has entered the chat.", "La ruta bonita entró al chat."], ["Permission to wander: granted. Vámonos.", "Permiso para explorar: concedido. Let’s go."], ["Save room for dessert and a wrong turn.", "Deja espacio para el postre y una vuelta equivocada."], ["If you hear a good song, follow the rhythm.", "Si escuchas una buena canción, sigue el ritmo."]]);
  let phraseBag=[],lastPhrase=-1;
  function nextCompassPhrase(){
    if(!phraseBag.length){
      phraseBag=prompts.map((_,index)=>index);
      for(let i=phraseBag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[phraseBag[i],phraseBag[j]]=[phraseBag[j],phraseBag[i]];}
      if(phraseBag[phraseBag.length-1]===lastPhrase)[phraseBag[0],phraseBag[phraseBag.length-1]]=[phraseBag[phraseBag.length-1],phraseBag[0]];
    }
    lastPhrase=phraseBag.pop();return lastPhrase;
  }
  const states=new WeakMap();
  function update(dock){
    const es=document.documentElement.lang==='es';
    dock.querySelector('button').setAttribute('aria-label',es?'Encuentra un poco de rumbo':'Find a little direction');
    const index=states.get(dock);
    if(index>=0)dock.querySelector('p').textContent=prompts[index][es?1:0];
  }
  function createDock(compact=false){
    const dock=document.createElement('div');
    dock.className='gps-compass-dock'+(compact?' section-compass-dock':'');
    dock.innerHTML="<p role=\"status\"></p><button type=\"button\" aria-label=\"Find a little direction\"><svg viewBox=\"0 0 80 80\" aria-hidden=\"true\"><circle cx=\"40\" cy=\"40\" r=\"36\"/><circle cx=\"40\" cy=\"40\" r=\"27\" stroke-dasharray=\"1 5\"/><text x=\"37\" y=\"13\">N</text><text x=\"67\" y=\"43\">E</text><text x=\"37\" y=\"74\">S</text><text x=\"7\" y=\"43\">W</text><g class=\"compass-needle\"><path d=\"m40 18-7 23 7-4 7 4Z\" fill=\"#b84435\" stroke=\"none\"/><path d=\"m40 62-7-23 7 4 7-4Z\" fill=\"#355d70\" stroke=\"none\"/></g><circle cx=\"40\" cy=\"40\" r=\"3\" fill=\"#e8d9b1\"/></svg></button>";
    states.set(dock,-1);
    dock.querySelector('button').addEventListener('click',()=>{states.set(dock,nextCompassPhrase());update(dock);});
    update(dock);return dock;
  }
  const screen=document.querySelector('.gps-expanded-screen');
  if(screen)screen.insertBefore(createDock(),screen.querySelector('.gps-map-status'));
  function mountCompasses(){
    document.querySelectorAll('dialog[open]').forEach(dialog=>{
      if(['gps-tracker','lp-top-picks'].includes(dialog.id)||dialog.querySelector('.section-compass-dock'))return;
      const dock=createDock(true);
      if(dialog.classList.contains('editorial-reader')){
        const leaf=dialog.querySelector('.passport-leaf:last-child');
        const target=leaf||dialog.querySelector('.feature-copy')||dialog.querySelector('.reader-paper');
        if(target)target.insertBefore(dock,target.querySelector('.leaf-number'));
      }else if(dialog.classList.contains('country-portfolio')){
        const target=dialog.querySelector('.portfolio-content');
        if(target)target.insertBefore(dock,target.querySelector('.portfolio-intro'));
      }else{
        const target=dialog.querySelector('.meeting-copy,.satellite-interior')||dialog;
        target.append(dock);
      }
    });
  }
  const observer=new MutationObserver(records=>{
    if(records.some(record=>record.type==='attributes'||[...record.addedNodes].some(node=>node.nodeType===1)))mountCompasses();
  });
  observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['open']});
  document.addEventListener('lp:languagechange',()=>document.querySelectorAll('.gps-compass-dock').forEach(update));
  mountCompasses();
})();

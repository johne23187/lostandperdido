(() => {
  const dialog=document.querySelector('.country-portfolio');
  const content=dialog.querySelector('.portfolio-content');
  const viewer=document.querySelector('.portfolio-lightbox');
  const media=viewer.querySelector('.lightbox-media');
  let entries=[], placeName='', current=0, opener, photoOpener;
  const url=path=>path.split('/').map(encodeURIComponent).join('/');
  const countryDescriptions={"USA": "From restless cities to wide-open landscapes, the USA holds countless versions of a journey. New York is where our shared story began.", "Bolivia": "High Andean landscapes, lively markets and deep-rooted traditions make Bolivia unmistakable. It is also where Mateo’s story begins.", "England": "Historic streets meet a lively contemporary culture in England. There is always another neighborhood, conversation or quiet corner to discover.", "Italy": "Italy brings centuries of art and architecture into everyday life. Its streets and tables invite you to slow down and look closer.", "Senegal": "On Africa’s Atlantic coast, Senegal brings music, coastal landscapes and vibrant city life together. Its energy gives this chapter a character all its own.", "Colombia": "Colombia stretches from Andean mountains to Caribbean shores. Colorful streets and distinct regional cultures make each stop feel different.", "Antigua": "Antigua pairs sheltered bays with a long maritime history. This island chapter follows the slower rhythm of the Caribbean.", "Dominican Republic": "Caribbean coastlines, mountain interiors and music-filled streets shape the Dominican Republic. It is a place with many stories beyond the beach.", "Canada": "Canada brings big-city neighborhoods and vast natural landscapes into the same journey. Its changing seasons offer a different view each time.", "Puerto Rico": "Puerto Rico combines historic streets, tropical forests and Caribbean coastlines. Music and food give its neighborhoods a rhythm of their own.", "Bahamas": "The Bahamas is a scattered world of islands, clear shallows and Atlantic horizons. Life here turns your attention toward the water.", "Chile": "Chile stretches between the Pacific and the Andes. Desert, vineyards and southern wilderness give its long landscape remarkable variety.", "Brasil": "Brasil brings together coastal cities, green landscapes and deeply varied regional cultures. Music and everyday street life make a vivid impression.", "Belarus": "Belarus pairs broad city avenues with forests and lakes. Its quieter landscapes offer another perspective on eastern Europe.", "Türkiye": "Türkiye connects layered histories with lively streets and striking landscapes. Its markets, coastlines and shared tables invite a closer look.", "Ireland": "Ireland’s green countryside and Atlantic coastline frame towns full of stories. City streets and rural roads offer two very different ways to explore."};
  function stopVideo(){media.querySelector('video')?.pause();}
  function display(){
    stopVideo();media.replaceChildren();
    const item=entries[current];
    const element=document.createElement(item.type==='video'?'video':'img');
    element.src=url(item.src);
    if(item.type==='video'){element.controls=true;element.playsInline=true;element.preload='metadata';}
    else {element.alt=placeName+' — travel photograph '+(current+1);element.decoding='async';}
    media.append(element);
    viewer.querySelector('.lightbox-count').textContent=placeName+' · '+(current+1)+' / '+entries.length;
  }
  function openPhoto(index,button){photoOpener=button;current=index;display();viewer.showModal();}
  window.openCountryPortfolio=place=>{
    opener=document.activeElement;placeName=place.name;
    entries=(window.travelPortfolios[place.name]||[]).slice().sort((a,b)=>(a.type==='video')-(b.type==='video'));
    content.replaceChildren();
    const hero=document.createElement('div');hero.className='portfolio-hero';
    if(entries.length){const cover=document.createElement('img');const curated=window.travelPortfolioCovers?.[place.name];cover.src=url(curated?.src||entries[0].preview||entries[0].src);if(curated?.position)cover.style.objectPosition=curated.position;cover.alt=place.name+' travel portfolio cover';hero.append(cover);}
    else hero.classList.add('portfolio-empty-hero');
    const heading=document.createElement('div');heading.className='portfolio-heading';
    const eyebrow=document.createElement('p');eyebrow.textContent='THE PERSONAL COLLECTION / '+place.travelers.map(t=>t==='john'?'JOHN':'MATEO').join(' & ');
    const title=document.createElement('h2');title.id='portfolio-title';title.textContent=place.name;
    const count=document.createElement('p');
    const photos=entries.filter(i=>i.type==='photo').length,videos=entries.length-photos;
    count.textContent=entries.length?photos+' photographs'+(videos?' · '+videos+' films':''):'A chapter waiting to be shared.';
    const summary=document.createElement('p');summary.className='portfolio-description';summary.textContent=countryDescriptions[place.name]||'A chapter in our shared travel footprint, collected one moment at a time.';heading.append(eyebrow,title,summary,count);hero.append(heading);content.append(hero);
    if(entries.length){
      const intro=document.createElement('div');intro.className='portfolio-intro';intro.innerHTML='<h3>Through our eyes.</h3><p>A collection of moments from the journey. Select a photograph to explore it in full.</p>';content.append(intro);
      const grid=document.createElement('div');grid.className='portfolio-grid';
      entries.forEach((item,index)=>{
        const button=document.createElement('button');button.type='button';button.className='portfolio-tile';button.setAttribute('aria-label',(item.type==='video'?'Watch film ':'View photograph ')+(index+1)+' from '+place.name);
        if(item.type==='photo'){
          const image=document.createElement('img');image.src=url(item.preview);image.alt=place.name+' — photograph '+(index+1);image.loading='lazy';image.decoding='async';button.append(image);
        }else{const label=document.createElement('div');label.className='portfolio-film';label.innerHTML='<span aria-hidden="true">▷</span><strong>From the journey</strong><small>PLAY FILM</small>';button.append(label);}
        const caption=document.createElement('span');caption.className='portfolio-tile-caption';caption.textContent=String(index+1).padStart(2,'0')+' / '+(item.type==='video'?'FILM':'VIEW PHOTO');button.append(caption);
        button.addEventListener('click',()=>openPhoto(index,button));grid.append(button);
      });content.append(grid);
    }else{const note=document.createElement('p');note.className='portfolio-empty';note.textContent='This place is part of our footprint. Photos will join this collection soon.';content.append(note);}
    dialog.showModal();dialog.scrollTop=0;
  };
  dialog.querySelector('.portfolio-close').addEventListener('click',()=>dialog.close());
  viewer.querySelector('.lightbox-close').addEventListener('click',()=>viewer.close());
  viewer.querySelector('.lightbox-prev').addEventListener('click',()=>{current=(current-1+entries.length)%entries.length;display();});
  viewer.querySelector('.lightbox-next').addEventListener('click',()=>{current=(current+1)%entries.length;display();});
  viewer.addEventListener('keydown',e=>{if(e.target.tagName==='VIDEO')return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();current=(current+(e.key==='ArrowRight'?1:-1)+entries.length)%entries.length;display();}});
  viewer.addEventListener('close',()=>{stopVideo();media.replaceChildren();photoOpener?.focus({preventScroll:true});});
  dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
  [dialog,viewer].forEach(d=>d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))d.close();}));
})();

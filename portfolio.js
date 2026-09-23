(() => {
  const dialog=document.querySelector('.country-portfolio');
  const content=dialog.querySelector('.portfolio-content');
  const viewer=document.querySelector('.portfolio-lightbox');
  const media=viewer.querySelector('.lightbox-media');
  let entries=[], placeName='', current=0, opener, photoOpener;
  const url=path=>path.split('/').map(encodeURIComponent).join('/');
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
    heading.append(eyebrow,title,count);hero.append(heading);content.append(hero);
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

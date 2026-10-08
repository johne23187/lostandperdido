/* Book headings keep their full accessible title while the visible copy types in. */
(() => {
 const selector='#how-we-met, #passport-reader, #partner-reader, #service-details';
 const active=new Map();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let audio,noise,lastTap=0;
 function unlock(){
  if(reduced.matches)return;
  try{
   if(!audio){
    const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
    audio=new Audio();noise=audio.createBuffer(1,Math.ceil(audio.sampleRate*.022),audio.sampleRate);
    const samples=noise.getChannelData(0);for(let i=0;i<samples.length;i++)samples[i]=(Math.random()*2-1)*Math.exp(-i/samples.length*7);
   }
   if(audio.state==='suspended')audio.resume().catch(()=>{});
  }catch{}
 }
 function tap(){
  if(!audio||audio.state!=='running'||document.hidden)return;
  const now=performance.now();if(now-lastTap<45)return;lastTap=now;
  const source=audio.createBufferSource(),gain=audio.createGain(),filter=audio.createBiquadFilter();
  source.buffer=noise;filter.type='highpass';filter.frequency.value=900;gain.gain.value=.045;
  source.connect(filter);filter.connect(gain);gain.connect(audio.destination);source.start();
  source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
 }
 document.addEventListener('click',event=>{if(event.target.closest('.passport-object,.how-we-met-link,.partner-cover,[data-service],#how-we-met,#passport-reader,#partner-reader,#service-details'))unlock();},true);
 function finish(heading,state){
  cancelAnimationFrame(state.frame);state.letters.forEach(letter=>letter.style.opacity='');
  state.source.removeAttribute('aria-hidden');
  if(heading.matches('h2')&&!reduced.matches&&state.letters.length){
   const end=state.letters[state.letters.length-1];
   if(!end.querySelector('.book-type-cursor')){
    const cursor=document.createElement('span');cursor.className='book-type-cursor';cursor.setAttribute('aria-hidden','true');end.append(cursor);
   }
  }
 }
 function restore(state){
  cancelAnimationFrame(state.frame);
  state.replacements?.forEach(({original,wrapper})=>{original.textContent=wrapper.textContent;wrapper.replaceWith(original);});
  state.replacements=[];state.letters=[];
 }
 function start(heading,dialog){
  let state=active.get(heading);
  if(state)restore(state);
  else{
   let source=heading.querySelector(':scope > .book-title-source');
   if(!source){source=document.createElement('span');source.className='book-title-source';while(heading.firstChild)source.append(heading.firstChild);heading.append(source);}
   state={source,dialog,letters:[],replacements:[]};active.set(heading,state);
  }
  const text=state.source.textContent.trim();heading.setAttribute('aria-label',text);heading.classList.add('book-typing-title');
  if(reduced.matches){finish(heading,state);return;}
  state.source.setAttribute('aria-hidden','true');
  const walker=document.createTreeWalker(state.source,NodeFilter.SHOW_TEXT),textNodes=[];let node;
  while((node=walker.nextNode()))if(!node.parentElement.closest('svg'))textNodes.push(node);
  const segmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter(document.documentElement.lang,{granularity:'grapheme'}):null;
  textNodes.forEach(original=>{
   const wrapper=document.createElement('span');wrapper.className='book-type-run';
   original.textContent.split(/(\s+)/u).forEach(word=>{
    if(!word)return;
    if(/^\s+$/u.test(word)){wrapper.append(document.createTextNode(word));return;}
    const group=document.createElement('span');group.className='book-type-word';
    const characters=segmenter?[...segmenter.segment(word)].map(item=>item.segment):Array.from(word);
    characters.forEach(character=>{const letter=document.createElement('span');letter.className='book-type-letter';letter.textContent=character;letter.style.opacity='0';group.append(letter);state.letters.push(letter);});wrapper.append(group);
   });
   original.replaceWith(wrapper);state.replacements.push({original,wrapper});
  });
  let index=0,next=performance.now()+180;
  function tick(now){
   if(!dialog.open||!heading.isConnected){stop(heading,state);return;}
   if(document.hidden){next=now+80;state.frame=requestAnimationFrame(tick);return;}
   if(now>=next){
    const letter=state.letters[index++];if(letter){letter.style.opacity='1';tap();next=now+(/[.!?]/.test(letter.textContent)?110:48);}
    if(index>=state.letters.length){finish(heading,state);return;}
   }
   state.frame=requestAnimationFrame(tick);
  }
  if(state.letters.length)state.frame=requestAnimationFrame(tick);else finish(heading,state);
 }
 function stop(heading,state){restore(state);state.source.removeAttribute('aria-hidden');heading.classList.remove('book-typing-title');active.delete(heading);}
 function scan(){
  for(const [heading,state] of active)if(!state.dialog.open||!heading.isConnected)stop(heading,state);
  document.querySelectorAll(selector).forEach(dialog=>{
   if(!dialog.open)return;
   dialog.querySelectorAll('h2,h3').forEach(heading=>{if(!active.has(heading))start(heading,dialog);});
  });
 }
 // Ignore the character-by-character text updates; only page replacements/opening start a title.
 new MutationObserver(records=>{if(records.some(record=>record.type==='attributes'||[...record.addedNodes,...record.removedNodes].some(node=>node.nodeType===1&&!node.matches?.('.book-title-source,.book-type-run,.book-type-word,.book-type-letter,.book-type-cursor'))))scan();}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['open']});
 document.addEventListener('lp:languagechange',()=>{for(const [heading,state] of active)if(state.dialog.open)start(heading,state.dialog);});
 reduced.addEventListener('change',()=>{for(const [heading,state] of active)start(heading,state.dialog);});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&audio?.state==='running')audio.suspend().catch(()=>{});else if(audio&&[...active.values()].some(state=>state.dialog.open)&&!reduced.matches)audio.resume().catch(()=>{});});
 scan();
})();

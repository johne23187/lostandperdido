/* Book headings keep their full accessible title while the visible copy types in. */
(() => {
 const selector='#how-we-met, #passport-reader';
 const active=new Map();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let audio,noise;
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
  const source=audio.createBufferSource(),gain=audio.createGain(),filter=audio.createBiquadFilter();
  source.buffer=noise;filter.type='highpass';filter.frequency.value=900;gain.gain.value=.045;
  source.connect(filter);filter.connect(gain);gain.connect(audio.destination);source.start();
  source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
 }
 document.addEventListener('click',event=>{if(event.target.closest('.passport-object,.how-we-met-link,#how-we-met,#passport-reader'))unlock();},true);
 function finish(heading,state){
  clearTimeout(state.timer);state.visual?.remove();state.source.style.opacity='';
  state.source.removeAttribute('aria-hidden');
  if(!state.cursor){state.cursor=document.createElement('span');state.cursor.className='book-type-cursor';state.cursor.setAttribute('aria-hidden','true');heading.append(state.cursor);}
 }
 function start(heading,dialog){
  let state=active.get(heading);
  if(state){clearTimeout(state.timer);state.visual?.remove();state.cursor?.remove();state.cursor=null;}
  else{
   let source=heading.querySelector(':scope > .book-title-source');
   if(!source){source=document.createElement('span');source.className='book-title-source';while(heading.firstChild)source.append(heading.firstChild);heading.append(source);}
   state={source,dialog};active.set(heading,state);
  }
  const text=state.source.textContent.trim();heading.setAttribute('aria-label',text);heading.classList.add('book-typing-title');
  if(reduced.matches){finish(heading,state);return;}
  state.source.style.opacity='0';state.source.setAttribute('aria-hidden','true');
  const visual=document.createElement('span');visual.className='book-title-visual';visual.dataset.editorial='true';visual.setAttribute('aria-hidden','true');
  const copy=document.createTextNode(''),cursor=document.createElement('span');cursor.className='book-type-cursor';visual.append(copy,cursor);heading.append(visual);state.visual=visual;
  const letters=typeof Intl.Segmenter==='function'?[...new Intl.Segmenter(document.documentElement.lang,{granularity:'grapheme'}).segment(text)].map(item=>item.segment):Array.from(text);
  let index=0;
  function tick(){
   if(!dialog.open||!heading.isConnected){stop(heading,state);return;}
   if(document.hidden){state.timer=setTimeout(tick,150);return;}
   copy.textContent+=letters[index];if(letters[index]?.trim())tap();index++;
   if(index>=letters.length){finish(heading,state);return;}
   state.timer=setTimeout(tick,/[.!?]/.test(letters[index-1])?180:55+Math.random()*35);
  }
  if(letters.length)state.timer=setTimeout(tick,160);else finish(heading,state);
 }
 function stop(heading,state){clearTimeout(state.timer);state.visual?.remove();state.cursor?.remove();state.source.style.opacity='';state.source.removeAttribute('aria-hidden');heading.classList.remove('book-typing-title');active.delete(heading);}
 function scan(){
  for(const [heading,state] of active)if(!state.dialog.open||!heading.isConnected)stop(heading,state);
  document.querySelectorAll(selector).forEach(dialog=>{
   if(!dialog.open)return;
   dialog.querySelectorAll('h2,h3').forEach(heading=>{if(!active.has(heading))start(heading,dialog);});
  });
 }
 // Ignore the character-by-character text updates; only page replacements/opening start a title.
 new MutationObserver(records=>{if(records.some(record=>record.type==='attributes'||[...record.addedNodes,...record.removedNodes].some(node=>node.nodeType===1&&!node.matches?.('.book-title-source,.book-title-visual,.book-type-cursor'))))scan();}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['open']});
 document.addEventListener('lp:languagechange',()=>{for(const [heading,state] of active)if(state.dialog.open)start(heading,state.dialog);});
 reduced.addEventListener('change',()=>{for(const [heading,state] of active)start(heading,state.dialog);});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&audio?.state==='running')audio.suspend().catch(()=>{});else if(audio&&[...active.values()].some(state=>state.dialog.open)&&!reduced.matches)audio.resume().catch(()=>{});});
 scan();
})();

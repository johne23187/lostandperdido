/* Shared photographic heads on the existing illustrated bodies and poses. */
(() => {
 const ns='http://www.w3.org/2000/svg';
 const src=person=>'assets/'+(person==='mateo'?'mateo-yankees-head':'john-yankees-smiling')+'-192.webp';
 function portrait(person,x,y,width,height){const image=document.createElementNS(ns,'image');for(const [key,value] of Object.entries({href:src(person),x,y,width,height,'class':'illustrated-host-portrait','preserveAspectRatio':'xMidYMax meet'}))image.setAttribute(key,value);image.dataset.host=person;if(person==='john')image.setAttribute('transform',`translate(0 1) rotate(15 ${x+width/2} ${y+height-2})`);return image;}
 function outfit(svg,markup,branded=false){if(svg.querySelector('.host-outfit'))return;const clothes=document.createElementNS(ns,'g');clothes.classList.add('host-outfit');clothes.innerHTML=markup;svg.append(clothes);svg.querySelectorAll(':scope > .illustrated-host-portrait').forEach(face=>svg.append(face));const head=svg.querySelector('.guide-nodding-head');if(head&&svg.closest('.mountain-friend'))svg.append(head);
 if(!branded)return;
 const centers=svg.matches('.storybook-friends')?[[20,26,10],[58,26,10]]:svg.closest('.gps-travelers')?[[28,43,14],[72,43,14]]:[[svg.closest('.mountain-sitter,.has-landed')?26:30,34,11]];
 centers.forEach(([x,y,w])=>{const patch=document.createElementNS(ns,'g');patch.innerHTML=`<rect x="${x-w/2}" y="${y}" width="${w}" height="9" rx="1" fill="#fff0cf"/><text x="${x}" y="${y+2.6}" fill="#60351e" stroke="none" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="2.4"><tspan x="${x}">a little</tspan><tspan x="${x}" dy="2.6">lost</tspan><tspan x="${x}" dy="2.6">together</tspan></text>`;clothes.append(patch);});}
 function limbs(svg,arms,hands){
  if(svg.querySelector('.natural-limbs'))return;
  const g=document.createElementNS(ns,'g');g.classList.add('natural-limbs');g.innerHTML=`<path d="${arms}" fill="none" stroke="#d8aa86" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/>`+hands.map(([x,y,angle])=>`<path d="M-1.8-2Q-3-1-2 2L-.8 4Q0 5 1 3l1-2 1-1q.4-1-.7-1L1-1 1-3Q0-4-1-2Z" transform="translate(${x} ${y}) rotate(${angle})" fill="#dfb592" stroke="#8a604c" stroke-width=".45"/>`).join('');svg.append(g);
  if(svg.closest('.gps-travelers')){const arm=g.firstElementChild;arm.setAttribute('d','M28 45 12 56 7 48M28 45 44 56');arm.classList.add('john-arm');const other=arm.cloneNode();other.classList.remove('john-arm');other.setAttribute('d','M72 45 56 56M72 45 88 56 93 48');g.prepend(other);[...g.querySelectorAll('path[transform]')].slice(0,2).forEach(hand=>hand.classList.add('john-hand'));}
 }
 function decorate(){
  document.querySelectorAll('.guide-nodding-head').forEach((head,index)=>{
   const svg=head.closest('svg'),space=svg.classList.contains('astronaut-figure'),sitter=!!head.closest('.mountain-sitter,.has-landed');
   let person=head.closest('.camp-guide,.satellite-guide,.mountain-sitter')?'mateo':'john';
   if(head.closest('.van-crew'))person=[...head.closest('.van-crew').querySelectorAll('.guide-nodding-head')].indexOf(head)%2?'mateo':'john';
   const x=space?20:sitter?13:17,y=space?7:3,w=space?28:26,h=space?34:32;
   svg.dataset.host=person;
   if(head.dataset.portrait===person)return;head.dataset.portrait=person;head.replaceChildren(portrait(person,x,y+1,w,h));
  });
  document.querySelectorAll('.mountain-friend>svg:not(.paraglider-canopy):not(.tiny-bible):not(.tiny-cross):not(.poster-traveler)').forEach(svg=>{
   const seated=!!svg.closest('.mountain-sitter,.has-landed'),mateo=!!svg.closest('.mountain-sitter');const x=seated?26:30;
   limbs(svg,seated?'M25 37 36 45 40 53M25 37 13 47 9 61':'M30 36 17 30 13 15M30 36 43 30 47 15',seated?[[40,53,-15],[9,61,10]]:[[13,15,165],[47,15,195]]);
   outfit(svg,`<path d="${seated?'M24 49 40 53 49 67M24 49 16 64 33 67':'M30 48 19 59 25 72M30 48 43 58 46 71'}" fill="none" stroke="#37516c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M${x-6} 29h12l5 8-5 3 1 10H${x-8}l1-10-5-3Z" fill="${mateo?'#e4aa55':'#58a6b5'}" stroke="#18354a" stroke-width="1"/><path d="M${x-3} 29q3 5 6 0" fill="none" stroke="#f4e6cf" stroke-width="1.5"/>`);
  });
  document.querySelectorAll('.learning-rest-arm>path:first-child,.learning-catch-arm>path:first-child').forEach(arm=>{arm.setAttribute('stroke','#d8aa86');arm.setAttribute('stroke-width','3.8');});
  document.querySelectorAll('.learning-head:not([data-portrait])').forEach(head=>{const right=!!head.closest('.learning-friend-right');head.dataset.portrait=right?'john':'mateo';head.replaceChildren(portrait(head.dataset.portrait,right?145:38,43,32,38));});
  document.querySelectorAll('.storybook-friends:not([data-portrait])').forEach(svg=>{
   if(svg.closest('.storybook-cover')){svg.dataset.portrait='both';svg.dataset.capped='';svg.setAttribute('viewBox','0 0 92 62');svg.replaceChildren(portrait('john',3,2,42,56),portrait('mateo',46,2,42,56));return;}
   svg.dataset.portrait='both';svg.querySelectorAll('.yankees-cap').forEach(el=>el.remove());
   const paths=svg.querySelectorAll('path');if(paths[0])paths[0].setAttribute('d','M20 22l1 17m0-13L9 32l-5-5m17-1 17 8 19-8m0-4 1 17m-1-13 12 6 4-5M21 39l-8 13m8-13 8 13m29-13-8 13m8-13 9 13');paths[1]?.remove();
   svg.append(portrait('john',8,-2,24,28),portrait('mateo',46,-2,24,28));
  });
  document.querySelectorAll('.gps-travelers>svg:not([data-portrait]):not([data-stick-figures])').forEach(svg=>{
   svg.dataset.portrait='both';svg.querySelectorAll('.yankees-cap,circle:not([cy="95"])').forEach(el=>el.remove());
   svg.querySelector('path[d^="M23 30"]')?.remove();limbs(svg,'M28 45 12 56 7 48M28 45 44 56M72 45 56 56M72 45 88 56 93 48',[[7,48,165],[44,56,0],[56,56,0],[93,48,195]]);svg.append(portrait('john',12,3,32,39),portrait('mateo',56,3,32,39));
  });
  document.querySelectorAll('.storybook-friends[data-portrait]:not(.storybook-cover .storybook-friends)').forEach(svg=>outfit(svg,[20,58].map((x,i)=>`<path d="M${x-5} 24h10l2 15H${x-6}Z" fill="${i?'#d8a54f':'#54a3b3'}"/><path d="M${x} 39l-8 13m8-13 9 13" fill="none" stroke="#314b68" stroke-width="4"/>`).join('')));
  document.querySelectorAll('.gps-travelers>svg[data-portrait]:not([data-stick-figures])').forEach(svg=>outfit(svg,[28,72].map((x,i)=>`<path d="M${x} 64l-11 22m11-22 11 22" fill="none" stroke="#344b60" stroke-width="7" stroke-linecap="round"/><path d="M${x-6} 40h12l1 24H${x-7}Z" fill="${i?'#dfb46e':'#598d89'}"/><path d="M${x} 45l-9 6m9-6 9 6" fill="none" stroke="${i?'#dfb46e':'#598d89'}" stroke-width="8" stroke-linecap="butt"/><path d="M${x-4} 40q4 4 8 0M${x-5} 62h10" fill="none" stroke="#263d43" stroke-width=".7"/><path d="M${x-14} 86h6m16 0h6" stroke="#f5ecd9" stroke-width="4" stroke-linecap="round"/>`).join(''),false));
 }
 decorate();let queued=false;
 new MutationObserver(records=>{
  if(queued||!records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('svg,.guide-nodding-head,.learning-head')||n.querySelector?.('.guide-nodding-head,.learning-head,.storybook-friends,.gps-travelers')))))return;
  queued=true;requestAnimationFrame(()=>{queued=false;decorate();});
 }).observe(document.body,{childList:true,subtree:true});
 function redLost(){const title=document.querySelector('#gps-tracker-title');if(!title||title.querySelector('.lost-red'))return;const content=title.textContent;title.replaceChildren();const match=content.match(/lost|perdidos?/i);if(!match){title.textContent=content;return;}title.append(content.slice(0,match.index));const red=document.createElement('span');red.className='lost-red';red.textContent=match[0];title.append(red,content.slice(match.index+match[0].length));}
 redLost();document.addEventListener('lp:languagechange',redLost);
 const satellite=document.querySelector('.satellite');if(satellite){
  const signal=document.createElement('span');signal.className='satellite-tap-signal';signal.innerHTML='<svg viewBox="0 0 32 18" aria-hidden="true"><path d="M3 7Q16-5 29 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M7 11q9-9 18 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M11 14q5-5 10 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg><span></span>';
  signal.lastElementChild.remove();signal.setAttribute('aria-hidden','true');satellite.append(signal);
 }
})();

/* Small editorial doodles, kept outside controls and reading text. */
(() => {
 const sketches={
  tag:`<path d="M15 45q-6-28 19-27" stroke-dasharray="3 5"/><g transform="rotate(-9 76 40)"><path d="m36 18 17-9h70v52H53L36 48Z" fill="#e7b953"/><circle cx="48" cy="34" r="3"/><path d="M61 24h45M61 31h30M61 47h24"/><path d="m103 40 12-6-5 13-3-5Z" fill="#f8ecd6"/></g><path d="m136 13 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#b44939" stroke="none"/>`,
  ticket:`<path d="M8 50q22 9 28-8t25-4" stroke-dasharray="3 5"/><g transform="rotate(7 97 31)"><path d="M58 8h79v11a7 7 0 0 0 0 14v12H58V33a7 7 0 0 0 0-14Z" fill="#d8e8ee"/><path d="M112 10v33" stroke-dasharray="2 3"/><path d="m69 26 23-9-7 20-5-9Z" fill="#b94d39"/><path d="m80 28 12-11M119 18h10m-10 7h10m-10 7h7"/></g><circle cx="146" cy="49" r="3" fill="#d7ab48" stroke="none"/>`,
  camera:`<g transform="rotate(-8 78 36)"><path d="M35 19h17l5-9h28l5 9h23v39H35Z" fill="#d7e5ed"/><circle cx="75" cy="38" r="15" fill="#f8eed9"/><circle cx="75" cy="38" r="9"/><path d="M96 27h9M42 26h7"/><path d="M38 18v-5h9v5" fill="#b94d39"/></g><path d="m127 14 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="#e5b84f" stroke="none"/><path d="M15 41q-7 15 9 16" stroke-dasharray="3 4"/>`,
  conversation:`
   <path d="M23 122q25-3 47 0m69 0q26-3 49 0" stroke="#284447" stroke-opacity=".2"/>
   <g class="learning-friend learning-friend-left" stroke-width="2.2">
    <path d="M54 77v22l-13 22h-7m20-22 13 22h7M54 84 39 96 30 89M54 84 71 88 85 76"/>
    <g class="learning-head"><circle cx="54" cy="65" r="12" fill="#faf1dd"/><path d="M54 69q4 4 8-1" stroke-width="1.5"/><g fill="currentColor" stroke="none"><circle cx="55" cy="63" r="1.1"/><circle cx="62" cy="63" r="1.1"/></g>
     <path d="M42 60q-1-16 12-16t13 16Z" fill="#132448" stroke="#132448"/><path d="M42 59q14-3 27 1l8 3q-9 3-17-2Z" fill="#1f385a" stroke="#132448" stroke-width="1"/><image href="assets/yankees-cap-logo.svg" x="50" y="47" width="9" height="10"/></g>
    <path d="m84 77 3-5m-3 5 6-2" stroke-width="1.4"/>
   </g>
   <g class="learning-friend learning-friend-right" stroke-width="2.2">
    <path d="M161 77v22l-12 22h-7m19-22 13 22h7M161 84 146 91 129 80M161 84 177 94 185 86"/>
    <g class="learning-head"><circle cx="161" cy="65" r="12" fill="#faf1dd"/><path d="M151 69q4 4 8 0" stroke-width="1.5"/><g fill="currentColor" stroke="none"><circle cx="152" cy="63" r="1.1"/><circle cx="159" cy="63" r="1.1"/></g>
     <path d="M148 60q0-16 13-16t12 16Z" fill="#132448" stroke="#132448"/><path d="M173 59q-14-3-27 1l-8 3q9 3 17-2Z" fill="#1f385a" stroke="#132448" stroke-width="1"/><image href="assets/yankees-cap-logo.svg" x="154" y="47" width="9" height="10"/></g>
    <path d="m130 81-5-2m5 2-3-5" stroke-width="1.4"/>
   </g>
   <g class="learning-bubble learning-bubble-hola"><path d="M26 8h59q9 0 9 9v12q0 9-9 9H64l-10 9 1-9H26q-9 0-9-9V17q0-9 9-9Z" fill="#e8bd5d"/><text x="55" y="29" text-anchor="middle" stroke="none" fill="#284447" font-family="Caveat,cursive" font-size="21" font-weight="600">Hola!</text></g>
   <g class="learning-bubble learning-bubble-hi"><path d="M142 7h40q9 0 9 9v12q0 9-9 9h-18l-6 8-2-8h-14q-9 0-9-9V16q0-9 9-9Z" fill="#dae7eb"/><text x="162" y="28" text-anchor="middle" stroke="none" fill="#284447" font-family="Caveat,cursive" font-size="21" font-weight="600">Hi!</text></g>
   <path d="m105 53 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#b94d39" stroke="none"/>`

 };
 const learningTitle=document.querySelector('#learn-title');
 if(learningTitle){
  const exchange=document.createElement('div');exchange.className='learning-flag-string';
  exchange.innerHTML='<svg class="flag-string-line" viewBox="0 0 340 100" aria-hidden="true"><path d="M8 15Q170 65 332 15" fill="none" stroke="#78918a" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="15" r="2.5" fill="#b69867"/><circle cx="332" cy="15" r="2.5" fill="#b69867"/></svg><img src="assets/flag-us.svg" alt="United States" width="76" height="48"><img src="assets/flag-do-rect.svg" alt="Dominican Republic" width="76" height="48"><img src="assets/flag-bo.svg" alt="Bolivia" width="76" height="48">';

  learningTitle.after(exchange);
 }
 const placements=[['#about','tag'],['#journey .section-head>div','ticket'],['#contact>div:not(.contact-copy)','camera'],['.learn-intro','conversation']];
 for(const [selector,key] of placements){
  const target=document.querySelector(selector);if(!target)continue;
  const garnish=document.createElement('div');garnish.className='page-garnish garnish-'+key;garnish.setAttribute('aria-hidden','true');
  garnish.innerHTML=`<svg viewBox="${key==='conversation'?'0 0 220 132':'0 0 160 76'}" focusable="false"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${sketches[key]}</g></svg>`;
  target.append(garnish);
 }
})();

from pathlib import Path
p=Path('page-garnishes.js');s=p.read_text(encoding='utf-8')
lhand='<path d="m84 77 3-5m-3 5 6-2" stroke-width="1.4"/>'
rhand='<path d="m130 81-5-2m5 2-3-5" stroke-width="1.4"/>'
s=s.replace(lhand,'').replace(rhand,'')
s=s.replace('<path d="M54 84 71 88 85 76"/></g>','<path d="M54 84 71 88 85 76"/>'+lhand+'</g>')
s=s.replace('<path d="M161 84 146 91 129 80"/></g>','<path d="M161 84 146 91 129 80"/>'+rhand+'</g>')
lines=s.splitlines()
for i,line in enumerate(lines):
 if line.strip().startswith("['baseball',"):
  lines[i]='''  ['baseball','<circle r="11" fill="#fffdf0" stroke="#74888b" stroke-width="1"/><path d="M-7-8C-1-5-1 5-7 8M7-8C1-5 1 5 7 8" fill="none" stroke="#bc423e" stroke-width="1.1"/><path d="m-7-7 2-2m0 5 3-1m-2 5h3m-4 3 3 1m-5 2 2 2M7-7 5-9m0 5-3-1m2 5H1m4 3-3 1m5 2-2 2" fill="none" stroke="#bc423e" stroke-width=".85"/>'],'''
 if line.strip().startswith("['adobo',"):
  lines[i]='''  ['adobo','<image href="assets/adobo-shaker.svg" x="-11" y="-21" width="22" height="42"/>'],'''
s='\n'.join(lines)+'\n'
pos=s.index("  ['guira',")
s=s[:pos]+'''  ['pizza','<path d="M-13-12Q0-18 13-11L0 16Z" fill="#f5d278" stroke="#b48845"/><path d="M-13-12Q0-18 13-11" fill="none" stroke="#c79350" stroke-width="5"/><g fill="#bb5140" stroke="none"><circle cx="-5" cy="-6" r="2.6"/><circle cx="5" cy="-5" r="2.6"/><circle cx="0" cy="4" r="2.5"/></g>'],
  ['empanada','<path d="M-17 0Q0-23 17 0Q9 17-6 12-15 9-17 0Z" fill="#dbad62" stroke="#aa783f"/><path d="M-16 0Q0-19 16 0" fill="none" stroke="#f1d397" stroke-width="3"/><path d="m-13-2 2 2m2-5 2 3m3-6 1 4m3-4-1 4m5-3-2 3m6-1-3 2" stroke="#a97b43" stroke-width="1"/>'],
  ['soccer','<circle r="12" fill="#fff9e9" stroke="#5e777b"/><path d="m0-5 5 4-2 6h-6l-2-6ZM-9-8l2 4-5 4M9-8 7-4l5 4M-9 8l5-1 2 5M9 8 4 7l-2 5" fill="#29474c"/><path d="M-7-4-5-1M7-4 5-1M-4 7-3 5M4 7 3 5M0-5v-7" fill="none" stroke-width=".8"/>'],
'''+s[pos:]
a=s.index(' sketches.conversation=');b=s.index(' const learningTitle=',a)
s=s[:a]+''' const catchPhrases=[['You got it?','Dale!'],['Pass it, bro.','Ahi te va.'],['No sabo...','Pero aprendo.'],['Un cafecito?','Always.'],['Eso es!','We got this.'],['One more?','Una mas.'],['Catch, primo.','La tengo.'],['Pizza break?','Si, please.'],['Vamos!','Let\u2019s go.']];
 const chatter=catchPhrases.map(([a,b],i)=>'<g class="culture-chat chat-left" style="--catch-delay:'+i*3.6+'s"><path d="M-29 91h64q7 0 7 7v9l13 5-13 2v4q0 7-7 7h-64q-7 0-7-7V98q0-7 7-7Z" fill="#f4df9c" stroke-width="1"/><text x="3" y="112" text-anchor="middle" fill="#284447" stroke="none" font-family="Caveat,cursive" font-size="14" font-weight="600">'+a+'</text></g><g class="culture-chat chat-right" style="--catch-delay:'+i*3.6+'s"><path d="M300 91h73q7 0 7 7v20q0 7-7 7h-73q-7 0-7-7v-5l-12-4 12-4v-7q0-7 7-7Z" fill="#dce8e5" stroke-width="1"/><text x="336" y="112" text-anchor="middle" fill="#284447" stroke="none" font-family="Caveat,cursive" font-size="14" font-weight="600">'+b+'</text></g>').join('');
 sketches.conversation='<path d="M27 165q30-4 68 0m140 0q30-4 68 0" stroke-opacity=".15"/>'+
 '<g transform="translate(2 40)">'+left+'</g><g transform="translate(110 40)">'+right+'</g>'+
 cultureItems.map(([name,art],i)=>'<g class="culture-flight culture-'+name+' '+(i%2?'culture-return':'')+'" style="--catch-delay:'+i*3.6+'s"><g transform="translate(87 116)" stroke-width="1.3">'+art+'</g></g>').join('')+chatter;
'''+s[b:]
s=s.replace("key==='conversation'?'0 0 340 180'", "key==='conversation'?'-40 0 430 180'")
p.write_text(s,encoding='utf-8')

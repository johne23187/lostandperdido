from pathlib import Path
p=Path('editorial-books.js');s=p.read_text(encoding='utf-8');s=s.replace('window.LPStories?.mount(paper);','window.LPStories?.mount(paper);window.LPDestinations?.mount(paper);')
old='''<a href="${mail(t(pair('Somewhere you should get lost','Un lugar donde deberían perderse')))}">${words('Tell us','Cuéntanos')} →</a>'''
assert old in s
s=s.replace(old,'')
needle="if(entry.kind==='looking')"
a=s.index(needle);b=s.index("if(entry.kind==='stamps')",a)
part=s[a:b].replace('<div class="passport-actions">','<div class="passport-ufo-dock" data-destination-ufo></div><div class="passport-actions">')
s=s[:a]+part+s[b:];p.write_text(s,encoding='utf-8')
p=Path('hidden-orbit.js');s=p.read_text(encoding='utf-8-sig');s=s.replace(" const compass=document.querySelector('.gps-expanded-screen .gps-compass-dock');if(compass)compass.append(ship);", " window.LPDestinations={mount(container=document){const dock=container.querySelector('[data-destination-ufo]');if(dock)dock.append(ship);}};\n window.LPDestinations.mount();")
p.write_text(s,encoding='utf-8')

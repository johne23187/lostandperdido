from pathlib import Path
from PIL import Image
import json
names=['meadow-poster-tree','mateo-meadow-composite','latin-campaigns','hostel-community-concept','restaurant-feature-concept','partner-campaigns','ugc-hotel-concept','explosion-cloud','bolivia-andes']
Path('.local-data/graphics-audit').mkdir(parents=True,exist_ok=True)
report=[]
for name in names:
 p=Path('assets')/(name+'.png');out=p.with_suffix('.webp');im=Image.open(p);im.save(out,format='WEBP',lossless=True,method=0,exact=True)
 assert Image.open(out).convert('RGBA').tobytes()==im.convert('RGBA').tobytes(),name
 report.append({'source':str(p),'webp':str(out),'before':p.stat().st_size,'after':out.stat().st_size})
 print(name,p.stat().st_size,out.stat().st_size,flush=True)
for name in ['john-yankees-smiling','mateo-yankees-head']:
 p=Path('assets')/(name+'.png');im=Image.open(p);im.thumbnail((192,192),Image.Resampling.LANCZOS);out=p.with_name(name+'-192.webp');im.save(out,format='WEBP',lossless=True,method=0,exact=True)
 report.append({'source':str(p),'webp':str(out),'before':p.stat().st_size,'after':out.stat().st_size})
Path('.local-data/graphics-audit/compression.json').write_text(json.dumps(report,indent=2))

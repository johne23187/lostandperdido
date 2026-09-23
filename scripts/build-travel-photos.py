"""Build local portfolio manifest and optimized previews; originals stay untouched."""
import json, subprocess, hashlib
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parents[1]
source=ROOT/'travel-photos'; output=ROOT/'assets/travel-previews';output.mkdir(exist_ok=True)
names={'DR':'Dominican Republic','PR':'Puerto Rico','Brazil':'Brasil','Turkey':'Türkiye'}
def prepare(p):
 relative=p.relative_to(ROOT).as_posix();key=hashlib.sha1(relative.encode()).hexdigest()[:16]
 video=p.suffix.lower() in {'.mp4','.mov','.m4v'}
 if video:return {'src':relative,'type':'video'}
 preview=output/(key+'.jpg')
 if not preview.exists() or preview.stat().st_mtime<p.stat().st_mtime:
  subprocess.run(['sips','-s','format','jpeg','-s','formatOptions','75','-Z','1000',str(p),'--out',str(preview)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 return {'src':relative,'preview':preview.relative_to(ROOT).as_posix(),'type':'photo'}
manifest={}
with ThreadPoolExecutor(max_workers=4) as pool:
 for folder in sorted(source.iterdir()):
  if not folder.is_dir():continue
  files=sorted(p for p in folder.rglob('*') if p.suffix.lower() in {'.jpg','.jpeg','.png','.webp','.heic','.mp4','.mov','.m4v'})
  manifest[names.get(folder.name,folder.name)]=list(pool.map(prepare,files))
(ROOT/'travel-photos.js').write_text('window.travelPortfolios='+json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+';\n')
print('Built',len(manifest),'portfolios with',sum(len(v) for v in manifest.values()),'photos and videos.')

# Curated covers persist when the folders are refreshed.
from PIL import Image, ImageOps
settings=json.loads((ROOT/'travel-covers.json').read_text())
covers={}
for country,setting in settings.items():
    original=ROOT/setting['src']
    if not original.is_file():
        raise FileNotFoundError('Selected cover is missing: '+str(original))
    image=ImageOps.exif_transpose(Image.open(original)).convert('RGB')
    if 'crop' in setting:
        left,top,right,bottom=setting['crop']
        image=image.crop((round(left*image.width),round(top*image.height),round(right*image.width),round(bottom*image.height)))
    image.thumbnail((1800,1800))
    name=hashlib.sha1(country.encode()).hexdigest()[:12]+'-cover.jpg'
    target=output/name
    image.save(target,quality=88,optimize=True)
    covers[country]={'src':target.relative_to(ROOT).as_posix(),'position':setting.get('position','50% 40%')}
with (ROOT/'travel-photos.js').open('a') as f:
    f.write('window.travelPortfolioCovers='+json.dumps(covers,ensure_ascii=False,separators=(',',':'))+';\n')
print('Saved',len(covers),'curated covers.')

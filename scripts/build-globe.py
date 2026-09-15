"""Build the orthographic globe from Natural Earth's public-domain country GeoJSON.
Usage: python3 scripts/build-globe.py /path/to/ne_110m_admin_0_countries.geojson
"""
import base64
import json
import math
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
C = 400
R = 350
LAT = math.radians(-15)
LON = -65

def project(lon, lat):
    p, l = math.radians(lat), math.radians(lon - LON)
    x = math.cos(p) * math.sin(l)
    y = math.cos(LAT) * math.sin(p) - math.sin(LAT) * math.cos(p) * math.cos(l)
    z = math.sin(LAT) * math.sin(p) + math.cos(LAT) * math.cos(p) * math.cos(l)
    if z < 0:
        length = math.hypot(x, y)
        x, y = x / length, y / length
    return C + R * x, C - R * y, z

def ring_path(ring):
    points = []
    for a, b in zip(ring, ring[1:]):
        dl = (b[0] - a[0] + 180) % 360 - 180
        steps = max(1, math.ceil(max(abs(dl), abs(b[1] - a[1]))))
        points.extend(project(a[0] + dl * t / steps, a[1] + (b[1] - a[1]) * t / steps) for t in range(steps))
    if not points or not any(p[2] >= 0 for p in points):
        return '', []
    return 'M' + ' L'.join(f'{x:.2f},{y:.2f}' for x,y,z in points) + 'Z', points

features = json.loads(Path(sys.argv[1]).read_text())['features']
parts = ['''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
<defs>
<radialGradient id="ocean" cx="32%" cy="27%" r="76%"><stop stop-color="#347ba0"/><stop offset=".55" stop-color="#144461"/><stop offset="1" stop-color="#061724"/></radialGradient>
<radialGradient id="land" cx="30%" cy="25%" r="80%"><stop stop-color="#8fa99a"/><stop offset=".55" stop-color="#526f64"/><stop offset="1" stop-color="#253e3d"/></radialGradient>
<radialGradient id="shade" cx="35%" cy="30%" r="68%"><stop offset=".45" stop-color="#06101b" stop-opacity="0"/><stop offset=".85" stop-color="#06101b" stop-opacity=".22"/><stop offset="1" stop-color="#010812" stop-opacity=".8"/></radialGradient>
<radialGradient id="halo"><stop offset=".84" stop-color="#77cbff" stop-opacity="0"/><stop offset=".91" stop-color="#77cbff" stop-opacity=".22"/><stop offset="1" stop-color="#77cbff" stop-opacity="0"/></radialGradient>
</defs>
<circle cx="400" cy="400" r="386" fill="url(#halo)"/>
<circle cx="400" cy="400" r="350" fill="url(#ocean)"/>
''']
visited = []
for f in features:
    geom = f['geometry']
    polygons = geom['coordinates'] if geom['type'] == 'MultiPolygon' else [geom['coordinates']]
    paths, pts, rings = [], [], []
    for poly in polygons:
        d, points = ring_path(poly[0])
        if d:
            paths.append(d)
            pts.extend(points)
            rings.append(points)
    if not paths:
        continue
    d = ' '.join(paths)
    name = f['properties']['ADMIN']
    parts.append(f'<path d="{d}" fill="url(#land)" stroke="#b1c9bd" stroke-opacity=".32" stroke-width=".65" stroke-linejoin="round"/>')
    if name in ['Argentina', 'Chile', 'Bolivia']:
        visited.append((name, d, pts, rings))
# Subtle meridians and parallels convey the globe's curvature.
for axis in ['lon', 'lat']:
    for fixed in (range(-180,180,30) if axis == 'lon' else range(-60,90,30)):
        commands = []
        drawing = False
        for n in (range(-90,91) if axis == 'lon' else range(-180,181)):
            x,y,z = project(fixed,n) if axis == 'lon' else project(n,fixed)
            if z >= 0:
                commands.append(('L' if drawing else 'M') + f'{x:.2f},{y:.2f}')
                drawing = True
            else:
                drawing = False
        parts.append(f'<path d="{" ".join(commands)}" fill="none" stroke="#c3e7eb" stroke-opacity=".09" stroke-width=".7"/>')
for name,d,pts,rings in visited:
    code = {'Argentina':'ar','Chile':'cl','Bolivia':'bo'}[name]
    x0,x1 = min(p[0] for p in pts),max(p[0] for p in pts)
    y0,y1 = min(p[1] for p in pts),max(p[1] for p in pts)
    # Center the design on the country's silhouette at the flag's middle band.
    # Bounding-box centers skew right for countries like Argentina, whose
    # northern border extends much farther east than its central mainland.
    middle_y = (y0 + y1) / 2
    spans = []
    for ring in rings:
        crossings = sorted(
            a[0] + (middle_y - a[1]) * (b[0] - a[0]) / (b[1] - a[1])
            for a, b in zip(ring, ring[1:] + ring[:1])
            if (a[1] > middle_y) != (b[1] > middle_y)
        )
        spans.extend(zip(crossings[::2], crossings[1::2]))
    left, right = max(spans, key=lambda span: span[1] - span[0]) if spans else (x0, x1)
    center_x = (left + right) / 2
    # Retain the large country-filling treatment. A modest inset reveals more
    # of the design and slightly reduces vertical stretching, while keeping
    # the artwork centered on the mainland rather than its bounding box.
    flag_bytes = (ROOT / f'assets/flag-{code}.svg').read_bytes()
    flag_width = 1.8 * max(center_x - x0, x1 - center_x)
    flag_height = (y1 - y0) * .88
    flag_x = center_x - flag_width / 2
    flag_y = middle_y - flag_height / 2
    flag = base64.b64encode(flag_bytes).decode()
    # Extend the horizontal bands to the borders so the entire country stays
    # flag-filled even with the slightly inset artwork.
    colors = {'ar': ['#74acdf', '#fff', '#74acdf'],
              'cl': ['#fff', '#d52b1e'],
              'bo': ['#d52b1e', '#f9e300', '#007934']}[code]
    stops = []
    for index, color in enumerate(colors):
        start = 0 if index == 0 else (flag_y + flag_height * index / len(colors) - y0) / (y1 - y0)
        end = 1 if index == len(colors) - 1 else (flag_y + flag_height * (index + 1) / len(colors) - y0) / (y1 - y0)
        stops.extend([f'<stop offset="{start}" stop-color="{color}"/>', f'<stop offset="{end}" stop-color="{color}"/>'])
    parts.append(f'<defs><clipPath id="country-{code}"><path d="{d}"/></clipPath><linearGradient id="flag-bands-{code}" x1="0" y1="0" x2="0" y2="1">{"".join(stops)}</linearGradient></defs>')
    parts.append(f'<path d="{d}" fill="url(#flag-bands-{code})"/>')
    parts.append(f'<image x="{flag_x}" y="{flag_y}" width="{flag_width}" height="{flag_height}" preserveAspectRatio="none" href="data:image/svg+xml;base64,{flag}" clip-path="url(#country-{code})"/>')
    parts.append(f'<path d="{d}" fill="none" stroke="#ffe6a1" stroke-width="1.8" stroke-linejoin="round"/>')
parts.append('<circle cx="400" cy="400" r="350" fill="url(#shade)"/><circle cx="400" cy="400" r="350" fill="none" stroke="#9fd9f1" stroke-opacity=".5" stroke-width="1.5"/></svg>')
(ROOT / 'assets/travel-globe.svg').write_text(''.join(parts))

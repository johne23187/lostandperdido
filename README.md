# Lost & Perdido

A responsive static website for a bilingual Latin American travel-media brand. Open `index.html` in a browser or use VS Code Live Server. No build step or dependencies are required.

## Files
- `index.html`: brand story, Argentina → Chile → Bolivia route, upcoming content, travel notebook and partnerships.
- `styles.css`: responsive design, route illustrations styling, keyboard focus and reduced-motion support.
- `script.js`: accessible mobile navigation and current footer year.

## Content status
The first season is presented as upcoming. Arrival dates are October 18, 2026 (Argentina), October 23, 2026 (Chile), and October 31, 2026 (Bolivia). Each card counts down to midnight local time, using explicit UTC offsets, then displays “Arrival date reached” without claiming a confirmed physical arrival. Arrival times can be adjusted in the `data-arrival` attributes in `index.html`. No completed episodes or published guides are invented.

Social handles were not supplied. The content section describes the planned channels without linking to unverified accounts. Add the real channel URLs and published episodes when the relaunch is ready. Replace upcoming notebook rows with article links as guides are published.

The contact address `info@lostandperdido.com` is preserved from the original website. Confirm that this inbox is active before launch. Contact buttons open the visitor’s email app; there is no form backend or mailing-list integration.

The hero uses externally hosted Unsplash photography as mood imagery, not original expedition footage. Google Fonts also requires internet access; local fallback fonts and a dark hero background remain available offline. Destination photos are stored in `assets/` and work offline. Wikimedia Commons source and license credits appear below each image. Mendoza and Chile photos are resized; all photos are visually cropped to fit the cards. The Chile card features a daylight photograph of Santiago’s Metropolitan Cathedral and Plaza de Armas by Rjcastillo (CC BY-SA 4.0), resized locally with its source and license linked in the caption. Replace the hero with your own footage or photography when available.

## Verification
HTML IDs and internal anchor targets checked with Python. JavaScript runtime and visual browser checks require a browser (or Node for isolated logic checks); neither was available in the editing session.

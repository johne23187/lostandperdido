# Lost & Perdido

A responsive static website for a bilingual Latin American travel-media brand. Run `npm start` with Node.js 22.13 or newer, then open http://localhost:8766. There is no build step and no package installation is required. Opening the HTML directly or using a static-only server displays the site but cannot provide shared voting.

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
Run `npm test` for the poll API and photo-animation lifecycle regression checks. Visual desktop and mobile verification requires a connected browser.

### City popup photos

Each city pin opens a card with local facts and a photo diary. Add photos to the matching stop in `city-photos.js`, for example:

```js
"mendoza": [
  { src: "assets/photos/mendoza-01.jpg", alt: "Vineyards below the Andes", caption: "Our first afternoon in Mendoza", altEs: "Viñedos al pie de los Andes", captionEs: "Nuestra primera tarde en Mendoza" }
]
```

Place the image files at the specified paths. Multiple photos form a horizontally scrollable gallery. Empty arrays show “We must be lost right now.” Descriptive `alt` text is required; captions and Spanish versions are optional. Facts and their source links are in each `map-stop` article in `index.html`.


## Shared daily poll and deployment

The Node server in scripts/server.mjs serves the website, video byte ranges, and the poll API. Run npm test for voting and animation lifecycle checks. The Python preview command now forwards to this server.

Votes are stored in .local-data/daily-poll.sqlite3, with one immutable vote per browser per UTC calendar day. Totals accumulate across days and survive server restarts. A persistent HttpOnly cookie remembers the browser. This is anonymous browser/device voting; clearing cookies or using another device creates another identity. Person-level enforcement requires authentication.

GET /api/poll returns percentages' source totals and today's selection. POST /api/poll accepts a choice and returns 409 for a duplicate daily vote. GET /api/poll/events streams shared updates to open polls. Selection updates immediately and is confirmed by the server; unavailable servers never fabricate local totals or claim to have saved votes.

For a live deployment, run npm start on a Node host with persistent storage. Set HOST=0.0.0.0, PORT to the hosting platform's port, and POLL_DATA_DIR to a persistent volume outside the public files. Preserve and back up that directory; do not put it on an ephemeral deployment filesystem. Use a single server instance with its SQLite volume and HTTPS through the host's reverse proxy. Ensure the proxy permits event streams (the client also refreshes every 10 seconds). Static hosting alone cannot run this API. Existing legacy preview votes in poll.sqlite3 are left untouched; the new daily poll uses its own database.

Social likes and views are animated presentation counters, not fetched platform analytics. Reduced-motion preferences stop the rapid counters and pulsing prompts.

Validation: automated checks cover persistence, UTC rollover, concurrent duplicates, API validation, event streaming, video ranges, JavaScript syntax, and cancellation/reopening during photo transitions. Desktop/mobile visual checks still need a connected browser.


## Netlify deployment

Netlify now uses netlify.toml: install the package dependencies, run npm run build, publish dist, and bundle netlify/functions. The poll is handled at /api/poll by a Netlify Function using site-wide Netlify Blobs with strong consistency. Conditional writes save the total and browser eligibility atomically; votes persist across production deploys. No separate Node server or database secret is needed on Netlify. The local Node preview still uses SQLite. Its existing votes are separate from the production Blobs store.

The frontend updates immediately after a selection and refreshes shared totals every 10 seconds while the GPS poll is open. It does not attempt the local server's event stream when the Netlify API reports polling mode. Browser identity uses a persistent HttpOnly cookie; the limit resets at midnight UTC. Clearing cookies or switching browsers creates a new identity.

Run npm test for both the local server and Netlify poll-handler checks. The Netlify handler tests use an in-memory store implementing conditional writes; live platform storage still needs verification after a deployment. A static drag-and-drop upload cannot deploy the poll function: use the connected Git deployment with this build configuration, or Netlify CLI's build/deploy flow.

Storage API reference: https://docs.netlify.com/build/data-and-storage/netlify-blobs/

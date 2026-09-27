# Production audit — September 27, 2026

Implemented: book magnifier entrance (65% down to existing 24% scale), uncropped mobile van layout, smaller bilingual destination introduction, room below social phones, large rocket initials without the red body triangle, and six decorative service icons on hover/keyboard focus. Touch users retain readable service labels.

Performance and presentation: responsive hero requests (1000px mobile / 2200px desktop), hero preload and preconnect, deferred offscreen images, YouTube API loaded only when requested, reduced-motion scrolling, larger mobile van controls, favicon, branded 404, static asset caching and basic response security headers. No image originals were deleted or recompressed.

SEO: production build creates canonical and Open Graph URLs, social image metadata, Organization structured data, robots.txt and sitemap.xml for https://lostandperdido.com. SITE_URL may override the domain. Core branding, portfolio content, attribution, partnership concepts and contact flow remain intact.

Validation passed: production build; JavaScript syntax; 645 local asset references including 584 portfolio references; unique IDs; internal navigation anchors; image alt attributes; accessible dialog names; external-tab protection; persistent poll totals, concurrent/duplicate voting and UTC rollover; API validation; video ranges; private-file protection; and 20 repeated animation lifecycle runs. Netlify storage behavior was tested against a mock, not a live deployed function. Automated tests do not establish full WCAG compliance.

External link requests succeeded for the tested visitor destinations except the two UNESCO pages, which returned automated-access 403 responses. Font preconnect origins are not pages and return 404 at their roots; the font stylesheet itself returned 200. The Wikimedia attribution passed when requested with correct UTF-8 encoding.

## Remaining launch checks

- No connected browser was available. Verify at 320, 375, 390, 430, 768 and 1440px, with real iPhone Safari video playback, keyboard navigation, zoom, reduced motion, and English/Spanish switching. Check the magnifier and phone labels visually.
- Run Lighthouse/axe and measure Core Web Vitals on the deployed site; no scores or measured speed improvements are claimed. Several large PNG illustrations and the accumulated CSS overrides still warrant a browser-backed optimization pass. Broad CSS deletion was avoided without visual regression coverage.
- Deploy once when ready, then verify /api/poll against actual Netlify Blobs, persistence across a redeploy, and a second browser. Daily limits identify a browser cookie, not a verified person; clearing cookies or changing devices bypasses identity. UTC defines the day.
- Confirm the published follower counts, November 1 launch announcement, mailbox delivery at hola@lostandperdido.com, and final Skool community destination (currently the Skool homepage). Keep partnership mockups labeled as concepts.
- Open the two UNESCO references manually and inspect sharing previews, custom domain redirects, HTTPS and the production 404.
- The previously requested additional photo was not attached.

No push or deployment was performed.

## Interactive books — September 27 update

Added a six-feature bilingual partnership magazine and a seven-spread bilingual passport beside How We Met. Magazine pages retain the six service pathways (films/YouTube within media packages), with a red cover, service directory, revised handshake, deliverables, inquiry links and brand stamp. The passport includes the complete attached brief, pending country stamps, typed decorative signatures, real personal photography, route notes and community invitations. Reference imagery is credited; previews are not presented as completed client work.

Unlike the earlier audit, this update was validated in an isolated headless Chrome session. Tested all 212 book/locale/viewport states at widths 320, 375, 390, 430, 768 and 1440px, with no horizontal page overflow or book navigation outside the viewport. Verified native touch swipes, arrow-key paging, Escape and restored opener focus. Reviewed desktop magazine, cover and passport screenshots and the mobile passport. Fixed inherited navigation/footer styles and existing mobile speech-bubble/contact-grid overflow discovered during these checks. No runtime exceptions were recorded during testing. Real-device Safari testing remains recommended.

All existing automated suites and production build pass. Dynamic book assets and paired translations are now covered by test-audit.mjs. Book content and future stamp data live in editorial-books.js; scoped styling lives in editorial-books.css. Add a country record to stamps to extend the collection, and an href when a real destination story is ready. No new dependencies, generated people, public prices or deployment.

Additional reader checks: 20 passport reopen/page-turn cycles and reduced-motion behavior passed. Final alternative magazine layouts were also checked at 768px in Spanish.

## Passport refinement — September 27

Passport cover is now navy with matching How We Met dimensions, resting angle and continuous seven-second page riffle; reduced-motion disables the loop. Increased object spacing. Restored the desktop magazine-left / six-option directory-right composition; added white & Perdido wordmarks, a small Argentina → Chile → Bolivia line and a circular lower-left stamp. Mobile stacks the composition without overflow.

Passport interiors now use security-line paper patterns, immigration-style typography, ink stamps, taped photos, margin notes and full decorative signatures: John Emanuel and Mateo Loayza. Community copy connects getting lost to finding our way together. The future vision board covers a Skool language community, broader social reach, travel, honoring God, weekly Bible study and daily faith messages, explicitly as aspirations. Country entry stamps remain pending.

The small journal in What We’re Looking For keeps a draft while turning pages and validates a maximum of 100 words. Submission opens the visitor’s email composer addressed to hola@lostandperdido.com; it does not automatically send, publish or save stories to a server. Passport Work With Us links open the partnership magazine directly.

Validation: all 212 page/language/viewport states passed overflow and navigation checks at 320, 375, 390, 430, 768 and 1440px. Verified equal cover sizes and angles, reduced motion, direct passport-to-magazine navigation, rejection of 101 words, acceptance of 100 words, and draft retention between pages. No email was sent during testing. Browser recorded no runtime exceptions. Existing automated suites and production build passed. No deployment.


### Passport and partnership refinement — September 27, 2026
- Restored separate service previews behind the six directory options; retained the editorial magazine. Added shared, interactive Instagram/YouTube/TikTok previews and clearly labeled, uncommissioned DJI/Airalo concepts using personal travel photos.
- Replaced hover icons with emojis, linked the Antigua stingray photograph to the official attraction site, moved social links below the partnership CTA, and reduced section-top spacing.
- Updated the passport portrait, birth year, rocket seal, faith copy and illustration, and book-cover figures. Added an animated compass with bilingual travel prompts and reduced-motion support.
- Made photo credits expandable while preserving attribution and license links. Spanish retains the English airplane wordmark.
- Validation: all three regression suites passed; production build succeeded. Headless Chrome: 48 service-dialog states across 320/390/768/1440 widths and both languages, plus 36 magazine states across 320/390/1440 and both languages, with no tested horizontal dialog overflow or runtime exceptions. Inspected desktop partnership preview, contact layout, mobile passport, and mobile compass screenshots. Verified Airalo tab and compass action.
- Changes are local; no deployment or Netlify push performed. Brand examples remain concepts, not completed partnerships.

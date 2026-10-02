# Mobile responsiveness QA — 2026-10-01

The desktop visual design remains the source of truth. Responsive adaptations are grouped in `responsive.css`, loaded after the component styles, and `responsive.js`.

## Browser validation

Tested in an isolated local Chrome session at 320, 375, 390, 430, 768, 1024, and 1440 CSS pixels. Also tested the menu at 320 × 568.

- 130 layout/navigation checks passed across English and Spanish, all 14 mobile passport pages, all 6 magazine pages, all 6 service dialogs, 15 country galleries and their lightboxes, Top Picks filters, and the 404 page.
- Additional checks covered all 19 planned-city dialogs, GPS, satellite, van, and poster overlays at 320px.
- No horizontal overflow in those checked page/dialog containers; intentional internal book-directory scrolling remains.
- Menu link closing, Escape, keyboard focus wrapping, and short-screen bounds passed.
- Native trackpad scrolling moves the page; Ctrl/pinch zoom changes the globe. Two-finger touchscreen slides scroll the page; spreading fingers zooms the globe without moving the page.
- Storybook page controls keep the corresponding soundtrack half on the same page.
- Photography pagination shows one photo on phones and a two-photo spread on larger screens, updating while resizing.
- The social entrance completes and the three devices continue orbiting. With reduced motion, phones are displayed individually instead of freezing in an overlapping position.
- The title typing animation completes and retains its cursor.
- At 1440px, toggling the responsive stylesheet produces identical measured geometry and font sizes for the header, hero, about section, route grid, globe, social stage, magazine stand, learning section, and closing section.
- No JavaScript exceptions in the main browser audit; `git diff --check` passed.

## Scope and remaining device checks

The preview used a static local server, so the voting backend was not exercised. The existing Node test suite could not run because Node is unavailable in this environment.

Check once on physical iPhone Safari and Android Chrome for browser chrome/safe-area behavior, native video controls, typing audio permission, and third-party YouTube playback. Those platform behaviors are not fully represented by desktop Chrome emulation.

# Yanaka UpCraft Studio

Mobile-first brochure site for Yanaka UpCraft Studio, deployed through Cloudflare Pages.

## Structure

- `index.html` — page content and SEO metadata
- `css/style.css` — responsive visual design
- `js/script.js` — mobile menu and header behavior
- `schedule.json` — workshop dates, times, and remaining spots
- `images/` — photography guide and future image assets
- `robots.txt` and `sitemap.xml` — search engine discovery

## Publishing

Cloudflare Pages publishes changes from the `main` branch. This is a plain static site and requires no build command or output directory.

## Updating availability

Edit only `schedule.json`. Each workshop has a date and a list of time slots. Change the `spots` number as bookings arrive, add another slot, or copy a workshop block to add a new date. The page formats dates and times automatically.

## Before launch

Confirm final workshop projects and prices, email and Instagram links, booking URL, cancellation policy, and the Open Graph image.

# iyyappanrock535.github.io

Portfolio of Iyyappan Sivakumar, Senior Full Stack Engineer. React, Vite and Tailwind CSS, published to GitHub Pages from the `gh-pages` branch.

## Edit content

All text lives in `src/data/profile.ts`: profile, featured work, earlier projects, experience, skills and certifications.

## Add project screenshots

1. Save images in `public/work/club/`, `public/work/athlete/` or `public/work/thangam/` (PNG or WebP, about 1600px wide).
2. List them in that project's `screens` array, for example `screens: ['/work/club/dashboard.png']`.
3. Blur or replace real customer names, phone numbers and amounts first.

Until a project has screenshots, the site shows an illustrative view with sample data.

## Hidden sections

The client reviews and the Freelancer profile link are still in the code but hidden. Turn them on in `show` at the bottom of `src/data/profile.ts`.

## Resume

Replace `public/Iyyappan-Sivakumar-Resume.pdf` when the resume changes.

## Run and publish

```
npm install
npm run dev        # local preview
npm run build      # output in dist/
```

Publish by pushing the contents of `dist/` to the `gh-pages` branch.

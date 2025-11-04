# Project Cost Estimator (Invoice Export Edition)

A practical cost calculation tool for project managers to estimate project costs and generate invoice‑style PDFs.

## Features

- Form inputs for hours, hourly rate, revisions, platform complexity, and add‑ons
- Live cost summary with subtotal, tax, discount, and final total
- Invoice‑style preview (logo placeholder, date, project and client info)
- Export: Download PDF, Print, and Copy Link (state encoded in URL)

## Tech Stack

- React (Vite + SWC)
- Tailwind CSS v4 for styling
- html2pdf.js for PDF export

## Requirements

- Node.js 18+ (recommended LTS)

## Getting Started

1) Install dependencies

```
npm install
```

2) Start the dev server

```
npm run dev
```

Then open the URL printed in the terminal (typically `http://localhost:5173`).

3) Build for production

```
npm run build
```

4) Preview the production build locally

```
npm run preview
```

## Using the App

1. Fill in project details (project name, client name, hours, rate, revisions, complexity, add‑ons).
2. Adjust tax rate and discount as needed.
3. Use the buttons in the header:
   - Download PDF: exports the invoice preview as a PDF file
   - Print: opens the system print dialog
   - Copy Link: copies a shareable URL with the current form state

## Tailwind CSS v4 Setup

This project uses Tailwind v4 with the dedicated PostCSS plugin:

- `src/index.css` imports Tailwind:

```
@import "tailwindcss";
```

- `postcss.config.js` uses the v4 plugin:

```
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

If styles don’t appear, stop the dev server and run `npm run dev` again so Vite picks up the PostCSS config.

## Troubleshooting

- Tailwind styles aren’t loading
  - Ensure `@tailwindcss/postcss` is installed and configured in `postcss.config.js`.
  - Restart the dev server after changes.

- PDF download doesn’t start
  - The PDF library is loaded dynamically. Make sure you’re online (first load) and try again.
  - Some browsers block downloads from pop‑ups; ensure the page is interacted with (click) before exporting.

- Copy Link fails
  - Clipboard access may be restricted on non‑secure origins. The app falls back to a manual copy prompt.

## Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – build for production
- `npm run preview` – preview the production build

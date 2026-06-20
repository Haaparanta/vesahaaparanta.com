This is a [Next.js](https://nextjs.org/) personal website for [vesahaaparanta.com](https://vesahaaparanta.com).

## Getting Started

Install [Bun](https://bun.sh), then install dependencies and start the dev server:

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Scripts

```bash
bun dev       # Start development server
bun run build # Create static export in out/
bun start     # Serve production build
bun run lint  # Run ESLint
```

## Deployment

The site is deployed to Firebase Hosting. Pushes to `main` trigger a production deploy via GitHub Actions using Bun.

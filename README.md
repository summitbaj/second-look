# Second Look

A mobile-friendly HuskyHack prototype that offers an optional second opinion before a payment. Built with React, Vite and an optional local Node API.

All members, payments and interactions are fictional. Risk flags, assistant replies, trusted-contact messages, callbacks, agent sessions and account freezes are simulations. No real money moves, no messages are sent and no real account is protected. This is an independent student project, not an official Sound Credit Union service.

## Run locally

Use Node 22.12 or later.

```sh
npm ci
npm run dev
```

To check the production build:

```sh
npm run build
npm run preview
```

## Demo journey

Sign in with either demo button, choose Send money and review a sample payment. The optional assistant explains simulated concerns and offers a pause script, bank contact options, trusted-contact checking and a simulated agent handoff. Members can dismiss the conversation and decide on the payment review screen. Freeze demo account blocks outgoing demo payments until a simulated recovery review.

Employee demo lets Jessica post an active calling status on a fictional customer profile. It shares state with the member view in the same browser tab; it does not verify incoming phone calls.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys the frontend on pushes to `main`. Set Settings → Pages → Source to GitHub Actions. The workflow automatically uses the configured Pages base path. Only the generated `dist/` folder is deployed.

## Optional local API

The frontend uses local demo data by default. To try the Node API, run `npm run server`, copy `.env.example` to `.env`, set `VITE_API_URL=/api` and restart Vite. GitHub Pages cannot run Node; production APIs would need separate hosting, authentication and appropriate CORS configuration. Never put secrets in `VITE_` variables; those values are public browser code.

Freeze status uses sessionStorage for the current tab. Other demo selections reset on reload. Fonts load from Google Fonts with system fallbacks.

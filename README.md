# ArxPool Web Portal

Next.js 14 portal featuring the ArxPool landing page, MDX docs, interactive demo, and in-memory collector API. Built for the Arcium encrypted compute ecosystem.

## What's inside

- **Landing** – hero, value prop, how-it-works overview, and mode badge (Stub / Testnet).
- **Docs** – Contentlayer compiles five MDX guides: intro, install, developer guide, architecture, security.
- **Demo** – walk through create → join → compute → verify with signature badges.
- **API** – `/api/pool/create`, `/api/join`, `/api/pool/compute`, `/api/result` backed by an in-memory store.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000` to explore the landing page and try the `/demo` experience.

> **Note**: The project resolves `@arxpool-hq/sdk` from `../arxpool-sdk`. Make sure the sibling repository is present or update the dependency to your published package.

## Environment variables

| Name | Description |
| --- | --- |
| `USE_STUB` | `true` runs the demo in deterministic stub mode, `false` targets Arcium testnet. |
| `ARXPOOL_NODE` | Arcium node RPC endpoint (required for testnet). |
| `ARXPOOL_ATTESTER_SECRET` | Local signing secret used in stub mode. |
| `ARXPOOL_ATTESTER_KEY` | Ed25519 attester key for testnet verification. |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for metadata links. |
| `NEXT_PUBLIC_USE_STUB` | Mirrors `USE_STUB` for client-side badges. |

## Scripts

- `npm run dev` – start Next.js in development mode.
- `npm run build` – build for production with Contentlayer pre-compilation.
- `npm run start` – run the production server.
- `npm run lint` – lint the project.

## Project structure

```
arxpool-web/
├─ app/                 # Landing, docs, demo, API routes
├─ components/          # Navbar, footer, hero, UI primitives
├─ content/docs/        # MDX documentation (contentlayer)
├─ lib/                 # SDK wrapper and in-memory store
├─ public/              # Logos, favicons, OG images
└─ styles/              # Tailwind globals
```

## Demo flow

1. `POST /api/pool/create` seeds an in-memory pool.
2. `POST /api/join` accepts encrypted choices and redacts them immediately.
3. `POST /api/pool/compute` calls the SDK wrapper (`stub` or `testnet`).
4. `GET /api/result` returns the signed payload that the client verifies.

## Deployment

Deploy to Vercel. Add the relevant environment variables, keeping attester secrets on the server only. Stub mode works out of the box; flip `USE_STUB` to join the Arcium testnet without code changes.

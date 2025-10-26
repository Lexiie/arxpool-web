# ArxPool Web Portal

Dark, neon-themed Next.js 14 portal that unifies the ArxPool landing page, MDX documentation, interactive demo, and stubbed collector backend.

## Features

- **Landing** with hero, stats, features, and flow diagram.
- **Docs** sourced from MDX via Contentlayer.
- **Demo** UI showing create → join → compute → verify loop.
- **Collector API** implemented with in-memory persistence.
- **Design system** powered by TailwindCSS, shadcn-style buttons, and Cabin Condensed stack.

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000` and explore the landing page, docs, and `/demo` playground.

## Environment variables

| Name | Description |
| --- | --- |
| `ARXPOOL_ATTESTER_SECRET` | Local signing secret for stubbed attester metadata. |
| `ARCIUM_API_KEY` | Optional key when calling the real Arcium network. |
| `ARXPOOL_MXE_ID` | Optional MXE identifier for live compute. |
| `USE_STUB` | `true` keeps computation deterministic for demos. |
| `NEXT_PUBLIC_BASE_URL` | Hostname used by fetch calls and metadata. |

## Scripts

- `pnpm dev` – Next.js dev mode with automatic Contentlayer rebuilds.
- `pnpm build` – Generates docs then compiles the production bundle.
- `pnpm start` – Runs the production server (after build).
- `pnpm lint` – Lints the project.

## Architecture

```
arxpool-web/
├─ app/                 # Landing, docs, demo, API routes
├─ components/          # Reusable UI primitives (hero, sections, cards)
├─ content/docs/        # MDX files compiled by Contentlayer
├─ lib/                 # SDK wrapper, crypto stub, in-memory DB
├─ public/              # Logo + OG image assets
├─ styles/              # Tailwind globals
└─ mdx-components.tsx   # MDX typography overrides
```

## Testing plan

- API unit coverage via calling `/api/pool/create|join|compute|result` in isolation with stub data.
- Integration: create pool → join twice → compute → verify (mirrored in the `/demo` UI logic).
- Visual smoke test: open `/`, `/docs`, `/docs/intro`, `/demo` to ensure Tailwind styles load.

## Deployment

Deploy to Vercel directly. The repo includes `next.config.mjs`, `.env.example`, and Contentlayer config so the pipeline builds without extra tweaks. Ensure environment secrets only live in the backend scope and keep telemetry disabled as mandated by the PRD guardrails.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is
SortMedication is an application for small to medium-sized pharmacies in busy urban areas. These pharmacies constantly move a high volume of medication in and out, but unlike larger chains such as CVS or Walmart, they can't handle that workload with the same resources. SortMedication addresses that problem.

## Specs
The numbered build prompts live in `prd.md`. Read it before working. Bracketed items such as `[name]` are placeholders still to be filled in.

## Commands
Run from this folder: `npm run dev`, `npm run build`, `npm run lint`. There is no test setup.

## Stack
- Next.js 16 (App Router, TypeScript, Tailwind 4). It differs from older versions: middleware is `proxy.ts`, and Cache Components is on, so runtime data such as `cookies()` must sit inside `<Suspense>`. Read `node_modules/next/dist/docs/` before writing Next code (`AGENTS.md` says the same; `next dev` regenerates that file).
- Supabase Auth (email + password, Google) via `@supabase/ssr`. Clients are in `lib/supabase/` (`client.ts`, `server.ts`). `proxy.ts` refreshes the session and redirects signed-out users to `/login`. Google must be enabled in the Supabase dashboard.
- Supabase database: tables `medications`, `stock_levels`, `stock_movements`, with row level security and per-user rows. The schema is in `supabase/schema.sql` and has already been run in Supabase. The home page (`app/medications.tsx`, server actions in `app/actions.ts`) lists stock with low/surplus flags and records deliveries and dispenses.
- Env vars in `.env.local` (git-ignored): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Planned, not yet installed: Claude API (stock prediction), Google Gemini, Vercel Analytics. See `prd.md`. When Vercel Analytics is added, list it here.

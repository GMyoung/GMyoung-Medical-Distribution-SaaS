# Plya Med Operating System Frontend V1

High-fidelity frontend prototype for a rep-driven medical product distribution SaaS.

## Scope

- Admin, rep, provider, and public storefront surfaces
- Linear-inspired dark SaaS visual system
- Responsive sidebar, mobile bottom navigation, and mobile card tables
- Dashboard metrics, order operations, customers, commission ledger, learning center, messages
- Rep My Business profile with public URLs, payout status, and agreements
- Provider dashboard, telehealth visit room, notes, product selector, payment panel
- Create order modal with product catalog, category rail, and cart state
- Public rep storefront with attributed cart flow

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind-like custom CSS tokens
- lucide-react icons

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4174/` when running with:

```bash
npm run dev -- --port 4174
```

## Verification

```bash
npm run build
```

The current V1 is mock-data driven. It is intentionally frontend-only so the product model and UX can be reviewed before backend, auth, RBAC, payments, and persistence are implemented.

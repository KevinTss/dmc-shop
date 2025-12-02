# Repository Guidelines

## Project Structure & Modules
- `app/` holds Hydrogen app code: `routes/` for React Router loaders/actions/views, `components/` for shared UI, `lib/` for helpers, `graphql/` for queries, `styles/` and `assets/` for static client assets.
- `public/` contains static files served as-is.
- Config roots: `vite.config.js`, `react-router.config.js`, `eslint.config.js`, `jsconfig.json`.
- Generated artifacts: `.react-router/` (typegen) and `.cache/` are ignored; regenerate via `npm run codegen`.
- Environment sample: `.env.example` mirrors the mock Hydrogen shop values used by the scaffold.

## Build, Test, and Development Commands
- `npm run dev`: Start Hydrogen dev server with React Router and codegen.
- `npm run build`: Production build for Oxygen/worker runtime.
- `npm run preview`: Serve the built app locally.
- `npm run lint`: Run ESLint with the project rules.
- `npm run codegen`: Regenerate route types and GraphQL types when routes or schema change.

## Coding Style & Naming
- JavaScript/TypeScript, ES modules, 2-space indentation, and trailing commas via Prettier (`@shopify/prettier-config`).
- Keep components and loaders focused; colocate route data logic under `app/routes/` and shared UI under `app/components/`.
- Prefer named exports for shared modules; default exports only for route components/loaders as needed by React Router.

## Testing Guidelines
- No automated tests are present; add route-level or unit tests alongside code when introducing critical logic.
- When adding tests, mirror file structure (e.g., `app/lib/foo.test.(js|ts)`), and document the command to run them.
- For manual checks, run `npm run lint` and exercise affected routes via `npm run dev`.

## Commit & Pull Request Guidelines
- Commits: short, imperative subjects (e.g., `Add cart drawer analytics`); group related changes.
- Pull requests: include a concise summary, links to issues/task IDs, what was tested (commands or manual flows), and screenshots/GIFs for UI changes.
- Keep generated output (e.g., `.react-router/`) out of commits; rely on `npm run codegen` to recreate locally.

## Security & Configuration
- Do not commit real secrets; copy `.env.example` to `.env` and override locally. Required keys include `SESSION_SECRET`, `PUBLIC_STORE_DOMAIN`, and storefront tokens.
- Use the mock Hydrogen shop values when bootstrapping locally; swap to real store credentials only in private env files.

## Component Structure
- One React component per file; export components from their own files and import into routes/layouts. Example: keep `AboutSection` in `app/components/AboutSection.jsx` and reference it from `app/routes/_index.jsx`.

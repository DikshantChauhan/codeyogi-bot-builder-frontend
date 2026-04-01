# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (Vite, port 5174)
- **Build**: `npm run build` (runs `tsc -b && vite build`)
- **Lint**: `npm run lint` (ESLint, zero warnings enforced)
- **Preview**: `npm run preview`
- **No test runner is configured.**

## Architecture

WhatsApp bot builder frontend — a visual flow editor for creating campaign automation flows. Built with React 18 + TypeScript + Vite.

### State Management

Redux Toolkit with Redux-Saga (no thunks). Store slices: `campaign`, `flow`, `UI`, `history`, `location`, `meta`. Sagas handle all async side effects. Typed hooks: `useAppDispatch` and `useAppSelector` from `src/store/store.ts`.

### Flow Editor

Uses `@xyflow/react` (ReactFlow v12). The flow canvas lives in `src/pages/Flow.Page.tsx` with core logic in `src/hooks/useFlowPageData.ts`. Flows are cached in localStorage with `flow_` prefix keys.

### Node System

Every node type follows this structure under `src/nodes/customs/{nodeType}/`:
- `type.tsx` — node key constant + TypeScript type definition
- `Node.tsx` — visual component (React.memo)
- `Form.tsx` — edit form component (React.memo)

All node types are registered in `src/models/Node.model.ts` via `nodesRegistry`, which maps each node key to its component, form, color, and icon. The `AppNode` discriminated union in the same file defines all possible node types.

To add a new node type: create the three files, add the type to `AppNode`, and register in `nodesRegistry`.

### API Base URL

Single `VITE_API_BASE_URL` with two route prefixes (`src/api/api.ts`):
- `/api/...` — campaign/meta CRUD
- `/admin/...` — flow management and media upload

All HTTP calls use axios directly (no wrapper/interceptor layer).

### Routing

React Router v7 with parameterized route helpers in `src/constants.ts`:
- `/` — campaigns list
- `/campaign/:campaign_id` — campaign detail
- `/campaign/:campaign_id/flow/:flow_id` — flow editor
- `/nudges` — nudges list
- `/nudge/:nudge_id` — nudge flow editor

`FlowPage` is shared between campaign flows (type `level`) and nudge flows (type `nudge`).

### Media Upload

WhatsApp media (image/video/document/audio) uploads go to S3 via `@aws-sdk/client-s3` (`src/services/S3Service.ts`), then the S3 URL is registered with the backend via `uploadWhatsAppMediaAPI`.

### Forms

Formik + Yup for form state and validation throughout node edit forms.

### Language Support

Nodes support multi-language content (English, Hindi, Hinglish) stored in `language_json` fields. The supported languages list is in `src/constants.ts` as `ALL_SUPPORTED_LANGUAGES`.

## Styling

Tailwind CSS v3 with a dark theme. Custom color tokens defined in `tailwind.config.js`: `background`, `primary` (blue), `secondary` (purple), `tertiary` (teal).

## Environment Variables

Required in `.env.development` (see `.env.example`):
- `VITE_API_BASE_URL` — API base URL (routes via `/api/...` and `/admin/...` prefixes)
- `VITE_API_S3_BUCKET_NAME`, `VITE_AWS_ACCESS_KEY_ID`, `VITE_AWS_SECRET_ACCESS_KEY` — S3 media upload

## Code Formatting

Prettier: 150 char width, single quotes, trailing commas (`es5`). Config in `.prettierrc`.

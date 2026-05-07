# Proxy Portfolio — Full Stack Developer Internship

> This is a proxy portfolio — generalized rebuilds of features I developed during my internship. All code is written from scratch with sanitized branding.

## Overview

Three standalone feature showcases built as a pnpm monorepo, demonstrating real-world internship work across content platforms, marketing UIs, and OAuth microservices.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript (strict), Vite, Tailwind CSS, React Router v6 |
| Backend | Node.js, Express, TypeScript, cookie-parser, cors |
| Tooling | pnpm workspaces, concurrently, ESLint |

## Setup

```bash
# Install all dependencies
pnpm install

# Start both frontend and backend in dev mode
pnpm dev
```

Frontend runs at `http://localhost:5173`  
Backend runs at `http://localhost:3001`

## Routes

| Route | Feature |
|---|---|
| `/` | Redirect to `/portfolio` |
| `/portfolio` | About This Portfolio |
| `/wellness` | Feature 1: Aether Wellness |
| `/edtech` | Feature 2: StudySpark EdTech |
| `/oauth` | Feature 3: SecureAuth Gateway |

## Feature Map

### `/wellness` — Aether Wellness Content Platform
Demonstrates: article grid migration, split-view/sidebar news layouts, infinite CSS marquee animations, CSS mask-based brand color unification, CMS rich-text editor chrome.

### `/edtech` — StudySpark EdTech Marketing UI
Demonstrates: promo marquee banners, dual-theme CTA sections, support dialog with guest ticket submission, debugging stacking context bugs, resolving white-screen import errors.

### `/oauth` — SecureAuth Gateway OAuth Microservice
Demonstrates: Authorization Code Grant flow (frontend + backend), environment variable isolation, `URLSearchParams` serialization for token exchange, `.trim()` sanitization to prevent whitespace-corrupted env var 401 errors, decoded JWT token display.

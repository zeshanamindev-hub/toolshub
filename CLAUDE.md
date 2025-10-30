# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tools Hub is a Next.js 15 application providing 50+ free online text manipulation and utility tools. All processing happens client-side for privacy, with no backend required. The app is optimized for SEO, Google AdSense, and fast performance.

## Development Commands

```bash
# Development server with Turbopack (faster HMR)
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture & Code Organization

### App Structure (Next.js 15 App Router)

The project uses Next.js 15 App Router with the following structure:

- **`src/app/`** - All pages and routes
  - **`layout.tsx`** - Root layout with Google Analytics, AdSense scripts, Header/Footer, and JSON-LD structured data
  - **`page.tsx`** - Homepage with hero section, featured tools, categories, and search
  - **`tools/[tool-name]/`** - Individual tool pages, each with:
    - `page.tsx` - Server component exporting metadata and rendering client component
    - `client.tsx` - Client component with tool logic and UI (always "use client")
  - **`categories/`** - Category landing pages organizing tools by type
  - **`sitemap.ts`** - Auto-generated XML sitemap for SEO
  - **`robots.ts`** - Robot crawling directives

### Component Architecture

- **`src/components/`**
  - **`layout/`** - Header and Footer with navigation, search, and mega dropdowns
  - **`ui/`** - shadcn/ui components (Button, Input, Textarea, Card, DropdownMenu)
  - **`seo/`** - SEO utilities and structured data generators
  - **`ads/`** - Google AdSense components

### Centralized Constants (`src/lib/constants.ts`)

**Critical:** All navigation links, tool metadata, and categories are centralized in `src/lib/constants.ts`. This single source of truth contains:

- `SITE_CONFIG` - Site name, description, URL, and tool count
- `CATEGORIES` - All category definitions with IDs, names, hrefs, descriptions
- `NAVIGATION_LINKS` - Main nav and footer links organized by section
- `POPULAR_TOOLS` - Featured tools for header dropdown and homepage
- `ALL_TOOLS` - Complete array of all tools with name, description, icon, href, color

**When adding a new tool:**
1. Add tool metadata to `ALL_TOOLS` array in constants.ts
2. Create tool directory under `src/app/tools/[tool-name]/`
3. Update tool count in `SITE_CONFIG`
4. Add to appropriate category in `NAVIGATION_LINKS.footer`
5. Update sitemap.ts with new tool URL

### Tool Development Pattern

Each tool follows this structure:

```typescript
// src/app/tools/[tool-name]/page.tsx (Server Component)
import { generateToolMetadata } from "@/components/seo/tool-seo"
import ToolClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Tool Name",
  toolDescription: "Detailed description for SEO",
  category: "Category Name",
  keywords: ["keyword1", "keyword2"],
  toolPath: "/tools/tool-name"
})

export default function ToolPage() {
  return <ToolClient />
}

// src/app/tools/[tool-name]/client.tsx (Client Component)
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ToolClient() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  // Tool logic here - all processing client-side
  const processInput = () => {
    // Transform input to output
  }

  return (
    // Tool UI
  )
}
```

**Key principles:**
- Server component handles metadata/SEO
- Client component handles interactivity
- All data processing happens in browser (privacy-first)
- Use shadcn/ui components for consistency

### Search Functionality

The header (`src/components/layout/header.tsx`) includes:
- Real-time search filtering through `ALL_TOOLS` array
- Keyboard shortcut: `Ctrl+/` to focus search
- Instant search results dropdown (max 12 results)
- Mobile-optimized search experience

### SEO & Performance

- **Structured Data**: JSON-LD for Organization, WebSite, WebApplication
- **Meta Tags**: Comprehensive OpenGraph and Twitter cards on all pages
- **Sitemap**: Auto-generated from tool definitions
- **Security Headers**: X-Frame-Options, CSP, X-Content-Type-Options in next.config.ts
- **Performance**: Turbopack for dev/build, image optimization, compression enabled
- **Google Analytics**: Global site tag in root layout
- **AdSense**: Ad slots on homepage and throughout site

### Styling System

- **Tailwind CSS v4** with custom configuration
- **Design tokens**: Consistent color scheme (blue/indigo/purple gradients)
- **Animation classes**: Defined in globals.css (fade-in-up, float, spin-slow, etc.)
- **Responsive**: Mobile-first approach with breakpoints
- **Dark mode**: Prepared with dark: variants throughout

### Path Aliases

TypeScript path alias configured:
- `@/*` maps to `./src/*`

Use `@/components/*`, `@/lib/*`, `@/app/*` in imports.

## Common Development Tasks

### Adding a New Tool

1. Add tool to `ALL_TOOLS` in `src/lib/constants.ts`:
```typescript
{
  name: "Tool Name",
  description: "Brief description",
  icon: IconComponent, // from lucide-react
  href: "/tools/tool-name",
  color: "text-blue-600",
}
```

2. Create tool directory: `src/app/tools/tool-name/`

3. Create `page.tsx` (server component with metadata)

4. Create `client.tsx` (client component with tool logic)

5. Add to sitemap: `src/app/sitemap.ts`

6. Update `SITE_CONFIG.toolCount` in constants.ts

7. Add to appropriate footer section in `NAVIGATION_LINKS.footer`

### Modifying Navigation

Edit `src/lib/constants.ts` - changes propagate automatically to:
- Header navigation and dropdowns
- Footer links
- Search functionality
- Homepage tool cards

### Adding Google AdSense Placements

Use `<GoogleAdSlot />` component from `src/components/ads/google-ad-slot.tsx` with slot prop.

## Tech Stack Details

- **Framework**: Next.js 15.5.4 (App Router, React 19)
- **Language**: TypeScript 5 (strict mode enabled)
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Build Tool**: Turbopack (next dev --turbopack)
- **Code Quality**: ESLint with Next.js config

## Important Notes

- **Client-side Processing**: All tool logic MUST run in browser - never send user data to server
- **Component Split**: Always separate Server Components (metadata) from Client Components (interactivity)
- **Constants First**: Check `src/lib/constants.ts` before adding navigation or tool metadata
- **SEO Critical**: Every tool needs proper metadata via `generateToolMetadata()`
- **Mobile Experience**: Test all tools on mobile - large portion of traffic is mobile users
- **Performance**: Keep bundle sizes small - tools should load instantly

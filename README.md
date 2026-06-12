# University Hall HKU — Premium Frontend Website

A production-grade, fully-responsive React + TypeScript website for University Hall, The University of Hong Kong. Built with Vite, Tailwind CSS, and Framer Motion.

## Features

- **7 Complete Pages**: Homepage, About, Facilities, Events, Contact, People, Apply
- **Dark Academia Aesthetic**: Heritage-inspired design with gold and emerald accents
- **Fully Responsive**: Mobile-first design with breakpoints for XS, SM, MD, LG, XL
- **Elegant Animations**: Framer Motion with `prefers-reduced-motion` support
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance Optimized**: Code splitting, lazy-loaded images
- **Contact Form Backend**: WordPress plugin stores submissions with admin panel

## Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
git clone <repo-url>
cd universityhall.dev
npm install
npm run dev
```

The site opens at `http://localhost:3000` with HMR enabled.

## Build for Production

```bash
npm run build
npm run preview
```

Build output is in `dist/`.

## Project Structure

```
src/
├── components/
│   ├── common/        # Base UI components (Button, Card, Badge, etc.)
│   ├── layout/        # Header, Footer, Layout wrappers
│   └── animations/    # Framer Motion animation components
├── pages/             # Page components
├── hooks/             # Custom hooks
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
├── constants/         # Content and configuration
├── App.tsx            # Main app with routing
├── main.tsx           # Entry point
└── index.css          # Global styles with Tailwind

vite.config.ts              # Vite configuration
tailwind.config.js          # Tailwind CSS configuration
uhall-form-handler.php      # WordPress plugin — stores form submissions
uhall-react-app.php         # WordPress mu-plugin — serves the React SPA
vercel.json                 # Vercel deployment config
```

## Deployment

### Option 1: Vercel (Static SPA)

#### Vercel Dashboard (Recommended)

1. Push code to GitHub/GitLab
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository (Vite auto-detected)
5. Click "Deploy"

#### Vercel CLI

```bash
npm install -g vercel
vercel
vercel --prod
```

The `vercel.json` configures build command, output directory, and SPA rewrites.

### Option 2: WordPress (Self-hosted WordPress)

The project ships as two separate plugins:

| Plugin | Type | Purpose |
|---|---|---|
| `uhall-react-app.php` | **mu-plugin** (Must-Use) | Intercepts front-end requests, serves the React SPA build, and routes all non-WP paths to `index.html` for client-side routing |
| `uhall-form-handler.php` | **Standard plugin** | Registers a REST API endpoint for form submissions, stores data in a custom DB table, and provides an admin panel with CSV export |

#### Setup

1. **Build the frontend**:
   ```bash
   $env:VITE_BUILD_TARGET="wordpress"; npm run build
   ```

2. **Deploy the built assets** to your server at `wp-content/uhall-react-app/`:
   ```
   wp-content/uhall-react-app/
   ├── assets/
   ├── index.html
   └── ...
   ```

3. **Deploy the mu-plugin** — copy `uhall-react-app.php` to your server:
   ```
   wp-content/mu-plugins/uhall-react-app.php
   ```

   Create the `mu-plugins` folder if it doesn't exist. WordPress auto-detects mu-plugins — no activation needed.

4. **Deploy the form handler plugin** — create a folder and copy `uhall-form-handler.php`:
   ```
   wp-content/plugins/uhall-form-handler/uhall-form-handler.php
   ```

5. **Activate the form handler** — go to **WordPress Admin → Plugins** and activate **UHall Form Handler**.

The SPA is now live at your WordPress domain.

#### WordPress Admin

Once deployed, visit **WordPress Admin → Interview Submissions** to view, delete, or download form submissions as CSV.

#### Updating

```bash
# Rebuild frontend
npm run build

# Sync dist/ to server
rsync -avz dist/ user@host:/path/to/wp-content/uhall-react-app/
```

#### How It Works

- `uhall-react-app.php` (mu-plugin) intercepts all front-end requests and serves the React SPA's `index.html` for client-side routing. Static assets (`js`, `css`, images) are served directly from the `wp-content/uhall-react-app/` directory with correct MIME types and long-lived cache headers. WordPress admin (`/wp-admin`) and REST API (`/wp-json/`) requests pass through untouched.
- `uhall-form-handler.php` (standard plugin) exposes a `POST /wp-json/uhall/v1/submissions` endpoint. The React contact form posts to this endpoint; submissions are stored in a custom `wp_uhall_submissions` table. An admin menu page under **Interview Submissions** lets you view, batch-delete, and download submissions as CSV. Email notifications are sent to `uhall@connect.hku.hk` on each submission.

## Design System

### Color Palette
- **Background**: #0B2018 (Deep Forest)
- **Surface**: #1A4231 (Rich Green)
- **Gold**: #C9A84C (Warm Accent)
- **Gold Light**: #E8C96E (Bright Accent)
- **Emerald**: #52B788 (Fresh Accent)
- **Text Primary**: #F5F0E8 (Cream)
- **Text Muted**: #C8C0B0 (Gray)

### Typography
- **Headings**: Playfair Display
- **Body**: Cormorant Garamond
- **Metadata**: JetBrains Mono

### Components
- Buttons: Primary (gold), Secondary (outline), Ghost (text)
- Cards: Base card with shadow and hover elevation
- Badges: Inline status indicators (gold, emerald, muted)

## Pages Overview

### Homepage (`/`)
Hero with parallax, statistics bar, feature cards, 6-milestone timeline, 6-facility gallery, testimonials carousel, events preview, CTA.

### About (`/about`)
Heritage storytelling, 6-point timeline, 4-pillar philosophy, leadership grid, mission statement.

### Facilities (`/facilities`)
Category tab filtering (Dining, Academic, Recreation, Accommodation, Community), detailed facility cards, gallery grid.

### Events (`/events`)
Featured event banner, category filtering, upcoming events with RSVP, past events archive.

### Contact (`/contact`)
Contact form with validation (posts to WordPress form handler REST API), office info, hours, social links, map placeholder.

### People (`/people`)
Leadership grid, role filtering (Warden, Fellows, Staff), person cards with bio.

### Apply (`/apply`)
4-step application process, multi-step form, 6-item FAQ accordion, requirements checklist.

## Image Replacement Guide

All images use structured placeholders with `data-image-id` attributes:

```typescript
imageId: 'hero_castle'      // Hero background
imageId: 'dining_hall'      // Dining facility
imageId: 'library'          // Library facility
imageId: 'recreation'       // Recreation facilities
imageId: 'accommodation'    // Residential rooms
imageId: 'common_rooms'     // Common areas
imageId: 'community_center' // Community center
imageId: 'person_warden'    // People images
```

Replace `ImagePlaceholder` with actual `<img>` tags and update `src` to your image URLs. Maintain aspect ratios: 16:9 (hero), 4:3 (facility cards), 1:1 (people).

## Responsive Breakpoints

```
XS: < 480px    (Mobile)
SM: 480–767px  (Small tablet)
MD: 768–1023px (Tablet)
LG: 1024–1279px (Desktop)
XL: ≥ 1280px   (Large desktop)
```

## Environment Variables

```env
VITE_API_URL=https://example.com/wp-json/uhall/v1
VITE_FORM_ENDPOINT=/submissions
```

For WordPress mu-plugin deployment, set `VITE_API_URL` to your WordPress site's REST API base URL (e.g., `https://yoursite.com/wp-json/uhall/v1`).

## Performance Targets

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 90+
- Core Web Vitals: Good

## Testing & Quality

```bash
npx tsc --noEmit        # Type checking
npm run build           # Build check
```

## Content Management

All static content is in `src/constants/content.ts`:
- Timeline events, Facilities data, Events list, People/team members
- Testimonials, FAQ items, Social links, Office information

## License

© 2026 University Hall, The University of Hong Kong. All rights reserved.

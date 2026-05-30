# University Hall HKU — Premium Frontend Website

A production-grade, fully-responsive React + TypeScript website for University Hall, The University of Hong Kong. Built with Vite, Tailwind CSS, and Framer Motion for a premium editorial experience.

## ✨ Features

- **7 Complete Pages**: Homepage, About, Facilities, Events, Contact, People, Apply
- **Dark Academia Aesthetic**: Heritage-inspired premium design with gold and emerald accents
- **Fully Responsive**: Mobile-first design with breakpoints for XS, SM, MD, LG, XL devices
- **Elegant Animations**: Framer Motion animations respecting `prefers-reduced-motion`
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML, ARIA labels, keyboard navigation
- **Performance Optimized**: Code splitting, lazy-loaded images, Lighthouse-optimized
- **Production Ready**: Structured for easy deployment to Vercel or any modern hosting

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd universityhall.dev

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will open at `http://localhost:3000` with hot module replacement (HMR) enabled.

## 📦 Build for Production

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

Build output is in the `dist/` directory.

## 🔧 Project Structure

```
src/
├── components/
│   ├── common/           # Base UI components (Button, Card, Badge, etc.)
│   ├── layout/           # Header, Footer, Layout wrappers
│   └── animations/       # Framer Motion animation components
├── pages/                # Page components (Homepage, About, Facilities, etc.)
├── hooks/                # Custom hooks (useScrollTrigger, useReducedMotion, etc.)
├── utils/                # Utility functions (animation variants)
├── types/                # TypeScript type definitions
├── constants/            # Content and configuration constants
├── App.tsx               # Main app with routing
├── main.tsx              # Entry point
└── index.css             # Global styles with Tailwind

vite.config.ts            # Vite configuration
tailwind.config.js        # Tailwind CSS configuration
tsconfig.json             # TypeScript configuration
postcss.config.cjs        # PostCSS configuration
```

## 🎨 Design System

### Color Palette
- **Background**: #0B2018 (Deep Forest)
- **Surface**: #1A4231 (Rich Green)
- **Gold**: #C9A84C (Warm Accent)
- **Gold Light**: #E8C96E (Bright Accent)
- **Emerald**: #52B788 (Fresh Accent)
- **Text Primary**: #F5F0E8 (Cream)
- **Text Muted**: #C8C0B0 (Gray)

### Typography
- **Headings**: Playfair Display (h1-h6 sizes)
- **Body**: Cormorant Garamond (serif, 16-18px)
- **Metadata**: JetBrains Mono (12px)

### Spacing System
- sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px
- Section padding: 80-120px vertical

### Components
- Buttons: Primary (gold), Secondary (outline), Ghost (text)
- Cards: Base card with shadow and hover elevation
- Badges: Inline status indicators (gold, emerald, muted)

## 🔗 Pages Overview

### Homepage (`/`)
- Hero with parallax effect
- Statistics bar with animations
- Feature cards section
- 6-milestone timeline
- 6-facility gallery grid
- 3 testimonials carousel
- Events preview
- CTA section

### About (`/about`)
- Heritage storytelling
- 6-point timeline with year-based cards
- 4-pillar philosophy section
- Leadership team grid
- Mission statement

### Facilities (`/facilities`)
- Category tab filtering (Dining, Academic, Recreation, Accommodation, Community)
- Detailed facility cards with features
- Complete facility gallery grid
- Image placeholders for easy replacement

### Events (`/events`)
- Featured event banner
- Category filtering
- Upcoming events list with RSVP
- Past events expandable archive
- Event details with date, location, category

### Contact (`/contact`)
- Contact form with validation
- Office information section
- Hours of operation
- Social media links
- Map placeholder section
- Success message on submission

### People (`/people`)
- Leadership grid (8+ people)
- Role filtering (Warden, Fellows, Staff)
- Person cards with bio, title, role
- Hover interaction revealing profile link

### Apply (`/apply`)
- 4-step application process timeline
- Multi-step form with progress
- Personal info, academic background, personal statement
- Review & submit page
- 6-item FAQ accordion
- Requirements checklist

## 🖼️ Image Replacement Guide

All images use structured placeholders with `data-image-id` attributes for easy replacement:

```typescript
// Find all placeholders in the codebase
imageId: 'hero_castle'     // Hero background image
imageId: 'dining_hall'     // Dining facility
imageId: 'library'         // Library facility
imageId: 'recreation'      // Recreation facilities
imageId: 'accommodation'   // Residential rooms
imageId: 'common_rooms'    // Common areas
imageId: 'community_center'// Community center
imageId: 'person_warden'   // People images
```

To replace images:
1. Replace `ImagePlaceholder` component with actual `<img>` tags
2. Update `src` to point to your image URLs
3. Maintain aspect ratios: 16:9 (hero), 4:3 (facility cards), 1:1 (people)
4. Use responsive `srcSet` for optimized delivery

Example:
```tsx
<img 
  src="/images/hero-castle.jpg" 
  alt="University Hall entrance"
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

## ♿ Accessibility Features

- ✓ Semantic HTML (main, section, article, nav, footer)
- ✓ ARIA labels on interactive elements
- ✓ Keyboard navigation (Tab, Enter, Escape)
- ✓ Focus states on all interactive elements
- ✓ Color contrast: 4.5:1 minimum for text
- ✓ Form labels associated with inputs
- ✓ Skip to main content link
- ✓ `prefers-reduced-motion` support

## 🎬 Animation System

### Framer Motion Components
- `<FadeInUp>` - Scroll-triggered fade + slide up
- `<StaggerContainer>` - Parent with staggered children
- `<ScaleOnHover>` - Subtle hover scale effect
- `<ParallexSection>` - Parallax scrolling
- `<TimelineNode>` - Animated timeline item
- `<GalleryGrid>` - Staggered gallery reveal

### Custom Hooks
- `useScrollTrigger()` - Detect element visibility
- `useReducedMotion()` - Respect user motion preferences
- `useMobileMenu()` - Mobile menu state management

All animations respect `prefers-reduced-motion: reduce` media query.

## 📱 Responsive Breakpoints

```
XS: < 480px    (Mobile)
SM: 480–767px  (Small tablet)
MD: 768–1023px (Tablet)
LG: 1024–1279px (Desktop)
XL: ≥ 1280px   (Large desktop)
```

Mobile-first approach: Design for mobile, then enhance for larger screens.

## 🚀 Deployment to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. Push code to GitHub/GitLab
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Leave default settings (Vite is auto-detected)
6. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Vercel Configuration

Create `vercel.json` for custom settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "env": {}
}
```

## 🔒 Environment Variables

If needed for future integrations (e.g., contact form backend):

```env
VITE_API_URL=https://api.example.com
VITE_FORM_ENDPOINT=/api/contact
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 📊 Performance Targets

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 90+
- Core Web Vitals: Good

Optimization techniques:
- Code splitting via React.lazy()
- Image lazy loading
- CSS purging with Tailwind
- Optimized animations (transform + opacity only)

## 🧪 Testing & Quality

### Type Checking
```bash
npx tsc --noEmit
```

### Build Check
```bash
npm run build
```

## 📝 Content Management

All static content is centralized in `src/constants/content.ts`:
- Timeline events
- Facilities data
- Events list
- People/team members
- Testimonials
- FAQ items
- Social links
- Office information

Edit content directly in this file.

## 🤝 Contributing

When making changes:
1. Follow existing component patterns
2. Maintain TypeScript strict mode
3. Use Tailwind utility classes (no custom CSS)
4. Test responsive design at all breakpoints
5. Ensure animations respect `prefers-reduced-motion`
6. Check accessibility with keyboard navigation

## 📄 License

© 2024 University Hall, The University of Hong Kong. All rights reserved.

## 🆘 Support

For issues or questions about deployment:
- Check Vercel documentation: https://vercel.com/docs
- Review Vite docs: https://vitejs.dev
- TypeScript docs: https://www.typescriptlang.org

## 🎯 Next Steps

1. Replace image placeholders with actual imagery
2. Integrate contact form with backend service
3. Add events feed integration
4. Implement user authentication (if needed)
5. Set up analytics (Google Analytics, Hotjar, etc.)
6. Add CMS integration (Contentful, Sanity, etc.)
7. Deploy to Vercel and monitor performance

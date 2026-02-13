# Saren.ai - Portfolio Website

A modern, interactive portfolio website for Saren Sakurai, Fractional CMO & AI Operations Consultant.

## 🚀 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS with Fire Horse 2026 design system
- **Animation:** Framer Motion
- **Content:** Markdown files for blog posts
- **Deployment:** Optimized for Vercel
- **Bento Grids:** Custom interactive grids for framework visualization

## 🎨 Design System: Fire Horse 2026

### Colors
- **Ember Red:** `#E63946` - CTAs, key metrics, bold accents
- **Charcoal Black:** `#1D3557` - Backgrounds, primary text
- **Ash White:** `#F1FAEE` - Page backgrounds, card fills
- **Electric Blue:** `#457B9D` - Interactive elements, hover states
- **Copper:** `#A8763E` - Borders, subtle highlights
- **Slate Gray:** `#6C757D` - Secondary text, labels

### Typography
- **Headings:** Sora (bold weights)
- **Body:** Sora
- **Monospace:** JetBrains Mono (for metrics/data)

## 📁 Project Structure

\`\`\`
saren-ai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── about/             # About page
│   │   ├── thinking/          # Micro-blog
│   │   ├── contact/           # Contact form
│   │   └── portfolio/         # Case study pages
│   │       ├── roi-simulator/
│   │       ├── sovereign-personas/
│   │       ├── b2b-marketing-framework/ # 7-Layer Framework
│   │       ├── 10-touch-sales-play/
│   │       └── 120-day-content-journey/
│   ├── components/            # React components
│   │   ├── layout/           # Header, Footer, Nav
│   │   ├── portfolio/        # Portfolio grid and cards
│   │   ├── golden-dashboard/ # Interactive dashboard (ROI Simulator)
│   │   └── ui/               # Shared UI components
│   ├── content/              # Markdown content
│   │   └── thinking/         # Blog posts
│   └── lib/                  # Utility functions
└── public/                   # Static assets
\`\`\`

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
cd saren-ai

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Building for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## 🔧 Configuration

### Environment Variables

Create a \`.env.local\` file for local development:

\`\`\`env
# Site URL (used for SEO and sitemap)
SITE_URL=https://saren.ai

# HubSpot Integration (TODO: Add when available)
# HUBSPOT_PORTAL_ID=your-portal-id
# HUBSPOT_FORM_ID=your-form-id
\`\`\`

### HubSpot Integration

The contact form is currently set up with placeholder functionality. To integrate with HubSpot:

1. Get your HubSpot Portal ID and Form ID
2. Update \`src/app/contact/page.tsx\` with actual API calls
3. Add live chat widget code to the layout

## 📝 Adding Blog Posts

Add new posts to \`src/content/thinking/\` as Markdown files:

\`\`\`markdown
---
title: "Your Post Title"
date: "2026-02-03"
excerpt: "A brief description of the post."
---

Your post content here...
\`\`\`

Posts are automatically sorted by date (newest first).

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment

\`\`\`bash
npm run build
# Deploy the .next folder to your hosting provider
\`\`\`

## 📊 Analytics

The site is configured for Vercel Analytics. Additional analytics can be added:

1. **Google Analytics 4:** Add tracking code to layout
2. **Plausible:** Add script tag for privacy-focused analytics
3. **Custom events:** Use the analytics utilities in \`src/lib/\`

## 🔒 Security Headers

The following security headers are configured:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 📋 TODO

- [ ] Add actual HubSpot integration (Portal ID, Form ID)
- [ ] Add HubSpot live chat widget
- [ ] Update LinkedIn profile URL
- [ ] Add personal interest links (Comic Geeks, Discogs, Letterboxd)
- [ ] Add portfolio images/screenshots
- [ ] Configure Google Analytics or Plausible
- [ ] Add OG images for social sharing

## 📄 License

© 2026 Saren Sakurai. All rights reserved.

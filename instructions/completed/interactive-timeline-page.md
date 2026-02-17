# Interactive Timeline Component Specification

Create a new portfolio page at `/portfolio/psylocke-timeline` with a horizontal timeline component that grows right-to-left, tracking the publication history of Psylocke/Betsy Braddock's body-swap storyline from 1989-2019.

## Page Requirements

### Layout Architecture
- **Route:** `/portfolio/psylocke-timeline`
- **Layout:** Full-width horizontal timeline scrolling right-to-left (newest → oldest)
- **Structure:** 
  - Date markers positioned above the timeline axis
  - Comic thumbnails as interactive nodes on the timeline
  - Click thumbnail → opens right-side drawer with full details
- **Container:** Use `.section` and `.container-narrow` from existing design system

### Visual Design (Fire Horse 2026)
- **Timeline axis:** 2px solid line in `--slate-gray` color
- **Date indicators:** Small labels above axis, `font-mono`, `text-slate` color
- **Thumbnails:** 
  - Small comic covers (120px height, auto width to maintain aspect ratio)
  - Border: 2px solid `--charcoal-black`
  - Hover: `.card` lift effect (translateY -4px + shadow)
  - Active state: Ember Red glow (`box-shadow: 0 0 0 2px var(--ember-red)`)
- **Drawer:**
  - Background: `bg-ash` (light mode) / `bg-offblack` (dark mode)
  - Border-left: 4px solid `--ember-red`
  - Max-width: 80vw on desktop, 100vw on mobile

## Data Structure

### TypeScript Interface
```typescript
interface ComicIssue {
  releaseDate: string;        // ISO format (YYYY-MM-DD) for sorting
  title: string;              // Full comic title (e.g., "Uncanny X-Men #251")
  plotDescription: string;    // Brief plot summary
  marvelFandomLink: string;   // URL to Marvel Fandom wiki
  thumbnailPath: string;      // Path to cover image in /public/psylocke-backstory/
}
```

### Data Source
```typescript
// /lib/psylocke-timeline.ts
export const COMIC_ISSUES: ComicIssue[] = [
  // Data provided below, sorted by releaseDate descending (newest first)
];
```

## Component Architecture

### File Structure
```
/app/portfolio/psylocke-timeline/
  page.tsx                    // Main page component ("use client")
  
/components/psylocke-timeline/
  Timeline.tsx                // Horizontal scrollable timeline container
  IssueNode.tsx               // Individual comic thumbnail with date marker
  IssueDrawer.tsx             // Right-side detail drawer panel
  
/lib/
  psylocke-timeline.ts        // COMIC_ISSUES[] data array + helper functions
```

### Component Specifications

#### `Timeline.tsx`
- Horizontal scroll container with overflow-x-scroll
- Renders axis line and maps IssueNode components
- Manages active issue state for drawer
- Implements keyboard navigation (left/right arrows)
- Smooth scroll behavior on node selection

#### `IssueNode.tsx`
- Props: `issue: ComicIssue`, `isActive: boolean`, `onClick: () => void`
- Renders:
  - Date marker above (formatted as "MMM YYYY")
  - Comic thumbnail image (or placeholder if no image)
  - Connection line to timeline axis
- Hover effects using Framer Motion `whileHover`
- Active state styling when drawer is open

#### `IssueDrawer.tsx`
- Props: `issue: ComicIssue | null`, `onClose: () => void`
- Fixed position drawer sliding from right
- Content sections:
  1. **Header:** Close button (X) with hover effect
  2. **Cover Image:** Large version (400px max-height, centered)
  3. **Metadata:** 
     - Release date (formatted: "Month Day, Year")
     - Issue title (heading style)
  4. **Plot Description:** Paragraph text with proper line-height
  5. **External Link:** 
     - "View on Marvel Fandom" button
     - Opens in new tab (`target="_blank" rel="noopener noreferrer"`)
     - Styled as `.btn-secondary`

## Interactions & Behavior

### Timeline Interactions
1. **Horizontal scroll:** Click-and-drag or mousewheel/trackpad
2. **Thumbnail click:** Opens drawer + sets issue as active
3. **Keyboard navigation:**
   - Left/Right arrows: Move between issues
   - Enter: Open drawer for focused issue
   - Escape: Close drawer

### Drawer Behavior
- **Open:** Slide-in from right (300ms spring animation)
- **Close triggers:**
  - Close button (X) click
  - Escape key press
  - Click backdrop (optional dark overlay)
- **Focus trap:** Tab key cycles through drawer content only when open

### Mobile Responsiveness
- Timeline scrolls horizontally on all screen sizes
- Drawer becomes full-screen on mobile (<768px)
- Touch gestures: swipe right to close drawer

## Animation Details (Framer Motion)

### Timeline Entrance
```typescript
// Stagger children on mount
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.05 } }
  }}
>
  {/* IssueNode components with fadeInUp variants */}
</motion.div>
```

### IssueNode Variants
```typescript
const nodeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};
```

### Drawer Animation
```typescript
const drawerVariants = {
  hidden: { x: "100%" },
  visible: { 
    x: 0, 
    transition: { type: "spring", damping: 25, stiffness: 200 }
  }
};
```

### Thumbnail Hover
```typescript
<motion.div
  whileHover={{ scale: 1.05, y: -4 }}
  transition={{ duration: 0.2 }}
>
```

## Accessibility Requirements

### Semantic HTML
- `<nav>` for timeline container with `aria-label="Psylocke comic timeline"`
- `<button>` elements for all interactive nodes
- `<article>` for drawer content

### ARIA Labels
- Timeline axis: `role="list"`
- Issue nodes: `role="listitem"` with `aria-label="{title} - {date}"`
- Drawer: `role="dialog"` with `aria-modal="true"` when open
- Close button: `aria-label="Close details"`

### Keyboard Support
- All interactive elements must be keyboard accessible
- Visible focus indicators (2px solid `--electric-blue`)
- Focus returns to clicked node when drawer closes

### Screen Readers
- Announce drawer open/close state changes
- Provide context for timeline navigation
- Include skip link for long timelines

## Design System Integration

### Colors (from globals.css)
```css
/* Primary palette */
--ember-red: #E34234
--charcoal-black: #1D3557 (light) / #FFFFFF (dark)
--ash-white: #F1FAEE (light) / #0A0E14 (dark)
--electric-blue: #457B9D (light) / #4A9FD8 (dark)
--slate-gray: #6C757D (light) / #B0B8C4 (dark)
```

### Typography
- **Headings:** `font-sora`, weight 700
- **Body text:** `font-sora`, weight 400
- **Dates/Metadata:** `font-mono` (JetBrains Mono)

### Utility Classes
```css
.section              /* 6rem padding top/bottom */
.container-narrow     /* Max-width 1200px, centered */
.card                 /* White bg, border, hover shadow */
.btn-secondary        /* Transparent, charcoal border */
.metric-label         /* Uppercase, muted, small */
```

## Reference Components
Model interactions and patterns after existing components:
- **Drawer pattern:** `/components/golden-dashboard/MetricDrawer.tsx`
- **Card hover effects:** `/components/portfolio/PortfolioCard.tsx`
- **Horizontal scroll:** Build custom (no existing reference)

## Implementation Notes

### Image Handling
- **CRITICAL:** Comic cover images are located at: `/Users/saren/Desktop/@saren.ai-cursor/saren-ai/public/psylocke-backstory/`
- In Next.js components, reference images as: `/psylocke-backstory/[filename]`
- Use Next.js `<Image>` component with proper sizing
- Provide fallback placeholder if image missing
- Optimize images: WebP format, max 800px width

### Performance Considerations
- Lazy load drawer content (only render when open)
- Virtualize timeline if issue count exceeds 50
- Use `React.memo` for IssueNode components
- Implement intersection observer for entrance animations

### Dark Mode
- All colors must use CSS variables for theme switching
- Test contrast ratios (WCAG AAA compliance)
- Drawer backdrop: `rgba(0,0,0,0.5)` in both themes

## Complete Issue Data

Create `/lib/psylocke-timeline.ts` with the following data:
```typescript
export interface ComicIssue {
  releaseDate: string;
  title: string;
  plotDescription: string;
  marvelFandomLink: string;
  thumbnailPath: string;
}

export const COMIC_ISSUES: ComicIssue[] = [
  {
    releaseDate: "2019-10-30",
    title: "Excalibur Vol 4 #1",
    plotDescription: "Betsy officially becomes Captain Britain, while Kwannon takes the name Psylocke.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Excalibur_Vol_4_1",
    thumbnailPath: "/psylocke-backstory/excalibur-v4-1.jpg"
  },
  {
    releaseDate: "2019-06-19",
    title: "Uncanny X-Men Vol 5 #20",
    plotDescription: "The era ends with Betsy and Kwannon finally parting ways to seek their own futures.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_5_20",
    thumbnailPath: "/psylocke-backstory/uncanny-xmen-v5-20.jpg"
  },
  {
    releaseDate: "2019-06-05",
    title: "Uncanny X-Men Vol 5 #19",
    plotDescription: "The team faces the Hellfire Club; Kwannon proves her lethality as an independent agent.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_5_19",
    thumbnailPath: "/psylocke-backstory/uncanny-xmen-v5-19.jpg"
  },
  {
    releaseDate: "2019-05-15",
    title: "Uncanny X-Men Vol 5 #18",
    plotDescription: "Betsy continues to struggle with her identity and her return to her proper body.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_5_18",
    thumbnailPath: "/psylocke-backstory/uncanny-xmen-v5-18.jpg"
  },
  {
    releaseDate: "2019-05-01",
    title: "Uncanny X-Men Vol 5 #17",
    plotDescription: "The two women navigate a tense professional relationship as the X-Men face extinction.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_5_17",
    thumbnailPath: "/psylocke-backstory/uncanny-xmen-v5-17.jpg"
  },
  {
    releaseDate: "2019-04-17",
    title: "Uncanny X-Men Vol 5 #16",
    plotDescription: "Betsy and Kwannon both exist as separate individuals on the team during a time of crisis.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_5_16",
    thumbnailPath: "/psylocke-backstory/uncanny-xmen-v5-16.jpg"
  },
  {
    releaseDate: "2018-08-22",
    title: "Mystery in Madripoor #4",
    plotDescription: "Betsy manifests a new British body, while Kwannon's soul re-inhabits the original Asian body.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Hunt_for_Wolverine:_Mystery_in_Madripoor_Vol_1_4",
    thumbnailPath: "/psylocke-backstory/mystery-madripoor-4.jpg"
  },
  {
    releaseDate: "2018-07-25",
    title: "Mystery in Madripoor #3",
    plotDescription: "Inside the psychic void, Betsy encounters Wolverine and decides to rebuild her own body.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Hunt_for_Wolverine:_Mystery_in_Madripoor_Vol_1_3",
    thumbnailPath: "/psylocke-backstory/mystery-madripoor-3.jpg"
  },
  {
    releaseDate: "2018-06-27",
    title: "Mystery in Madripoor #2",
    plotDescription: "Betsy's soul is absorbed by Sapphire Styx, leaving her Asian physical form an empty shell.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Hunt_for_Wolverine:_Mystery_in_Madripoor_Vol_1_2",
    thumbnailPath: "/psylocke-backstory/mystery-madripoor-2.jpg"
  },
  {
    releaseDate: "2018-05-23",
    title: "Mystery in Madripoor #1",
    plotDescription: "Searching for Logan, Betsy is psychically attacked by Sapphire Styx and her body fails.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Hunt_for_Wolverine:_Mystery_in_Madripoor_Vol_1_1",
    thumbnailPath: "/psylocke-backstory/mystery-madripoor-1.jpg"
  },
  {
    releaseDate: "1994-03-15",
    title: "X-Men Vol 2 #32",
    plotDescription: "Kwannon (as Revanche) dies of the Legacy Virus, returning her psychic fragments to Betsy.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_32",
    thumbnailPath: "/psylocke-backstory/xmen-v2-32.jpg"
  },
  {
    releaseDate: "1994-02-15",
    title: "X-Men Vol 2 #31",
    plotDescription: "Spiral reveals she merged their DNA and souls into both bodies rather than just swapping.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_31",
    thumbnailPath: "/psylocke-backstory/xmen-v2-31.jpg"
  },
  {
    releaseDate: "1993-11-16",
    title: "X-Men Vol 2 #28",
    plotDescription: "Betsy deals with the fallout of Sabretooth's presence while Revanche's health fails.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_28",
    thumbnailPath: "/psylocke-backstory/xmen-v2-28.jpg"
  },
  {
    releaseDate: "1993-08-17",
    title: "X-Men Vol 2 #25",
    plotDescription: "Magneto's Fatal Attractions interrupts the search, forcing both women to fight on Avalon.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_25",
    thumbnailPath: "/psylocke-backstory/xmen-v2-25.jpg"
  },
  {
    releaseDate: "1993-07-20",
    title: "X-Men Vol 2 #24",
    plotDescription: "Betsy and Revanche reach a peace while fighting Hand ninjas during their quest for answers.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_24",
    thumbnailPath: "/psylocke-backstory/xmen-v2-24.jpg"
  },
  {
    releaseDate: "1993-06-15",
    title: "X-Men Vol 2 #23",
    plotDescription: "The conflict intensifies as the X-Men prevent the Hand from reclaiming their assassins.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_23",
    thumbnailPath: "/psylocke-backstory/xmen-v2-23.jpg"
  },
  {
    releaseDate: "1993-05-18",
    title: "X-Men Vol 2 #22",
    plotDescription: "Revanche reveals she is dying from the Legacy Virus, destabilizing her psychic powers.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_22",
    thumbnailPath: "/psylocke-backstory/xmen-v2-22.jpg"
  },
  {
    releaseDate: "1993-04-20",
    title: "X-Men Vol 2 #21",
    plotDescription: "The team investigates Hand records as the two women realize their psychic signatures are merged.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_21",
    thumbnailPath: "/psylocke-backstory/xmen-v2-21.jpg"
  },
  {
    releaseDate: "1993-03-16",
    title: "X-Men Vol 2 #20",
    plotDescription: "The X-Men travel to Japan to confront Matsu'o and uncover the truth behind their shared memories.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_20",
    thumbnailPath: "/psylocke-backstory/xmen-v2-20.jpg"
  },
  {
    releaseDate: "1993-02-16",
    title: "X-Men Vol 2 #19",
    plotDescription: "Psylocke and Revanche engage in a duel to prove who is the original through psychic combat.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_19",
    thumbnailPath: "/psylocke-backstory/xmen-v2-19.jpg"
  },
  {
    releaseDate: "1993-01-19",
    title: "X-Men Vol 2 #18",
    plotDescription: "Revanche arrives at the X-Mansion, causing immediate psychic confusion and doubt.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_18",
    thumbnailPath: "/psylocke-backstory/xmen-v2-18.jpg"
  },
  {
    releaseDate: "1992-12-15",
    title: "X-Men Vol 2 #17",
    plotDescription: "A mysterious woman (Revanche) appears in Betsy's original body, claiming she is the real Betsy.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/X-Men_Vol_2_17",
    thumbnailPath: "/psylocke-backstory/xmen-v2-17.jpg"
  },
  {
    releaseDate: "1989-12-05",
    title: "Uncanny X-Men #258",
    plotDescription: "With Wolverine's help, Betsy breaks her brainwashing but remains in her Asian physical form.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_1_258",
    thumbnailPath: "/psylocke-backstory/uncanny-xmen-258.jpg"
  },
  {
    releaseDate: "1989-11-07",
    title: "Uncanny X-Men #257",
    plotDescription: "Brainwashed as an enforcer, Betsy hunts down Wolverine and debuts her psychic knife.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_1_257",
    thumbnailPath: "/psylocke-backstory/uncanny-xmen-257.jpg"
  },
  {
    releaseDate: "1989-10-03",
    title: "Uncanny X-Men #256",
    plotDescription: "The Hand and Spiral begin the physical and mental transformation of Betsy into Lady Mandarin.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_1_256",
    thumbnailPath: "/psylocke-backstory/uncanny-xmen-256.jpg"
  },
  {
    releaseDate: "1989-09-05",
    title: "Uncanny X-Men #255",
    plotDescription: "An amnesiac Betsy washes up on a Hand-controlled beach and is found by Matsu'o Tsurayaba.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_1_255",
    thumbnailPath: "/psylocke-backstory/uncanny-xmen-255.jpg"
  },
  {
    releaseDate: "1989-07-04",
    title: "Uncanny X-Men #251",
    plotDescription: "Betsy forces the X-Men through the Siege Perilous to save them from the Reavers, resetting her life.",
    marvelFandomLink: "https://marvel.fandom.com/wiki/Uncanny_X-Men_Vol_1_251",
    thumbnailPath: "/psylocke-backstory/uncanny-xmen-251.jpg"
  }
];
```

## Success Criteria

✅ Timeline renders all 27 issues in chronological order (right-to-left)  
✅ Thumbnails load from `/public/psylocke-backstory/` directory  
✅ Thumbnails are clickable with hover feedback  
✅ Drawer opens smoothly with complete issue details  
✅ All interactions work via keyboard  
✅ Responsive on mobile (320px+) and desktop (1920px+)  
✅ Animations are smooth (60fps)  
✅ Follows Fire Horse 2026 design aesthetic  
✅ Matches existing portfolio page patterns  
✅ WCAG AAA accessible  

---

**Usage:** Provide this specification to Claude Code/Cursor. The AI will generate all component files following your existing saren.ai architecture patterns defined in `CLAUDE.md`, using the image assets located at `/Users/saren/Desktop/@saren.ai-cursor/saren-ai/public/psylocke-backstory/`.
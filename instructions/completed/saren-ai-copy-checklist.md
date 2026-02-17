# saren.ai Homepage Copy Revisions

## Hero Section

### Kicker Line
- [ ] Change: "Fractional CMO for founders who need pipeline, not process"
- [ ] To: "Fractional CMO for founders who need pipeline—not process."
- [ ] **Change:** Comma → em dash for sharper contrast

### Headline
- [ ] Change: "I architect AI-powered growth systems that turn chaotic marketing spend into predictable revenue"
- [ ] To: "I build AI-powered growth systems that turn chaotic spend into predictable revenue."
- [ ] **Changes:** "architect" → "build", remove "marketing" (implied), shorten for punch

### Subhead
- [ ] Change: "From demand generation to full-funnel attribution, I build marketing engines that scale—without ripping out what's already working."
- [ ] To: "I build marketing engines that scale without ripping out what's already working—from demand gen to full-funnel attribution."
- [ ] **Change:** Lead with benefit (scale without disruption), then scope

### Proof Bullets
- [ ] Keep: "344% inbound lift, 70% CAC reduction (Qwiet AI)"
- [ ] Change: "550% pipeline expansion (Cylance, $1.4B exit)"
- [ ] To: "550% pipeline growth (Cylance, $1.4B exit)"
- [ ] **Change:** "expansion" → "growth" for clarity
- [ ] Change: "Built 'Collaborative AI' category from zero (WethosAI, Series A)"
- [ ] To: "Built the 'Collaborative AI' category (WethosAI, Series A)"
- [ ] **Change:** Remove "from zero" (obvious)

---

## The Work Section

### Section Title
- [ ] Change: "The Work"
- [ ] To: One of these options:
  - "How I work"
  - "The playbook"
  - "Under the hood"
- [ ] **Goal:** Add personality, signal these aren't generic deliverables

### Case Study Descriptions

#### Golden Dashboard
- [ ] Change: "Seeing ROI across the full demand funnel. A single analytics view that answers the hardest question in marketing: which channel spend creates real business outcomes?"
- [ ] To: "Which channel spend creates real business outcomes? A single analytics view that answers the hardest question in marketing—and proves it with full-funnel ROI."
- [ ] **Change:** Lead with the question, stronger opening

#### Sovereign Buyer Personas
- [ ] Change: "Making complex markets legible. A framework for building personas that actually drive targeting, messaging, and content decisions."
- [ ] To: "Making complex markets simple. A framework for building personas that drive real targeting, messaging, and content decisions."
- [ ] **Changes:** "legible" → "simple", remove "actually" (filler word)

#### 10-Touch Sales Play
- [ ] Keep as-is: "Turning cold outreach into executive conversations. A systematic approach to multi-channel prospecting that consistently books meetings."
- [ ] **Status:** No changes needed

#### 120-Day Content Journey
- [ ] Change: "How we engineered demand at Cylance. A content system designed to move buyers from awareness through purchase consideration."
- [ ] To: "How we engineered $4M in quarterly pipeline at Cylance. A 120-day content system that turned awareness into closed deals."
- [ ] **Changes:** Add specific outcome ($4M), remove B2B Mad Libs language, focus on results

#### B2B Marketing Framework
- [ ] Change: "A 7-layer prompt matrix for building B2B SaaS messaging infrastructure from scratch. The essential system for teams who can't afford to build on quicksand."
- [ ] To: "The messaging infrastructure for teams who can't afford to build on quicksand. A 7-layer framework that creates B2B SaaS positioning from scratch."
- [ ] **Changes:** Lead with benefit, "prompt matrix" → "framework" (less jargon)

#### It's Good to Be Pitched
- [ ] Change: "A 30-second TV spot storyboard about the pleasure of having three great options. Interactive narrative showing AI-assisted creative production."
- [ ] To: "A 30-second TV spot storyboard exploring the luxury of choice. An interactive demo of AI-assisted creative production."
- [ ] **Changes:** Clarify what it is, tighten language

#### Behavioral Lead Scoring
- [ ] Change: "Making buyer motion legible across the journey. An interactive system that connects behavior, engagement, lifecycle, and sales readiness into explainable intelligence."
- [ ] To: "Making buyer behavior predictable. An interactive system that connects engagement, lifecycle, and sales readiness into a single scoring model."
- [ ] **Changes:** "legible" → "predictable", remove buzzwords, simplify

#### SaaS Revenue Calculator
- [ ] Keep as-is: "Work backwards from revenue to see exactly what it takes. Interactive annual planning tool using industry benchmarks to reverse-engineer your funnel metrics."
- [ ] **Status:** No changes needed

---

## CTA Section

### Headline
- [ ] Change: "Ready to build your growth engine?"
- [ ] To: "Let's build your growth engine."
- [ ] **Change:** Remove question mark, be direct and confident

### Subhead
- [ ] Change: "Let's talk about how AI-driven operations can transform your marketing from cost center to revenue driver."
- [ ] To: "Let's talk about how AI-driven operations turn chaotic spend into predictable pipeline."
- [ ] **Change:** Remove consulting cliché, echo hero headline for consistency

---

## Footer

### Tagline (optional enhancement)
- [ ] Current: "Building AI-driven growth engines for early-stage and Series A"
- [ ] Consider: "I help early-stage and Series A companies build marketing infrastructure that scales—using AI, not headcount."
- [ ] **Change:** Add differentiation about *how* you work, avoid redundancy with hero

---

## Bonus Headlines (for consideration)

**Available but not forced:**
1. "Heroes are not enough. Lead with a code experience."
2. "Forms are for boomers. It's a chat world now."

**Potential uses:**
- Interactive tool intro copy
- "Building in Public" banner variations
- Case study section openers
- About page positioning

---

---

## Technical & Design Updates

### Logo Contrast Issues
- [ ] Check logo contrast in light mode
- [ ] Check logo contrast in dark mode
- [ ] Ensure "saren.ai" text is readable in both modes
- [ ] **Location:** Upper right corner navigation
- [ ] **Goal:** Meet WCAG accessibility standards (4.5:1 minimum for normal text)

### Profile Picture Randomization (/about page)
- [ ] Implement random profile picture selection on page load
- [ ] **Location:** /about page first load
- [ ] **Implementation:** Client-side randomization or server-side on initial render
- [ ] **Note:** Ensure images are preloaded to avoid layout shift

### llms.txt File Creation
- [ ] Create llms.txt file for LLM bot scanning
- [ ] Add to site root directory
- [ ] **Content to include:**
  - Site purpose and positioning
  - Key service offerings
  - Notable case studies and results
  - Contact information
  - Navigation structure
- [ ] Reference: https://llmstxt.org/ for format guidelines

### Mega Menu - Substack Integration Fix
- [ ] Debug "Thinking" mega menu hover
- [ ] **Expected behavior:** Pull thumbnail + brief description of most recent Substack post
- [ ] **Current state:** Not working
- [ ] Check API connection to Substack RSS feed
- [ ] Verify thumbnail fetching logic
- [ ] Test description truncation/formatting
- [ ] Add error handling for failed API calls

### Framer Motion - Hero Animations
"Heroes are not enough" - Add motion to hero sections

- [ ] /contact hero - Add Framer Motion animation
- [ ] /clients hero - Add Framer Motion animation  
- [ ] /thinking hero - Add Framer Motion animation
- [ ] /portfolio hero - Add Framer Motion animation

**Animation suggestions:**
- Fade-in + slide-up for headlines
- Stagger effect for multi-line headlines
- Subtle parallax or scale on scroll
- Duration: 0.6-0.8s (not too slow)
- Easing: ease-out or spring animation

**Code pattern to use:**
```jsx
import { motion } from 'framer-motion';

<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  Headline text
</motion.h1>
```

---

## Priority Order

### High Priority (biggest impact)
1. Hero headline + subhead (most visible, sets tone)
2. Case study descriptions (proof section is your closer)
3. CTA section (last chance to convert)
4. Logo contrast fixes (accessibility & professionalism)
5. Mega menu Substack integration fix (broken feature hurts credibility)

### Medium Priority
1. Proof bullets (already strong, minor tweaks)
2. Section title for "The Work"
3. Framer Motion hero animations (polish & differentiation)
4. llms.txt file (future-proofing for AI discoverability)

### Low Priority (nice-to-have)
1. Footer tagline variation
2. Incorporate bonus headlines if natural fit emerges
3. Profile picture randomization (fun detail, low impact)

Act as an elite Product Designer specializing in hyper-minimalist, high-utility B2B dashboard interfaces. Generate a production-ready, high-fidelity UI prototype framework for an internal AI application module located at `saren.ai/desk/pipeline`. 

### Design Philosophy & Aesthetic:
* Layout: Strict Bento-box style grid. Clean, structured lines, maximizing data density without visual clutter. 
* Typography: Highly scannable, sentence-case layout headers, plain paragraphs, and monospace treatments for data schemas or code-adjacent variables.
* Color & Vibe: Retro-futuristic minimalist. Dark mode baseline with high-contrast text hierarchies. Use subtle accents sparingly to highlight functional actions or active data signals.

### Screen Layout Requirements:
Create a multi-panel workspace view titled "CAN Pipeline Engine // The Daily 3". 

1. Top Global Navigation/Status Bar:
   - Breadcrumb tracking: `saren.ai/desk/pipeline`
   - Config Profile: Shows active profile dropdown (Defaults to User/Self)
   - Daily Counter: "3/3 Opportunities Synthesized"

2. Panel A: The Context Engine (Left Column - 30% Width)
   - Visualizes Phase 1 outputs.
   - Shows active target account name, domain metadata, and an interactive "Source Footprint" widget showing clickable sources (e.g., [Apify: Job Board Scraping], [Apollo: Firmographics]).
   - Display a distinct text card block titled "Tactical Gap Identified" containing the LLM-derived organizational bottleneck.

3. Panel B: The Alignment Matrix (Center Column - 35% Width)
   - Visualizes Phase 2 outputs.
   - Shows the selected contact card: Name, Title, and LinkedIn badge icon.
   - Display a comparative cross-reference grid detailing "The Bridge" (how the seller's specific professional background intersects with the tactical gap) and "The Shield" (the two specific friction points or objections mapped out and neutralized).

4. Panel C: The Asymmetric Nurture (Right Column - 35% Width)
   - Visualizes Phase 3 outputs.
   - A tabbed layout showing sequential touchpoints: [Touchpoint 1: Initial Hook Email], [Touchpoint 2: LinkedIn DM], [Touchpoint 3: Value Nudge PDF Link].
   - Provide an active, fully editable text window displaying the copy drafted for the active tab. It must read like an internal, peer-level advisory memo, completely devoid of marketing fluff or standard AI filler phrases.

5. Panel D: Terminal Action Tray (Persistent Bottom Interface)
   - Features a primary, high-visibility button: `[Push Draft to Gmail Folder]`.
   - Secondary action buttons: `[Regenerate Strategy Slider]` and `[Skip/Archive Entry]`.

Generate clean, scannable, and componentized markup instructions, UI component descriptions, and Tailwind layout configurations that allow an LLM engineer or frontend developer to build this interface to pixel-perfect specification instantly.
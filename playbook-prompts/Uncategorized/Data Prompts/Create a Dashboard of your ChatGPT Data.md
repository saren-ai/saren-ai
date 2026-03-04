# Create a Dashboard of your ChatGPT Data


## Step 1: Export Data from ChatGPT
Go to Settings -> Then Data Controls -> Then Export Data. 
Will often take 5 to 30 minutes to export the data and it will get emailed to you!

## Step 2: Upload the Exported Data to Google Gemini
Open the Exported ZIP File and select the JSON and HTML Files. Upload them to a new Gemini Chat with the Prompt Below

PROMPT:

 <span style="background-color: #AF52DD;">
     You are a “PromptOps Analyst”
A data-viz analyst who builds a clean dashboard of my **COMPLETE** ChatGPT prompting history.

---

## Inputs I will provide
My ChatGPT “Export data” ZIP (Settings → Data Controls → Export) containing `conversations.json`

## What to do

### 1) Ingest & clean
- Parse user prompts as rows where `author == "user"`. Keep assistant rows for depth metrics but don’t chart them as prompts.
- Normalize timestamps to `{{America/Los_Angeles}}`; derive **date**, **week**, **month**, **weekday** (Mon–Sun), **hour** (0–23).
- For “conversation depth,” count alternating user/assistant turns until the next `conversation_id`.
- Remove duplicates (identical text within the same minute).

### 2) Auto-categorize prompts
- Build a lightweight taxonomy (e.g., **AI/Agents**, **Coding/Debug**, **Business/Strategy**, **Design/UX**, **Productivity/Planning**, **Data/Analytics**, **Marketing/Planning**, **Writing/Rewrite**, **Research/News**, **Other**).
- Assign up to **2 categories per prompt** with a short reason. If confidence < 0.5, mark as **“Other/Unclear.”**
- Allow me to later supply a custom mapping; if I do, **re-run all charts.**

### 3) Compute metrics
- **Stat cards:** `total_prompts`, `first_date–last_date`, `active_days`, `longest_streak_days`, `avg_prompts_per_active_day`, `median_prompts_per_active_day`, `busiest_day` (date & count), `unique_conversations`, `avg_conversation_depth`, `total_tokens` (if available).
- **Time series:** `prompts_per_day` (with 7-day rolling avg), `prompts_per_week`, `prompts_per_month`.
- **Temporal patterns:** `day_of_week_avg` (bar), `hour_of_day_distribution` (hist), **hour×weekday heatmap**.
- **Categories:** donut of `prompts_by_category`; `top_10_categories` (bar); stacked area of `category_share_over_time` (weekly or monthly); **new_vs_returning_categories** per month.
- **Prompt shapes:** classify each prompt as **question / instruction / rewrite / code / image–video**; chart counts + trend.
- **Length/tokens:** word_count histogram; boxplot by category; `total_tokens_by_month` (if available).
- **Conversation dynamics:** `conversation_depth_distribution`; % prompts that trigger a follow-up within 10 minutes; **median time** between user prompts.
- **Outcomes** (if signals exist): `thumbs_up_rate`, `thumbs_down_rate`, `re_ask_rate` (user asks similar question within 15 min), `edit_rate` (user edits their prompt), `time_to_first_useful_answer` if any marker exists.
- **Vocabulary/intent:** top 30 keywords & bigrams (stopwords removed); **novelty index** (share of first-time category each month); **topic drift** per conversation.
- **Tooling (optional):** counts of browsing/code/vision/tool_use by month.

### 4) Visualize
- If a code/analysis tool is available: generate charts (**one per figure**) and attach PNGs; also provide a single downloadable **`dashboard.html`** that embeds all charts and stat cards.
- If tools are **not** available: render a **Markdown dashboard**: tables for stat cards, Unicode/ASCII heatmap for hour×weekday, and **Mermaid** for line/bar charts where helpful.

### 5) Deliverables (in this single session)
**A. “PromptOps Dashboard”** sectioned Markdown with:
- **Stat Cards** (table)  
- **Volume Over Time** (line + 7-day rolling)  
- **When You Prompt** (bar + heatmap)  
- **Categories** (donut + stacked area)  
- **Prompt Shapes** (bar + trend)  
- **Length/Token Insights** (hist/box)  
- **Conversation Dynamics**  
- **Outcomes** (if any)  
- **Top Keywords & Bigrams**  
- **Notes & Next Actions** (2–5 personalized suggestions to improve my prompting)

**B. Downloadables** (if tools allowed):
- `dashboard.html`
- `prompts_summary.csv` (one row per prompt with derived fields)
- `category_time_series.csv`
- `figures/*.png`

**C. Quick commands I can run next, e.g.:**
- “Filter to last 30 days and rebuild”
- “Reclassify categories with my mapping: …”
- “Drill into Marketing/Planning prompts in 2025-Q1”

---

## Constraints & style
- **Crisp, minimal design;** clear labels; no garish colors; one accent color.
- **Robust to missing fields.** If tokens/reactions/clicks aren’t present, skip gracefully and mark **“not available.”**
- **Respect privacy:** do all analysis in-session; don’t transmit data.
- **Summarize key takeaways** in 5 bullets at the top.
 </span>

## Step 3 - Copy Gemini Response into ChatGPT

Take Gemini’s response and paste into a new ChatGPT conversation. Turn on “Canvas Mode” on ChatGPT and make sure that “Thinking” mode is activated. 

Add in the line above: The following is a complete analysis of my ChatGPT Prompting History — Can you make into a dashboard where I can view all this data.

Now press enter and let ChatGPT start building your dashboard!

If ChatGPT doesn’t output a dashboard or the first initial dashboard has errors, then ask ChatGPT to fix the errors. Based on what ChatGPT outputs as a dashboard you may want to prompt it a few more times after the first initial result to tweak the dashboard to a design style of your liking!
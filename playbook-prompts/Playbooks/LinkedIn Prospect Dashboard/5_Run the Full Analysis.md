Once you've answered all four, paste this:

```
Now run the full analysis using everything I've told you.

Sequence:

1. Filter my CSV for connections that match my Q1 title and seniority criteria. Tell me how many matched vs. total connections.

2. From the filtered list, identify the top 25 candidates based on title relevance and any company context visible in the CSV.

3. Research each of those 25 using public web search only — no LinkedIn scraping. I want: company size, recent funding or growth signals, any public mention of the problems or initiatives I described in Q2, and relevant news from the last 90 days.

4. Score each person out of 100 using these weights:
   - Authority (decision-making power based on title/seniority): 30 pts
   - Network proximity (how directly connected we are): 25 pts
   - Company scale (fit based on size and stage): 20 pts
   - Intent signals (public evidence they're dealing with relevant problems): 15 pts
   - Relationship warmth (any prior interaction or mutual context): 10 pts

5. Rank all 25. For the top 10, write a personalized 2–3 sentence outreach message in my voice — specific to their situation, ending with my CTA. No generic lines. Each message should sound like it was written for that one person.

6. Before you build the dashboard, ask me one question about how I want it to look.

7. Generate the CSV and HTML dashboard.
```

## Scoring Tiers

| Tier | Score | What It Means |
|------|-------|---------------|
| 🟢 **Invest Now** | 70–100 | High authority, strong signals, warm connection. Move this week. |
| 🟠 **Warm Up** | 50–69 | Solid fit, not enough context yet. Engage and monitor over 30 days. |
| ⚫ **Watch List** | 30–49 | Worth keeping. Revisit in 90 days or when a trigger event surfaces. |

The weights are adjustable. If intent signals matter more than company scale for your motion, tell Claude to recalibrate — it'll re-score accordingly.

## What You Get

**Prospect Shortlist CSV** — ranked and ready to import into HubSpot, Apollo, or any CRM.

Columns: `Name · Role · Company · Score · Tier · Intent Signal · Outreach Message · LinkedIn URL · Email`

**HTML Intelligence Dashboard** — browser-ready, styled to your brand. Each card shows the prospect's score, intel summary, tier badge, and a one-click copy button for the outreach message. No login, no SaaS — just open the file.

# Hustle & Flow — Schema Reference

Supabase project: `ltsuosasgblbqhsjckfg` (us-west-2, Hustle & Flow)  
Studio: https://saren.ai/studio

---

## contacts

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, auto |
| full_name | text | Required |
| email | text | Unique — dedup key |
| company | text | |
| title | text | |
| location | text | |
| phone | text | |
| linkedin_url | text | |
| notes | text | |
| segment | text | Free-form tag |
| created_at | timestamptz | |
| updated_at | timestamptz | |

## contact_sources

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, auto |
| contact_id | uuid | FK → contacts |
| source | text | "apollo" / "csv" / "manual" |
| source_id | text | Apollo person ID when source=apollo |
| raw | jsonb | Full Apollo payload or CSV row |
| imported_at | timestamptz | |

## sequences

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, auto |
| contact_id | uuid | FK → contacts |
| play | text | e.g. "cold-outbound", "warm-follow-up" |
| status | text | queued / active / paused / completed / dead |
| started_at | timestamptz | |
| updated_at | timestamptz | |
| outreach_page_slug | text | FK → outreach_pages.slug (optional) |

## touches

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, auto |
| sequence_id | uuid | FK → sequences |
| touch_num | int | Auto-incremented per sequence |
| channel | text | email / linkedin / phone |
| status | text | pending / sent / opened / replied / bounced |
| scheduled_at | timestamptz | |
| sent_at | timestamptz | |
| opened_at | timestamptz | |
| clicked_at | timestamptz | |
| reply_at | timestamptz | |
| subject | text | |
| body_md | text | Markdown copy |
| thread | jsonb | Array of {direction, body_md, sent_at} |
| sentiment | text | positive / neutral / negative |
| notes | text | |
| response | text | |

## outreach_pages

| Column | Type | Notes |
|---|---|---|
| slug | text | PK — becomes saren.ai/for/[slug] |
| company | text | |
| industry | text | |
| role | text | |
| pain_point | text | |
| cta_text | text | |
| cta_href | text | |
| tools | jsonb | Array of tool name strings |
| view_count | int | Auto-incremented on page load |
| published_at | timestamptz | |

---

## Contact upsert pattern

```sql
INSERT INTO contacts (full_name, email, company, title, linkedin_url, phone, location, notes)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
ON CONFLICT (email) DO UPDATE SET
  company      = COALESCE(EXCLUDED.company,      contacts.company),
  title        = COALESCE(EXCLUDED.title,        contacts.title),
  linkedin_url = COALESCE(EXCLUDED.linkedin_url, contacts.linkedin_url),
  phone        = COALESCE(EXCLUDED.phone,        contacts.phone),
  location     = COALESCE(EXCLUDED.location,     contacts.location),
  updated_at   = now()
RETURNING id;
```

`COALESCE(EXCLUDED.x, contacts.x)` — uses the new value if provided, keeps the existing value if not. Never overwrites populated fields.

## Source log pattern

```sql
INSERT INTO contact_sources (contact_id, source, source_id, raw)
VALUES ('[id]', 'apollo', '[apollo_person_id]', '[payload]'::jsonb);
```

## Sequence create pattern

```sql
INSERT INTO sequences (contact_id, play, status, started_at)
VALUES ('[contact_id]', 'cold-outbound', 'active', now())
RETURNING id;
```

## Touch insert pattern

```sql
INSERT INTO touches (sequence_id, touch_num, channel, scheduled_at, subject, body_md, status)
SELECT
  '[sequence_id]',
  COALESCE((SELECT MAX(touch_num) FROM touches WHERE sequence_id = '[sequence_id]'), 0) + 1,
  'email',
  '[scheduled_at]',
  '[subject]',
  '[body_md]',
  'pending';
```

---

## Status values

**Sequence:** `queued` → `active` → `paused` → `completed` / `dead`

**Touch:** `pending` → `sent` → `opened` → `replied` / `bounced`

**Sentiment:** `positive` / `neutral` / `negative`

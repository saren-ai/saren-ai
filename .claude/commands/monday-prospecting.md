# Monday Prospecting

Monday morning cold outbound intake. Enriches targets via Apollo, upserts into
contacts, and schedules a cold cycle for everyone with a valid email.

Run this every Monday morning to add net-new contacts for the week.

## Arguments

`$ARGUMENTS` — paste a JSON array of targets directly after the command, one
object per target. Each object uses whichever fields you have:

```json
[
  { "full_name": "Jane Doe", "company": "Acme Corp" },
  { "linkedin_url": "https://linkedin.com/in/janedoe" },
  { "email": "jane@acme.com" },
  { "full_name": "Marcus Webb", "company": "Widgetco", "start_date": "2026-06-02" }
]
```

Optionally set `"start_date"` on any individual target, or set it globally as a
top-level key alongside the `"targets"` array. Default: tomorrow.

If no arguments are provided, ask Saren for the target list interactively.

---

## Steps

### 1 — Parse inputs

Read `$ARGUMENTS`. Extract:
- `targets` array (or treat the whole argument as the array if no wrapper object)
- Global `start_date` (ISO date string, default `current_date + 1`)

Per target, identify which input form it is:
- **(a)** has `full_name` + `company` → Apollo match via name + org
- **(b)** has `linkedin_url` → Apollo match via URL
- **(c)** has `email` → Apollo match via email
- Multiple fields present → pass all of them; Apollo uses the best signal

### 2 — Pre-flight confirmation (required before any Apollo call)

Count targets. Present exactly this message and wait for explicit yes/no:

> Enriching **{N} contacts** will cost up to **{N} Apollo credits** (0 credits
> per contact that Apollo can't match). Start date: **{start_date}**.
> {If N ≥ 10: "⚠ This is a batch of 10 or more — confirming before running."}
> Proceed?

Do NOT call `apollo_people_match` before receiving confirmation.

### 3 — Per-target enrichment + intake loop

For each target, in order:

**3a. Call `apollo_people_match`**

Pass whatever fields the target has:
- `full_name`/`company` target → `name` + `organization_name`
- `linkedin_url` target → `linkedin_url`
- `email` target → `email`
- Always set `reveal_personal_emails: false` (we want work emails only)

**3b. Parse Apollo response**

*Matched* (Apollo returns a `person` object with data):
- Extract: `first_name`, `last_name`, `full_name` (or combine first+last),
  `email`, `title`, `organization.name` → company, `linkedin_url`, `phone_numbers[0].raw_number` → phone, `city`/`state`/`country` → location
- `apollo_id` = `person.id`
- `apollo_raw` = the full `person` object as jsonb
- `enriched = true`

*Not matched* (null person, or person with no meaningful data):
- Keep original input fields only
- `email = NULL` (unless email was the input field)
- `apollo_id = NULL`, `apollo_raw` = original input object as jsonb
- `enriched = false`

**3c. Call `enqueue_cold_contact`**

```sql
SELECT contact_id, sequence_id, status
FROM enqueue_cold_contact(
  p_full_name    := '<value or NULL>',
  p_first_name   := '<value or NULL>',
  p_last_name    := '<value or NULL>',
  p_email        := '<value or NULL>',
  p_company      := '<value or NULL>',
  p_title        := '<value or NULL>',
  p_linkedin_url := '<value or NULL>',
  p_phone        := '<value or NULL>',
  p_location     := '<value or NULL>',
  p_apollo_id    := '<value or NULL>',
  p_apollo_raw   := '<jsonb or NULL>',
  p_enriched     := true_or_false,
  p_start_date   := 'YYYY-MM-DD'
);
```

Collect `(contact_id, sequence_id, status)` into results. Status values:
- `inserted+scheduled` — new contact, cycle queued ✓
- `updated+scheduled` — existing contact updated, cycle queued ✓
- `inserted+no_email` — new contact, no email, no cycle
- `updated+no_email` — existing contact, no email, no cycle
- `segment_conflict` — contact exists as warm/active, cycle skipped

### 4 — Post-batch report

After all targets are processed, print this report:

```
Monday Prospecting — {today's date}
────────────────────────────────────
Total processed            {N}
  Enriched by Apollo       {n}  ({n} credits used)
  Apollo failed            {n}  (0 credits)
Sequences scheduled        {n}
  Skipped — no email       {n}
  Skipped — segment conflict {n}
────────────────────────────────────
```

**Queued touches — today through next 7 days:**

Run this query and display as a table:

```sql
SELECT
  t.scheduled_at::date        AS date,
  t.channel,
  t.touch_num,
  c.full_name,
  c.company,
  s.play
FROM touches t
JOIN sequences s ON s.id = t.sequence_id
JOIN contacts  c ON c.id = s.contact_id
WHERE t.status = 'pending'
  AND t.scheduled_at::date BETWEEN current_date AND current_date + 7
ORDER BY t.scheduled_at, c.full_name, t.touch_num;
```

**Needs manual research** (status = `inserted+no_email` or `updated+no_email`):

```
No cycle scheduled — Apollo couldn't find an email:
  {full_name}  {linkedin_url or 'no LinkedIn'}  {company or 'unknown'}
```

**Segment conflicts** (status = `segment_conflict`):

```
Existing warm contacts — cold cycle skipped:
  {full_name}  warm-network/warm-referred
  → Run build_warm_reactivation_cycle manually if you want to reach out.
```

---

## Rules

- Never call `apollo_people_match` without the Step 2 confirmation.
- Never call `enqueue_cold_contact` without first attempting Apollo enrichment.
- Never auto-schedule sequences on contacts with no email.
- If Apollo throws an error for a specific target (not a "not found" — an actual
  error), log it in the report under "Apollo errors" and continue with the next
  target. Do not abort the whole batch.
- `build_cold_cycle` is idempotent — if a contact already has an active cold
  sequence, it returns the existing one without creating a duplicate.

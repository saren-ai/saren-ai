# Studio Runbook — Hustle & Flow

**URL:** https://saren.ai/studio  
**Supabase project:** Hustle & Flow (`ltsuosasgblbqhsjckfg`, us-west-2)  
**Login email:** saren@saren.ai (magic link, sent via Resend)

---

## Access

1. Go to `saren.ai/studio`
2. Enter `saren@saren.ai` in the login form (pre-filled with the Gmail address — change it)
3. Click **Send magic link** → check inbox → click link
4. Session persists in cookies; no expiry configured beyond Supabase defaults

Rate limit: 5 magic link requests per IP per hour.

---

## Data model

```
contacts
  └── sequences          (one contact, one play, one sequence)
        └── touches      (ordered steps within a sequence)

outreach_pages           (standalone — linked to a sequence optionally)
```

### contacts
A prospect. Fields: `full_name` (required), `email`, `company`, `title`, `location`, `phone`, `linkedin_url`, `notes`.

### sequences
One outreach play per contact. The `play` field is the play name (e.g. `cold-outbound`, `warm-follow-up`). Status: `queued → active → paused → completed → dead`. Multiple sequences per contact are supported but unusual.

### touches
A single step in a sequence. Fields: `touch_num` (auto-incremented), `channel` (email / linkedin / phone), `scheduled_at`, `subject`, `body_md`, `status`, `sentiment`, `opened_at`, `clicked_at`, `sent_at`, `reply_at`, `thread` (jsonb array of message objects).

### outreach_pages
A personalized landing page at `saren.ai/for/[slug]`. Fields: `company`, `industry`, `role`, `pain_point`, `cta_text`, `cta_href`, `tools` (jsonb array), `view_count` (auto-incremented on page load).

---

## Day-to-day workflow

### 1. Add a contact — `/studio/contacts`

Click **Add contact** (top right). Required: full name. Optional but useful: email, company, title. Save.

The table shows last touch date, last touch status, and sequence count per contact.

---

### 2. Start a sequence — currently direct DB only

No create-sequence UI exists yet. Insert directly in Supabase:

```sql
INSERT INTO sequences (contact_id, play, status, started_at)
VALUES ('<contact-uuid>', 'cold-outbound', 'active', now());
```

Common play names: `cold-outbound`, `warm-follow-up`, `re-engage`, `referral`.

---

### 3. Log touches — `/studio/sequences`

Sequences are grouped by play name. Each card shows the contact name, status select, and touch dots.

Click **+ Touch** on any sequence card to open the inline form:
- **Channel:** email / linkedin / phone
- **Scheduled:** date/time of planned send
- **Subject:** subject line (email) or message opening (LinkedIn)
- **Body:** markdown — full copy

Touch status starts at `pending`. Update it manually as you send and get responses.

---

### 4. Update touch status — `/studio/contacts/[id]`

Open a contact → center column lists all sequences and touches. Click a touch row to load it in the right panel. Status is part of the touch record; update it via direct DB edit or the Log Reply flow (which flips status to `replied` automatically).

---

### 5. Log a reply — `/studio/contacts/[id]`

1. Open contact → click the touch in the center column
2. Right panel shows the touch detail and thread
3. Click **Log reply**
4. Paste the reply body (markdown fine), select sentiment (positive / neutral / negative)
5. Save — appends to thread, sets `reply_at`, sets status to `replied`

---

### 6. Create an outreach page — `/studio/outreach-pages`

Click **New page** (top right):
- **Slug:** auto-suggested from company name as kebab-case (editable). Becomes `saren.ai/for/[slug]`.
- **Company, industry, role:** context fields used by the page template
- **Pain point:** the specific problem framing for this prospect
- **CTA text / CTA href:** the call to action (e.g. "Book a call" → Calendly link)

After creation, the page appears in the left list. Click it to edit. The right panel shows a scaled preview and the edit form.

**Copy link** → copies `https://saren.ai/for/[slug]` to clipboard. Drop this in the email touch.

View count increments on every page load (server-side, no JS required from the visitor).

---

### 7. Edit a contact inline — `/studio/contacts/[id]`

Left column: click any field value → it becomes an input. Press **Enter** or click away to save. Escape cancels.

---

## Status reference

### Touch statuses
| Status | Meaning |
|---|---|
| `pending` | Scheduled but not yet sent |
| `sent` | Sent, no open recorded |
| `opened` | Email open tracked |
| `replied` | Got a response |
| `bounced` | Hard or soft bounce |

### Sequence statuses
| Status | Meaning |
|---|---|
| `queued` | Not started yet |
| `active` | In progress |
| `paused` | On hold |
| `completed` | Finished — outcome recorded |
| `dead` | No longer pursuing |

---

## What Studio does NOT do

- **Does not send email.** Touches are logged manually. Sending happens in Gmail, Apollo, or LinkedIn.
- **Does not track opens/clicks automatically.** Set `opened_at` / `clicked_at` manually or via future integration.
- **Does not integrate with Apollo or HubSpot.** Standalone ops tracker.
- **Does not create sequences from the UI.** Use direct Supabase insert for now.

---

## Supabase direct access

Dashboard: https://supabase.com/dashboard/project/ltsuosasgblbqhsjckfg

Useful for:
- Creating sequences (until UI exists)
- Bulk editing statuses
- Reviewing raw thread jsonb
- Running ad-hoc queries

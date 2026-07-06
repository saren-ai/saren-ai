---
name: sequence-writer
description: >
  Agent 3 — the writer. Composes the four-dossier inputs (contact dossier from
  contact-enrich, salesperson dossier, company + product dossiers, the client's voice.md
  plus recent draft_edits) into a per-contact sequence PLAN (~3 touches, flexes 2-4) and
  FULL COPY for touch 1 only — later touches are drafted just-in-time when due (project
  decision, 2026-06-09). Use when the user says "write the sequence for <name>", "draft
  outreach for the enriched contacts", "sequence the approved batch" — right after
  contact-enrich finishes, or via job-runner draining agent_jobs rows with
  skill='sequence-writer' kind='draft' (the dashboard's Skip-to-Writer button queues
  exactly that with params={skip_research:true} and the human's "how I know them" note
  as the personalization_seed). Writes the sequences row (subject_a, optional subject_b
  where the client's voice allows A/B, touch-1 email_body, best-fit play, started_at),
  stashes the full plan markdown in tool_outputs versioned, advances the contact to
  stage 'sequenced' so it lands in the dashboard Review queue (review_and_send), and
  reports per contact: subject, hook used, matchmaking seam, and one honest weakest-part
  note. HARD GATES: only contacts at stage 'enriched' or named explicitly by the user;
  every recipient claim must trace to the contact dossier and every client claim to the
  company/product dossier; the client's voice rules (including Learned rules) are hard
  constraints; per-client isolation always. NEVER sends, never pushes Gmail drafts (the
  human does that from Review), never invents facts, never reuses another contact's copy.
---

# Sequence Writer (Agent 3 — plan + touch-1 copy)

The writer is where the white-glove pipeline pays off. Everything upstream — the human
sort, the OSINT, the matchmaking pass — exists so this skill can write ONE email that
reads like the client typed it for exactly one person. The personalization is the
deliverable. If the inputs don't support a specific, true, personal email, say so
instead of drafting a generic one.

Project decision (2026-06-09, SPRINT decisions log): **sequence PLAN upfront, copy
just-in-time per touch.** This skill writes the full plan and the touch-1 copy only.
Touch 2+ copy is drafted when the touch comes due (dashboard next-touch flow /
inbox-watch), with the live thread as context. Don't pre-write copy that will be stale
by the time it's needed.

## DB access (every step that touches the DB)

`psql` using the connection string from `dashboard/.env.local` — grep the var, never
`source` the file, never print/echo the URL:

```bash
psql "$(grep '^SUPABASE_DB_URL=' dashboard/.env.local | cut -d= -f2-)" -c "<sql>"
```

Escape single quotes in SQL strings by doubling them. For the copy and plan writes,
pipe a heredoc into psql and dollar-quote the bodies (`$body$ ... $body$`,
`$plan$ ... $plan$`) so quotes and newlines pass through intact.

## Step 0 — The gate: resolve client + the eligible set

Read `.active-client` (route to client-context if unset). When entered via job-runner,
the job's `client_id` wins — switch client-context to its slug before anything else;
wrong client is the costly failure.

Eligible contacts — exactly two paths in:

1. **Stage 'enriched'** for the active client (contact-enrich finished, or the
   dashboard's Skip-to-Writer set it):

   ```sql
   select ct.id, ct.full_name, ct.title, ct.company, ct.email, ct.email_status,
          ct.linkedin_url, ct.segment, ct.fit_score, ct.personalization_seed,
          ct.recommended_angle, ct.buying_role_hypothesis, ct.notes
   from contacts ct
   where ct.client_id = (select id from clients where slug = '<client>')
     and coalesce(ct.archived, false) = false
     and ct.stage = 'enriched';
   ```

2. **The user names the contact explicitly in chat** — "write the sequence for Jane
   Doe" is itself the instruction, even if her stage hasn't flipped yet. Names only;
   "sequence everything sourced" is not naming and fails the gate.

Anyone outside both paths: stop, say which contacts ARE eligible, and point at the
pipeline (approve → enrich → here). Never quietly widen the set.

**Job hygiene:** when entered via job-runner, the runner owns the job row — do the work
and return the summary. When you pull `requested` jobs yourself (skill='sequence-writer',
kind='draft'), close them out the way job-runner does: claim via `claim_next_job()` or a
direct `status='running', started_at=now()` update before, `done`/`failed` +
`finished_at` + `result`/`error` after.

**skip_research jobs:** `params.skip_research = true` means the human knows this person
— the dashboard's Skip-to-Writer flow collected a required "how I know them" note and
stored it as the `personalization_seed` (older rows may carry it in `contacts.notes`;
read both). For these contacts the seed IS the relationship. **Lead with the real
relationship and drop the cold-intro framing entirely** — no "I know we haven't been
introduced", no credentials-establishing paragraph a friend wouldn't need. There is no
contact-enrich dossier to cite; the human's note is the contact dossier, and the play is
almost always `warm-reactivation` or `warm-referral`, not `cold-outbound`.

## Step 1 — Load the four-dossier composition (per contact)

All four, every time. A draft written from fewer than four inputs is a guess.

1. **Contact dossier (the recipient's truth).** Latest contact-enrich output:

   ```sql
   select output->>'dossier_md' from tool_outputs
   where contact_id = '<contact_id>' and tool_id = 'contact-enrich'
   order by version desc limit 1;
   ```

   Plus the distilled fields on the contacts row: `personalization_seed`,
   `recommended_angle`, `buying_role_hypothesis`, `notes`. For skip_research contacts
   there is no dossier row — the seed/notes are the whole recipient side.

2. **Salesperson dossier (matchmaking fuel).** `clients/<client>/dossier/people/<person>.md`
   — especially "Matchmaking fuel" and "Voice notes". This is the 1:1 human-to-human
   half: surface genuine seams between THIS salesperson and THIS target (shared past
   companies, alumni networks, communities, geography with real ties). A seam the
   enrich dossier already verified beats one you infer here.

3. **Company + product dossiers (proof points + wedges).**
   `clients/<client>/dossier/company.md` + `dossier/product.md` — proof points, the
   competitive wedge that fits this buyer, the usage notes ("for founders lead with X,
   for VPs lead with Y"). Every claim about the client in the copy traces here.

4. **Voice — the hard constraints.** `clients/<client>/voice.md` VERBATIM, including
   the **Learned rules** section — those are direct human feedback and bind exactly
   like the printed rules. PLUS the last ~5 draft_edits rows for this client as
   few-shot of how this human actually edits:

   ```sql
   select channel, draft_subject, final_subject, draft_body, final_body, feedback
   from draft_edits
   where client_id = (select id from clients where slug = '<client>')
   order by created_at desc limit 5;
   ```

   Read the draft→final diffs and the feedback notes, then **match where the human
   lands, not where the model starts.** If the table is empty (new client), say so in
   the report and lean harder on voice.md's reference frameworks.

Also load `clients/<client>/icp-research.md` "Message angles" **if the file exists** —
it ranks which angles work for this persona. Reference frameworks (e.g., saren's two
in `dossier/sources/Professional Dossier - May 2026.md`) are few-shot for register and
structure — never copy them verbatim into a draft.

## Step 2 — The sequence plan (~3 touches, flexes 2-4)

Default shape is 3 touches; flex to 2 (warm relationship where a follow-up nudge is
all that's earned) or 4 (cold, high-fit, multi-channel) by judgment — say why in the
plan. Cadence is the pipeline's +2/+4 rhythm (touch 2 = +2 days after touch 1,
touch 3 = +4 days after touch 2), matching what `v_pipeline` computes for next_due.

Per touch, the plan states:

- **Angle** — which message angle, and why it fits THIS contact (tie to the
  recommended_angle / icp-research.md when present).
- **Channel** — `email` or `linkedin`. LinkedIn touches only when the contact has a
  linkedin_url; respect the client's channel constraints in voice.md.
- **Timing** — day offsets per the cadence above.
- **The specific personalization hook** that touch will use — a named fact from the
  contact dossier (with its dossier line) or the relationship note. "Something about
  their company" is not a hook; "her March webinar on attribution (dossier: What
  they're saying publicly, item 2)" is.

Each touch gets a DIFFERENT hook or a deliberate escalation of the same one — three
touches that repeat one hook is one touch sent three times.

## Step 3 — Touch-1 copy (the only copy written now)

Write the full touch-1 email. Quality bar — every item is a hard check, not a vibe:

- **Recipient traceability:** every claim about the recipient traces to a specific
  line of the contact dossier (or the skip_research note). Cite which line in the plan
  doc. No citation → cut the claim.
- **Client traceability:** every claim about the client (metrics, case studies,
  capabilities) traces to company.md / product.md. Don't round 70% up to 75%, don't
  blend two case studies into one.
- **Voice rules are HARD constraints.** A banned phrase or banned CTA anywhere in the
  draft = automatic rewrite before anything is stored. Learned rules count double —
  they're corrections the human already had to make once.
- **80–120 words.** Length is earned by specificity, never volume.
- **Subjects per the client's voice** — lowercase for saren. `subject_b` only when the
  client's voice allows A/B testing: saren's voice.md doesn't forbid it (allowed);
  wethosai allows A/B on Email 1 only. When in doubt, one subject.
- **Plain text**, reads like the salesperson typed it. Match the draft_edits few-shot
  register — first drafts trend stiff; loosen before storing, not after the human
  complains.
- **No email on record** (`email` null or `email_status` not verified/valid): still
  write and store everything, but flag loudly in the report — **"no email — needs
  enrich or manual lookup before send."** Never guess an address.

## Step 4 — Write back to Supabase

**4a. The sequences row.** Live schema notes: the `sequences_status_check` constraint
has NO `'drafted'` value — use **`status = 'queued'`** (= drafted, awaiting human
review; `v_pipeline` keys off the row's existence, so the contact shows
`sequenced`/`review_and_send` either way). `play` must be one of
`cold-outbound | warm-reactivation | warm-referral` — pick the best fit (skip_research
relationships are warm by definition).

```sql
insert into sequences (contact_id, play, status, subject_a, subject_b, email_body,
                       started_at, updated_at)
values ('<contact_id>', '<play>', 'queued', '<subject_a>',
        <'<subject_b>' or null per the A/B rule>, $body$<touch-1 copy>$body$,
        now(), now())
returning id;
```

**4b. The full plan in tool_outputs** (versioned — a rewrite is a NEW version, never an
overwrite). Live constraint: `export_format` must be `'markdown'`, not `'md'`:

```sql
insert into tool_outputs (tool_id, contact_id, sequence_id, output, export_format, version, created_at)
values ('sequence-writer', '<contact_id>', '<sequence_id>',
        jsonb_build_object('plan_md', $plan$<full plan markdown>$plan$::text),
        'markdown',
        coalesce((select max(version)+1 from tool_outputs
                  where contact_id = '<contact_id>' and tool_id = 'sequence-writer'), 1),
        now());
```

The plan markdown contains: header (contact, client, play, date, skip_research flag),
the per-touch plan table, the touch-1 copy, the traceability map (claim → source line),
and the weakest-part note.

**4c. Advance the stage** (never regress a live outreach):

```sql
update contacts set stage = 'sequenced', last_action_date = now(), updated_at = now()
where id = '<contact_id>' and stage in ('sourced','enriched');
```

The contact now appears in the dashboard **Review queue** (`review_and_send`). The
human polishes there (edits land in `draft_edits` — the loop this skill learns from),
pushes to Gmail drafts, and sends. None of that is this skill's job.

## Step 5 — Report per contact

Concise, in chat, per contact:

- **Subject line(s)** as written.
- **The hook used** in touch 1, and its source (dossier line / relationship note).
- **The matchmaking seam used** — or "none used" with one line on why.
- **One honest "weakest part of this draft" note** — the claim with the thinnest
  sourcing, the line most likely to get edited, or the assumption the human should
  verify. Every draft has one; naming it is what makes the Review pass fast.
- The **no-email flag** when applicable.
- Plan shape (N touches, channels, play).

Close with the handoff: "Sequence(s) at stage `sequenced`, in the Review queue. Review,
tweak (edits train the voice), push to Gmail drafts, and send from there."

## Never

- **Never send anything, never push Gmail drafts.** The human does both from Review.
  This skill's last write is the DB.
- **Never invent facts** — about the recipient, the client, or the relationship. An
  unsourced claim is cut, not softened.
- **Never reuse another contact's copy.** Each draft starts from THIS contact's
  dossier. Resemblance is failure, not efficiency.
- **Never apply another client's voice**, exclusions, frameworks, or learned rules.
  Per-client isolation throughout — load only `clients/<client>/`.
- **Never widen the eligible set** past stage-'enriched' + explicitly-named contacts.
- **Never spend Apollo credits** — a missing email gets the flag, not a silent
  enrichment (that's contact-enrich's gated Step 4).

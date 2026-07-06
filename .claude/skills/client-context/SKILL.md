---
name: client-context
description: >
  Switches the active prospecting client by natural language. Use the MOMENT the user
  says "switch to <client>", "work on <client>", "I'm doing <client> now", "load
  <client>", "new client <name>", or otherwise signals they want a different client's
  context. Sets the active client, loads their ICP and prior work, and points every
  downstream skill (icp-builder, apollo-people-search, the /sales suite) at
  clients/<client>/. Also lists known clients and creates new ones. This is the
  filing-cabinet switch for a multi-client prospecting workflow — trigger it eagerly,
  because running the wrong client's targeting against the wrong company is the costly
  failure this skill exists to prevent.
---

# Client Context

Manage which client is active. Everything else in this project reads the active client
to know where to write and what ICP to use. One job: keep the workspace pointed at the
right client.

## State convention

The active client is stored in a single file at the project root: `.active-client`
(plain text, just the client's folder name, e.g. `acme`). Per-client work lives under
`clients/<client>/`:

```
clients/
└── acme/
    ├── icp.json                 ← from icp-builder
    ├── IDEAL-CUSTOMER-PROFILE.md ← optional, from suite's sales-icp
    ├── targets/                 ← from apollo-people-search (one folder per company)
    │   └── <company>/
    │       ├── target.json      ← structured handoff
    │       └── DECISION-MAKERS.md ← suite-readable seed
    └── pipeline.md              ← running state for this client
```

## Commands this skill handles

**Switch:** "switch to Acme" →
1. Slugify the name (`Acme Corp` → `acme-corp`). Match against existing folders in
   `clients/`; if ambiguous, list matches and ask.
2. If the folder exists: write the slug to `.active-client`, then report what's loaded
   — ICP present? how many targets? last pipeline note? — so the user knows the state.
3. If it does NOT exist: confirm they want to create it before making anything.

**Create:** "new client Acme" / "add a client" → this is onboarding, not navigation.
Hand off to **client-intake**, which creates the folder and captures the profile. Don't
create a bare client folder here.

**List:** "which clients do I have" / "list clients" → enumerate `clients/` subfolders,
mark which is active, summarize each (ICP yes/no, target count).

**Who's active:** "which client am I on" → read and report `.active-client`.

## Hard rules

- NEVER switch silently. Always confirm the switch and report the loaded state, so the
  user can't unknowingly run Client A's ICP against Client B's prospects.
- NEVER create a client folder without explicit confirmation.
- If a downstream skill runs with no `.active-client` set, that skill should route back
  here first.

## Handoff

After a switch, state the active client and the obvious next step given its state
(no ICP → "run icp-builder"; ICP but no targets → "run apollo-people-search"; targets
present → "run /sales prospect on a target or /sales outreach").

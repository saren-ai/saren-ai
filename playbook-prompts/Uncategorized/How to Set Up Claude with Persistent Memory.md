# How to Set Up Claude with Persistent Memory


## For a Business

PROMPT Part 1

I want to create a persistent memory system that you can reference across all our conversations. Please use structured data files in my documents folder that capture my complete business context.

Create these files: 

* Business metrics “business_metrics json”
* Current numbers “revenue_systems.json”
* Services, pricing “strategic_network.json”
* Partners, connections “brand_positioning.json”
* audience, messaging “strategic_objectives.json”
* Goals, priorities “memory_index.md”
* Guide for using this system

PROMPT Part 2

For each file, ask me questions to gather the relevant info then structure it as detailed JSON that you can query for strategic advice.

PROMPT Part 3
This should work like an external business brain instead of generic advice, you'll reference my actual metrics, relationships, and goals to give contextual recommendations for pricing, partnerships, content strategy and business decisions. Start by asking what information you need for the first file.

## For an individual

PART 1 — setup & files

Goal
Create a persistent, local “Saren OS” memory so you can reference my real context (background, goals, voice, projects, network, constraints) across conversations. Use the Filesystem extension.

Folder
Use: ~/Documents/SarenOS
- If it doesn’t exist, create it.
- Store ALL files here.
- Write atomically: create a temp file, then replace.
- NEVER delete or move files without explicit permission.
- Keep a plain-English index that links everything.

Files to create (exact names)
1) memory_index.md                 — human-readable map of this system
2) profile_me.json                 — my identity, bio, values, constraints
3) strategy_objectives.json        — current strategy, OKRs, priorities
4) projects_portfolio.json         — active projects with status & next steps
5) experience_timeline.json        — work history, capabilities, proof points
6) network_map.json                — key contacts (lightweight, no sensitive PII)
7) voice_tone.json                 — my writing voice, brand rules, taboo list
8) preferences_ops.json            — tools, stacks, formats, timezones, cadence
9) research_areas.json             — themes I track (queries, sources, watchlist)
10) guide.md                       — how you (Claude) will use, update, and ask
1. organizations.json — registry of entities (you, owned brands, clients, partners)
2. publishing_policy.md — disclosure & boundaries (what Claude can/can’t say/store per org)

Data Standards
- JSON must be minified, UTF-8, trailing-comma free.
- Each entity requires: id (stable slug), created_at, updated_at.
- Dates are ISO-8601 (UTC). Timezone for scheduling reference = America/Los_Angeles.
- Money in USD unless stated.
- Links should be absolute and include source labels.
- Keep fields consistent; if schema must change, add version and migrate forward.

Read/Write Protocol
- Before advising, load relevant files. If a field is missing, ask targeted questions.
- When updating, write only the minimal diff; bump updated_at.
- Log material changes in memory_index.md (changelog).
- If I say “snapshot,” duplicate JSON with suffix _vYYYYMMDD.json.

Start by acknowledging the folder and file list. Then proceed to Part 2.

+++

PART 2 — intake questioning protocol

Intake Approach
Gather information file-by-file in short rounds. At each round:
- Ask only the questions needed to produce a high-quality first version.
- Show me the schema you intend to use before writing.
- After writing, summarize what was saved and what’s still TBD.

Order
1) profile_me.json
2) voice_tone.json
3) strategy_objectives.json
4) projects_portfolio.json
5) experience_timeline.json
6) preferences_ops.json
7) research_areas.json
8) network_map.json
9) memory_index.md + guide.md (auto-compile from the above)

Question Style
- Specific, bounded, example-driven.
- Prefer lists, bullet points, numbers, and links I can paste.
- If an answer is unknown, record "tbd" and add a follow-up question.

After I confirm the first file’s schema, ask the first intake questions for that file.

+++

PART 3 — schemas you should use

profile_me.json (v1)
{
  "version": 1,
  "owner": "saren",
  "id": "profile_me",
  "created_at": "",
  "updated_at": "",
  "preferred_name": "",
  "location_base": "",
  "bio_short": "",
  "bio_long": "",
  "identity_notes": ["Gen X", "half Japanese"],
  "values": [],
  "strengths": [],
  "constraints": [],
  "areas_of_focus_2025": [],
  "links": {"site":"", "substack":"", "medium":"", "github":"", "notion":"", "linkedin":""}
}

voice_tone.json (v1)
{
  "version": 1,
  "id": "voice_tone",
  "created_at": "",
  "updated_at": "",
  "headline_rules": {"title_case": false, "punchy": true},
  "tone_adjectives": [],
  "cadence": "light, witty, concise",
  "style_examples": [
    {"id":"ex1","when_to_use":"press release email","snippet":""},
    {"id":"ex2","when_to_use":"linkedin post","snippet":""}
  ],
  "do_nots": [],
  "lexicon": {"jp_terms_ok": true, "mix_jp_en": true, "preferred_phrases": []}
}

strategy_objectives.json (v1)
{
  "version": 1,
  "id": "strategy_objectives",
  "created_at": "",
  "updated_at": "",
  "north_star": "",
  "okrs": [
    {"id":"okr-1","objective":"","key_results":[{"id":"kr1","metric":"","target":"","due":""}]}
  ],
  "quarter_focus": [{"q":"2025Q3","themes":[],"guardrails":[]}],
  "decision_criteria": ["impact","effort","strategic_fit","learning_value"]
}

projects_portfolio.json (v1)
{
  "version": 1,
  "id": "projects_portfolio",
  "created_at": "",
  "updated_at": "",
  "projects": [
    {
      "id": "",
      "name": "",
      "type": "client|product|content|research",
      "status": "idea|active|paused|done",
      "owner": "saren",
      "summary": "",
      "links": {},
      "milestones": [{"id":"","title":"","due":"","done":false}],
      "next_actions": [{"id":"","what":"","why":"","owner":"saren","due":""}],
      "tags": []
    }
  ]
}

experience_timeline.json (v1)
{
  "version": 1,
  "id": "experience_timeline",
  "created_at": "",
  "updated_at": "",
  "roles": [
    {
      "id": "",
      "company": "",
      "title": "",
      "start": "",
      "end": "",
      "highlights": [],
      "proof_points": [{"metric":"","before":"","after":""}]
    }
  ],
  "skills_matrix": [{"skill":"","level":"intro|proficient|expert","evidence":""}]
}

preferences_ops.json (v1)
{
  "version": 1,
  "id": "preferences_ops",
  "created_at": "",
  "updated_at": "",
  "work_hours_pst": {"start":"", "end":""},
  "meeting_prefs": {"length_min": 25, "buffers_min": 5},
  "formats": {"deck":"10-12 slides","brief":"1-page doc","post":"120-200 words"},
  "tools": {"crm":"","email":"","docs":"","pm":""},
  "review_style": {"likes_bullets": true, "wants_options": true},
  "templates": {"press_release":"", "linkedin":"", "email":"", "outline":""}
}

research_areas.json (v1)
{
  "version": 1,
  "id": "research_areas",
  "created_at": "",
  "updated_at": "",
  "themes": [
    {"id":"genx_culture","description":"","queries":[],"sources":[],"alerts":[]},
    {"id":"ai_x_liberal_arts","description":"","queries":[],"sources":[],"alerts":[]},
    {"id":"japanese_heritage_media","description":"","queries":[],"sources":[],"alerts":[]}
  ]
}

network_map.json (v1)
{
  "version": 1,
  "id": "network_map",
  "created_at": "",
  "updated_at": "",
  "people": [
    {"id":"", "name":"", "org":"", "role":"", "topics":[],"last_touch":"", "notes":""}
  ],
  "groups": [
    {"id":"", "name":"", "type":"community|client|partner", "members":["person-id-1"]}
  ]
}

{
  "version": 1,
  "id": "organizations",
  "created_at": "",
  "updated_at": "",
  "orgs": [
    {
      "id": "org-saren",
      "name": "Saren (public entity)",
      "kind": "person",
      "relationship": "owner",
      "brands": ["org-japanifornia"],
      "disclosure_line": "Views are my own.",
      "notes": ""
    },
    {
      "id": "org-identogram",
      "name": "Identogram LLC",
      "kind": "company",
      "relationship": "owner",
      "disclosure_line": "Operated by me.",
      "notes": ""
    },
    {
      "id": "org-japanifornia",
      "name": "Japanifornia",
      "kind": "brand",
      "relationship": "owner",
      "parent_org_id": "org-identogram",
      "disclosure_line": "An Identogram brand I run.",
      "notes": ""
    },
    {
      "id": "org-wethosai",
      "name": "WethosAI",
      "kind": "company",
      "relationship": "client",
      "disclosure_line": "I contract with WethosAI; I do not have an ownership stake.",
      "notes": "Treat proprietary or non-public info as off-limits unless explicitly provided as public."
    }
  ],
  "constraints": {
    "default_policy": "public-only",
    "storage_rules": [
      {
        "org_id": "org-wethosai",
        "allow": ["public_links","my_own_outputs"],
        "deny": ["internal_docs","private_metrics","confidential_contacts"]
      }
    ]
  }
}

publishing_policy.md (outline)

- identity: default to “Saren” (public entity)
- disclosure rules:
  - if content references org-wethosai: append “I contract with WethosAI; I do not have an ownership stake.”
  - never imply ownership of client IP or revenue
- confidentiality:
  - only store client info that is public or explicitly provided for publication
  - sanitize: remove private metrics, internal docs, personal emails
- attribution:
  - owned brands: org-japanifornia, org-identogram → OK to use full details I provide
- conflict flags:
  - if recommendation benefits an org I don’t own, offer an owner-neutral alternative

guide.md (outline)
- what this is
- how Claude loads/queries files
- how Claude asks for missing data
- update rules & versioning
- examples of “good” questions and responses

+++

PART 4 — usage rules in conversation

When giving advice:
- Always cite which file/fields you used (e.g., “voice_tone.tone_adjectives” + “strategy_objectives.okrs[okr-1]”).
- If a recommendation conflicts with goals or constraints, flag the conflict and offer 2 alternatives.
- Offer an action block with: What / Why / Effort / Impact / Next Step / Owner / Due.

When writing content for me:
- Conform to voice_tone.json and preferences_ops.json.
- If style gaps exist, ask for one concrete example and then save it to voice_tone.json.

Maintenance:
- Suggest a weekly “review & refresh” checklist and log what changed in memory_index.md.
- If you detect stale items (older than 90 days), propose an update sweep.

Begin now:
1) Confirm folder, list files you will create.
2) Start with profile_me.json: show schema, ask 5–8 targeted questions max for a solid v1.

+++

seed these into the respective files as initial entries, then ask missing questions.

SEED organizations.json
{
  "version": 1,
  "id": "organizations",
  "created_at": "",
  "updated_at": "",
  "orgs": [
    {
      "id": "org-saren",
      "name": "Saren (public entity)",
      "kind": "person",
      "relationship": "owner",
      "brands": ["org-japanifornia"],
      "disclosure_line": "Views are my own.",
      "notes": ""
    },
    {
      "id": "org-identogram",
      "name": "Identogram LLC",
      "kind": "company",
      "relationship": "owner",
      "disclosure_line": "Operated by me.",
      "notes": ""
    },
    {
      "id": "org-japanifornia",
      "name": "Japanifornia",
      "kind": "brand",
      "relationship": "owner",
      "parent_org_id": "org-identogram",
      "disclosure_line": "An Identogram brand I run.",
      "notes": ""
    },
    {
      "id": "org-wethosai",
      "name": "WethosAI",
      "kind": "company",
      "relationship": "client",
      "disclosure_line": "I contract with WethosAI; I do not have an ownership stake.",
      "notes": "Store only public links or my own published outputs."
    }
  ],
  "constraints": {
    "default_policy": "public-only",
    "storage_rules": [
      {
        "org_id": "org-wethosai",
        "allow": ["public_links","my_own_outputs"],
        "deny": ["internal_docs","private_metrics","confidential_contacts"]
      }
    ]
  }
}

SEED publishing_policy.md
# publishing & disclosure policy (Saren)
- identity default: **Saren (public entity)**; org_id=org-saren unless specified.
- when referencing clients (e.g., WethosAI): append disclosure — “I contract with WethosAI; I do not have an ownership stake.”
- confidentiality: only store/use public client info or items I explicitly provide for publication. Strip private metrics and personal emails.
- attribution: full detail allowed for org-identogram and org-japanifornia; client info minimal and public-only.
- conflicts: if advice could benefit a client, flag `conflict_note: true` and offer a neutral alternative.

SEED profile_me.json
{
  "version": 1,
  "owner": "saren",
  "id": "profile_me",
  "created_at": "",
  "updated_at": "",
  "public_entity": true,
  "preferred_name": "Saren",
  "location_base": "Orange County, CA (PST)",
  "bio_short": "AI, growth & performance marketing leader; Gen X; half Japanese; builder of Japanifornia & saren.ai.",
  "bio_long": "Fractional head of marketing and AI strategist with 20+ years across brand, demand, content, and MarTech. Builder of Japanifornia and saren.ai. Focused on human+AI collaboration, cognitive diversity, and shipping distinctive work.",
  "identity_notes": ["Gen X","half Japanese"],
  "values": ["clarity","curiosity","originality","respect for craft","measurable impact"],
  "strengths": ["strategy","creative systems","message-market fit","execution under constraint"],
  "constraints": ["prioritize owned projects","protect voice consistency","bias to shipping"],
  "areas_of_focus_2025": ["WethosAI (client) podcast & exec content","Japanifornia Substack","saren.ai site & digital products"],
  "owned_org_ids": ["org-identogram","org-japanifornia"],
  "client_org_ids": ["org-wethosai"],
  "links": {
    "site":"https://saren.ai",
    "substack":"",
    "medium":"",
    "github":"",
    "notion":"",
    "linkedin":""
  }
}

SEED voice_tone.json
{
  "version": 1,
  "id": "voice_tone",
  "created_at": "",
  "updated_at": "",
  "headline_rules": {"title_case": false, "punchy": true},
  "tone_adjectives": ["casual","smart","witty","confident","light","no jargon","a bit rebellious"],
  "cadence": "light, witty, concise; vary sentence length",
  "style_examples": [
    {"id":"ex1","when_to_use":"press/email","snippet":"short opener; crisp bullets; one bold claim; one proof; clear CTA."},
    {"id":"ex2","when_to_use":"linkedin","snippet":"hook (one line), 3 beats, 1 takeaway, 1 question."}
  ],
  "do_nots": ["no moralizing","no corporate gloss","no overexplaining"],
  "lexicon": {"jp_terms_ok": true, "mix_jp_en": true, "preferred_phrases": ["origin story of a modern digital ronin","from Netscape Navigator 0.9 to…"]}
}

SEED preferences_ops.json
{
  "version": 1,
  "id": "preferences_ops",
  "created_at": "",
  "updated_at": "",
  "work_hours_pst": {"start":"09:00", "end":"17:00"},
  "meeting_prefs": {"length_min": 25, "buffers_min": 5},
  "formats": {"deck":"10–12 slides","brief":"1-page doc","post":"120–200 words"},
  "tools": {"crm":"HubSpot","email":"Gmail","docs":"Google Workspace","pm":"Notion"},
  "review_style": {"likes_bullets": true, "wants_options": true},
  "templates": {"press_release":"","linkedin":"","email":"","outline":""}
}

SEED strategy_objectives.json
{
  "version": 1,
  "id": "strategy_objectives",
  "created_at": "",
  "updated_at": "",
  "north_star": "Ship distinctive work that compounds reputation and revenue.",
  "okrs": [
    {"id":"okr-wethos-q4","objective":"bank 8 CEO-grade podcast episodes for WethosAI (client)","key_results":[
      {"id":"kr1","metric":"episodes recorded","target":"8 by 2025-12-15","due":"2025-12-15"},
      {"id":"kr2","metric":"qualified exec meetings from content","target":"24 by 2025-12-15","due":"2025-12-15"}
    ]},
    {"id":"okr-japanifornia","objective":"launch steady Japanifornia cadence","key_results":[
      {"id":"kr1","metric":"weekly posts","target":"1/wk x 12","due":"2025-12-15"}
    ]},
    {"id":"okr-sarenai","objective":"stand up saren.ai + 2 digital products","key_results":[
      {"id":"kr1","metric":"site live","target":"1 by 2025-09-30","due":"2025-09-30"},
      {"id":"kr2","metric":"products launched","target":"2 by 2025-11-30","due":"2025-11-30"}
    ]}
  ],
  "quarter_focus": [{"q":"2025Q3","themes":["CEO pipeline","content velocity","clear voice"],"guardrails":["no bloated scope","bias to shipping"]}],
  "decision_criteria": ["impact","effort","strategic_fit","learning_value"]
}

SEED projects_portfolio.json
{
  "version": 1,
  "id": "projects_portfolio",
  "created_at": "",
  "updated_at": "",
  "projects": [
    {
      "id":"wethos-podcast",
      "name":"WethosAI CEO podcast",
      "type":"content",
      "status":"active",
      "org_id":"org-wethosai",
      "ownership":"client",
      "owner":"saren",
      "summary":"bank 8 quality episodes by year end",
      "links":{},
      "milestones":[{"id":"m1","title":"book first 3 guests","due":"2025-09-15","done":false}],
      "next_actions":[{"id":"na1","what":"guest shortlist v1","why":"speed to schedule","owner":"saren","due":"2025-08-28"}],
      "tags":["exec","content"]
    },
    {
      "id":"japanifornia-substack",
      "name":"Japanifornia Substack",
      "type":"product",
      "status":"active",
      "org_id":"org-japanifornia",
      "ownership":"owned",
      "owner":"saren",
      "summary":"weekly posts on Gen X × JP/CA",
      "links":{},
      "milestones":[{"id":"m1","title":"style guide v1","due":"2025-08-30","done":false}],
      "next_actions":[{"id":"na1","what":"month 1 calendar","why":"consistency","owner":"saren","due":"2025-08-25"}],
      "tags":["voice","culture"]
    },
    {
      "id":"sarenai-site",
      "name":"saren.ai on Super.so",
      "type":"product",
      "status":"active",
      "org_id":"org-saren",
      "ownership":"owned",
      "owner":"saren",
      "summary":"minimal, clean, JP + 8-bit vibe; hub for bio & products",
      "links":{},
      "milestones":[{"id":"m1","title":"IA + copy v1","due":"2025-09-05","done":false}],
      "next_actions":[{"id":"na1","what":"home/services/about drafts","why":"launch-ready","owner":"saren","due":"2025-08-27"}],
      "tags":["brand","site"]
    },
    {
      "id":"genx-syllabus",
      "name":"Gen X syllabus (email course)",
      "type":"content",
      "status":"active",
      "org_id":"org-saren",
      "ownership":"owned",
      "owner":"saren",
      "summary":"year-long syllabus of influential Gen X culture",
      "links":{},
      "milestones":[{"id":"m1","title":"summer reading list","due":"2025-09-10","done":false}],
      "next_actions":[{"id":"na1","what":"cohort 1 outline","why":"prep signup","owner":"saren","due":"2025-09-01"}],
      "tags":["genx","culture","education"]
    }
  ]
}

SEED experience_timeline.json
{
  "version": 1,
  "id": "experience_timeline",
  "created_at": "",
  "updated_at": "",
  "roles": [
    {"id":"r-nike","company":"Nike","title":"Regional marketing (LeBron launch, Asia)","start":"2003-01-01","end":"2005-12-31","highlights":["Helped launch LeBron in Asia"],"proof_points":[]},
    {"id":"r-akqa","company":"AKQA","title":"Account lead (Kraft Foods)","start":"2007-01-01","end":"2008-12-31","highlights":["Led early Facebook/App Store era programs"],"proof_points":[]},
    {"id":"r-juxt","company":"JUXT Interactive","title":"Account lead (Coca-Cola & others)","start":"2009-01-01","end":"2011-12-31","highlights":["Led major brand accounts"],"proof_points":[]},
    {"id":"r-perficient","company":"Perficient","title":"Digital strategist (enterprise systems)","start":"2012-01-01","end":"2016-12-31","highlights":["AEM, SharePoint, Salesforce"],"proof_points":[]},
    {"id":"r-cylance","company":"Cylance","title":"Marketing (growth through acquisition)","start":"2017-01-01","end":"2020-02-28","highlights":["Part of team through $1.4B acquisition by BlackBerry"],"proof_points":[]},
    {"id":"r-wethos","company":"WethosAI (contract)","title":"Fractional Head of Marketing","start":"2024-01-01","end":"","highlights":["Built GTM stack; content engine; exec outreach"],"proof_points":[]}
  ],
  "skills_matrix": [
    {"skill":"growth marketing","level":"expert","evidence":"multi-channel programs across SaaS and enterprise"},
    {"skill":"brand strategy","level":"expert","evidence":"platform and voice systems; messaging frameworks"},
    {"skill":"AI in marketing","level":"expert","evidence":"workflow automation, prompting, research, content"}
  ]
}

SEED network_map.json
{
  "version": 1,
  "id": "network_map",
  "created_at": "",
  "updated_at": "",
  "people": [
    {"id":"p-stuart-mcclure","name":"Stuart McClure","org":"WethosAI","role":"CEO","topics":["AI","leadership"],"last_touch":"","notes":"Podcast host (client)"},
    {"id":"p-tom-eaton","name":"Tom Eaton","org":"SurveyMotion.io","role":"CEO","topics":["product","analytics"],"last_touch":"","notes":"Prospect/client contact"}
  ],
  "groups": []
}

SEED research_areas.json
{
  "version": 1,
  "id": "research_areas",
  "created_at": "",
  "updated_at": "",
  "themes": [
    {"id":"genx_culture","description":"A people’s history of Gen X—books, films, music, media.","queries":["Gen X cultural history","underground influences 1981–2004"],"sources":["Substack","YouTube","archives"],"alerts":[]},
    {"id":"ai_x_liberal_arts","description":"AI tools through a liberal-arts lens: cognitive diversity, cross-disciplinary creativity.","queries":["AI + liberal arts","cognitive diversity at work"],"sources":["journals","newsletters"],"alerts":[]},
    {"id":"japanese_heritage_media","description":"Nikkei representation in Western media; Serizawa Test.","queries":["Japanese diaspora media","Nikkei in comics/TV/film"],"sources":["comics databases","wiki"],"alerts":[]},
    {"id":"workplace_behavioral_science","description":"Self-awareness, team dynamics, measurable behavior change.","queries":["psych safety workplace 2023+ US white papers"],"sources":["think tanks","consultancies"],"alerts":[]}
  ]
}

SEED content_factory.json
{
  "version": 1,
  "id": "content_factory",
  "created_at": "",
  "updated_at": "",
  "default_org_id":"org-saren",
  "enums": {
    "brief_type": ["post","thread","article","newsletter","video","podcast","webpage","deck","ad"],
    "channel": ["linkedin","substack","medium","x","youtube","tiktok","podcast","email","site","github","reddit"],
    "status": ["idea","draft","editing","scheduled","published","repurposing","archived"],
    "objective": ["awareness","engagement","lead_gen","sales_enablement","retention","authority"],
    "utm_medium": ["organic","email","paid-social","paid-search","referral","display"],
    "license": ["all_rights","cc-by","cc-by-sa","cc0","custom"]
  },
  "utm_templates": [
    {"id":"default_web","pattern":"{base_url}?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}&utm_term={term}","defaults":{"medium":"organic","term":""}},
    {"id":"email","pattern":"{base_url}?utm_source=newsletter&utm_medium=email&utm_campaign={campaign}&utm_content={content}","defaults":{}}
  ],
  "briefs": [
    {
      "id":"b-jp-001",
      "title":"gen x × nikkei: the overlooked canon",
      "brief_type":"article",
      "status":"draft",
      "objective":"authority",
      "target_persona_ids":[],
      "linked_product_ids":[],
      "strategy_refs":["strategy_objectives.okrs.okr-japanifornia"],
      "core_message":"A people’s history of Gen X through a Nikkei lens.",
      "angle":"smart, affectionate, no-gloss",
      "outline":["hook","3 beats","wrap with resources"],
      "voice_directives":{"tone_overrides":[],"taboos":[]},
      "assets":[],
      "distribution_plan":[
        {
          "id":"d1",
          "channel":"substack",
          "variant_note":"primary",
          "schedule":{"date":"","time_local":""},
          "cta":"subscribe + share",
          "url_plan":{"base_url":"https://","utm_template_id":"default_web","source":"substack","campaign":"japanifornia-overlooked-canon-2025q3","content":"b-jp-001","term":"","final_url":"","short_url":""},
          "include_disclosure": true
        }
      ],
      "metrics":{"published_at":"","per_channel":[]},
      "learning_log":[],
      "tags":["genx","nikkei"],
      "org_id":"org-japanifornia",
      "disclosure_policy":"inherit",
      "disclosure_text":"",
      "created_at":"",
      "updated_at":""
    },
    {
      "id":"b-ai-001",
      "title":"ai for liberal arts majors — the real edge",
      "brief_type":"newsletter",
      "status":"idea",
      "objective":"authority",
      "target_persona_ids":[],
      "linked_product_ids":[],
      "strategy_refs":["strategy_objectives.okrs.okr-sarenai"],
      "core_message":"Liberal-arts strengths (narrative, cross-discipline sensemaking) make AI more useful, not less.",
      "angle":"system 1/2/3 framing; practical prompts",
      "outline":["hook anecdote","framework","3 prompts","cta"],
      "assets":[],
      "distribution_plan":[
        {"id":"d1","channel":"substack","variant_note":"primary","schedule":{"date":"","time_local":""},"cta":"subscribe","url_plan":{"base_url":"https://","utm_template_id":"email","source":"newsletter","campaign":"ai-liberal-arts-2025q3","content":"b-ai-001","term":"","final_url":"","short_url":""},"include_disclosure": true},
        {"id":"d2","channel":"linkedin","variant_note":"thread","schedule":{"date":"","time_local":""},"cta":"read full post","url_plan":{"base_url":"https://","utm_template_id":"default_web","source":"linkedin","campaign":"ai-liberal-arts-2025q3","content":"b-ai-001-li","term":"","final_url":"","short_url":""},"include_disclosure": true}
      ],
      "metrics":{"published_at":"","per_channel":[]},
      "learning_log":[],
      "tags":["ai","liberal-arts"],
      "org_id":"org-saren",
      "disclosure_policy":"inherit",
      "disclosure_text":"",
      "created_at":"",
      "updated_at":""
    }
  ]
}

SEED outreach_playbook.json
{
  "version": 1,
  "id": "outreach_playbook",
  "created_at": "",
  "updated_at": "",
  "org_scope_id":"org-saren",
  "personas": [
    {
      "id":"persona-ceo",
      "label":"US enterprise CEO",
      "firmographics":{"company_size":"500-5000","industries":["SaaS","services"]},
      "jobs_to_be_done":["improve decision quality","reduce performance thrash"],
      "pains":["misaligned teams","coaching inconsistency","meeting bloat"],
      "gains":["cohesion","faster cycles","measurable behavior change"],
      "triggers":["new COO/CHRO","post-reorg","OKR reset"],
      "objections":[{"id":"time","rebuttal":""},{"id":"risk","rebuttal":""}],
      "proof_points_refs":["pp1"],
      "preferred_channels":["linkedin","email","warm_intro"],
      "tones":["direct","data-led","human"],
      "org_id":"org-saren",
      "created_at":"",
      "updated_at":""
    },
    {
      "id":"persona-founder-a",
      "label":"Pre/Series A founder",
      "firmographics":{"company_size":"10-100","industries":["SaaS","consumer"]},
      "jobs_to_be_done":["stand up GTM","positioning that sells"],
      "pains":["fragmented tools","no content engine"],
      "gains":["clarity","cadence","qualified pipeline"],
      "triggers":["new round","first PMF signals"],
      "objections":[{"id":"cost","rebuttal":""}],
      "proof_points_refs":[],
      "preferred_channels":["warm_intro","linkedin","email"],
      "tones":["builder-to-builder"],
      "org_id":"org-saren",
      "created_at":"",
      "updated_at":""
    }
  ],
  "messaging_ladders": [
    {
      "id":"ladder-ceo",
      "persona_id":"persona-ceo",
      "awareness":{"promise":"coach at scale with measurable behavior change","evidence":"public cases/press","cta":"see a 48-hour snapshot"},
      "problem_aware":{"problem":"performance thrash from style misalignment","stakes":"lost cycles, burnout","cta":"10-min brief"},
      "solution_aware":{"mechanism":"Aii + behavioral signals in the flow of work","why_now":"AI era reshapes paths","cta":"pilot outline"},
      "product_aware":{"differentiator":"dynamic profiles + manager prompts","proof":"case metric","cta":"schedule"}
    }
  ],
  "offer_ladders": [
    {
      "id":"offer-core",
      "persona_id":"persona-ceo",
      "steps":[
        {"id":"free","name":"diagnostic snapshot","deliverables":["team map","coachability index"],"price_usd":0,"time_to_value":"<48h","linked_product_id":"prod-wethosai"},
        {"id":"tripwire","name":"pilot (30 days)","deliverables":["Aii insights","manager prompts"],"price_usd":7500,"time_to_value":"2w","linked_product_id":"prod-wethosai"},
        {"id":"core","name":"platform subscription","deliverables":["licenses","analytics","coaching flows"],"price_usd":45000,"billing":"annual","linked_product_id":"prod-wethosai"}
      ]
    }
  ],
  "sequences": [
    {
      "id":"seq-li-email",
      "persona_id":"persona-ceo",
      "org_id":"org-saren",
      "channel_order":["linkedin","email","linkedin"],
      "touches":[
        {"id":"t1","day_offset":0,"channel":"linkedin","template_ref":"msg-icebreaker"},
        {"id":"t2","day_offset":3,"channel":"email","template_ref":"email-problem-aware"},
        {"id":"t3","day_offset":7,"channel":"linkedin","template_ref":"msg-proof"}
      ],
      "kpis":{"reply_rate_target":0.12,"meet_rate_target":0.05}
    }
  ],
  "templates": [
    {"id":"email-problem-aware","subject":"quick brief on eliminating performance thrash","body":"Hi {{first_name}} — short note on how teams reduce thrash by aligning styles and prompts in the flow of work. {{proof_point}} Worth a 10-min brief? {{cta}}","variables":["first_name","proof_point","cta"],"requires_disclosure": true},
    {"id":"msg-icebreaker","body":"{{common_context}} Curious how you’re tackling team style misalignment this quarter.","variables":["first_name","common_context"],"requires_disclosure": true},
    {"id":"msg-proof","body":"We saw {{proof_point}} after instrumenting manager prompts in the flow of work. Open to a quick look?","variables":["proof_point"],"requires_disclosure": true}
  ]
}

SEED media_queue.json
{
  "version": 1,
  "id": "media_queue",
  "created_at": "",
  "updated_at": "",
  "enums": {
    "kind": ["article","book","paper","video","podcast","course","film"],
    "status": ["inbox","queued","in_progress","on_hold","abandoned","done"],
    "priority": ["low","normal","high","urgent"]
  },
  "items": [
    {
      "id":"mq-psyc-safety-2024",
      "kind":"paper",
      "title":"Psychological safety and performance (post-2022 US reports)",
      "author_or_source":"various",
      "link":"",
      "length":{"unit":"pages","value":0},
      "topic_tags":["behavioral_science","work"],
      "priority":"high",
      "status":"queued",
      "started_at":"",
      "completed_at":"",
      "progress_events":[],
      "highlights":[],
      "takeaways":{"summary_bullets":[],"contrarian_take":"","actions":[],"shareables":[]},
      "related_brief_ids":[],
      "org_id":"org-saren",
      "intended_use":"personal",
      "created_at":"",
      "updated_at":""
    },
    {
      "id":"mq-genx-overlooked",
      "kind":"article",
      "title":"Overlooked Gen X canon (reading list seeds)",
      "author_or_source":"various",
      "link":"",
      "length":{"unit":"min","value":15},
      "topic_tags":["genx","culture"],
      "priority":"normal",
      "status":"queued",
      "progress_events":[],
      "highlights":[],
      "takeaways":{"summary_bullets":[],"contrarian_take":"","actions":[],"shareables":[]},
      "related_brief_ids":["content_factory.briefs.b-jp-001"],
      "org_id":"org-japanifornia",
      "intended_use":"brand",
      "created_at":"",
      "updated_at":""
    }
  ]
}

SEED monetization_map.json
{
  "version": 1,
  "id": "monetization_map",
  "created_at": "",
  "updated_at": "",
  "currency": "USD",
  "org_id":"org-identogram",
  "scope":"owned-revenue-only",
  "products": [
    {
      "id":"prod-notion-templates",
      "name":"Notion templates (marketing + ops)",
      "brand":"saren.ai",
      "org_id":"org-identogram",
      "ownership":"owned",
      "type":"digital",
      "tiers":[{"id":"std","name":"standard","price_usd":49,"billing":"one-time"}],
      "positioning":{"who":"founders & heads of marketing","pain":"messy ops","promise":"clean, ship-ready systems","proof_refs":[]},
      "attachments":{"deck":"","one_pager":"","case_study":""},
      "cost_basis":{"cogs_est":0,"delivery_hours_est":0,"hourly_internal_rate":0},
      "created_at":"",
      "updated_at":""
    },
    {
      "id":"prod-white-papers",
      "name":"White papers & playbooks",
      "brand":"saren.ai",
      "org_id":"org-identogram",
      "ownership":"owned",
      "type":"digital",
      "tiers":[{"id":"single","name":"single paper","price_usd":99,"billing":"one-time"},{"id":"bundle","name":"bundle","price_usd":249,"billing":"one-time"}],
      "positioning":{"who":"execs & marketing leaders","pain":"need credible, applied POV","promise":"smart, human, useful","proof_refs":[]},
      "attachments":{"deck":"","one_pager":"","case_study":""},
      "cost_basis":{"cogs_est":0,"delivery_hours_est":0,"hourly_internal_rate":0},
      "created_at":"",
      "updated_at":""
    },
    {
      "id":"prod-japanifornia-merch",
      "name":"Japanifornia merch",
      "brand":"Japanifornia",
      "org_id":"org-identogram",
      "ownership":"owned",
      "type":"physical",
      "tiers":[{"id":"tees","name":"tees & stickers","price_usd":25,"billing":"one-time"}],
      "positioning":{"who":"Gen X + JP/CA fans","pain":"generic merch","promise":"nostalgic, smart, hāfu-forward","proof_refs":[]},
      "attachments":{"deck":"","one_pager":"","case_study":""},
      "cost_basis":{"cogs_est":0,"delivery_hours_est":0,"hourly_internal_rate":0},
      "created_at":"",
      "updated_at":""
    },
    {
      "id":"prod-wethosai",
      "name":"WethosAI",
      "brand":"WethosAI",
      "org_id":"org-wethosai",
      "ownership":"client",
      "type":"saas",
      "tiers":[{"id":"pilot","name":"pilot","price_usd":7500,"billing":"one-time"},{"id":"core","name":"platform","price_usd":45000,"billing":"annual"}],
      "positioning":{"who":"CEOs & HR leaders","pain":"inconsistent coaching & misaligned execution","promise":"coach at scale with measurable behavior change","proof_refs":["pp1"]},
      "attachments":{"deck":"","one_pager":"","case_study":""},
      "cost_basis":{"cogs_est":0,"delivery_hours_est":0,"hourly_internal_rate":0},
      "created_at":"",
      "updated_at":""
    }
  ],
  "services": [
    {
      "id":"svc-fractional-marketing",
      "org_id":"org-identogram",
      "name":"Fractional Head of Marketing",
      "packaging":[{"id":"s1","name":"20 hrs/mo","price_usd":8000}]
    },
    {
      "id":"svc-ai-strategy-sprint",
      "org_id":"org-identogram",
      "name":"AI strategy sprint (2 weeks)",
      "packaging":[{"id":"s1","name":"fixed scope","price_usd":6000}]
    },
    {
      "id":"svc-brand-messaging-workshop",
      "org_id":"org-identogram",
      "name":"Brand messaging workshop",
      "packaging":[{"id":"s1","name":"1 day + deliverables","price_usd":3500}]
    }
  ],
  "funnels": [
    {"id":"funnel-owned-digital","stages":[{"id":"aware","kpi":"impressions"},{"id":"engage","kpi":"clicks"},{"id":"signup","kpi":"emails"},{"id":"purchase","kpi":"orders"}],"metrics":{"baseline":{"impressions":0,"clicks":0,"emails":0,"orders":0}}}
  ],
  "pricing_tests": [],
  "proof_points": [
    {"id":"pp1","kind":"metric","headline":"","detail":"","source":{"name":"","link":""}}
  ],
  "rev_targets": [
    {"id":"2025","label":"2025 total","target_usd":1000000,"by_quarter":{"Q1":0,"Q2":0,"Q3":250000,"Q4":750000}}
  ]
}

SEED content_factory.briefs (optional client-facing example with disclosure)
[
  {
    "id":"b-wai-001",
    "title":"coach at scale: 3 ways Aii changes the manager’s week",
    "brief_type":"article",
    "status":"idea",
    "objective":"authority",
    "target_persona_ids":["persona-ceo"],
    "linked_product_ids":["prod-wethosai"],
    "strategy_refs":["strategy_objectives.okrs.okr-wethos-q4"],
    "core_message":"Aii surfaces coachable moments and measurable change.",
    "angle":"make it tangible: before/after week-in-the-life",
    "outline":["open with pain","3 moments","mini case","CTA"],
    "assets":[],
    "distribution_plan":[
      {"id":"d1","channel":"linkedin","variant_note":"carousel","schedule":{"date":"","time_local":""},"cta":"read full breakdown","url_plan":{"base_url":"https://","utm_template_id":"default_web","source":"linkedin","campaign":"wai-coach-at-scale-2025q3","content":"b-wai-001-li","term":"","final_url":"","short_url":""},"include_disclosure": true}
    ],
    "org_id":"org-saren",
    "disclosure_policy":"custom",
    "disclosure_text":"I contract with WethosAI; I do not have an ownership stake.",
    "created_at":"",
    "updated_at":""
  }
]

SEED media_queue.items (quick starters)
[
  {"id":"mq-seven-samurai","kind":"film","title":"Seven Samurai (revisit)","author_or_source":"Kurosawa","link":"","length":{"unit":"hrs","value":3},"topic_tags":["craft","japan"],"priority":"low","status":"queued","progress_events":[],"highlights":[],"takeaways":{"summary_bullets":[],"contrarian_take":"","actions":[],"shareables":[]},"related_brief_ids":[],"org_id":"org-saren","intended_use":"personal","created_at":"","updated_at":""},
  {"id":"mq-ai-system3","kind":"article","title":"System 1/2/3 and AI augmentation","author_or_source":"various","link":"","length":{"unit":"min","value":12},"topic_tags":["ai","cognition"],"priority":"normal","status":"queued","progress_events":[],"highlights":[],"takeaways":{"summary_bullets":[],"contrarian_take":"","actions":[],"shareables":[]},"related_brief_ids":["content_factory.briefs.b-ai-001"],"org_id":"org-saren","intended_use":"personal","created_at":"","updated_at":""}
]

SEED guide.md
# how Claude uses SarenOS
- load relevant files before advising; cite fields used.
- when missing data, ask tight questions and record "tbd".
- updates: write minimal diffs; bump updated_at; log in memory_index.md.
- publishing: bind every brief/project to an org_id; apply disclosure rules automatically.
- maintenance: propose a weekly refresh; flag items older than 90 days for review.

## action block format
What / Why / Effort / Impact / Next Step / Owner / Due

---

want me to also pre-generate the **intake questions** Claude should ask next (per file)? I can drop a one-screen checklist so you move straight into filling the gaps.
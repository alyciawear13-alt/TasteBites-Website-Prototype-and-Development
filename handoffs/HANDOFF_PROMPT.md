# TasteBites: End-of-Session Handoff Prompt

**How to use:** At the end of every work session with Claude or ChatGPT/Codex, paste the prompt below into the same chat. Save what it gives you into the repo's `handoffs/` folder using the filename it suggests, then commit and push.

---

## Copy and paste this prompt

```
We're done for today. Write a handoff file for my TasteBites teammates
(a student group website where diners and restaurants communicate about
food allergies). A teammate who wasn't here, or a different AI tool,
should be able to read it and pick up exactly where I left off.

My name: [YOUR FIRST NAME]
Today's date: [YYYY-MM-DD]

Rules:
1. Filename on the first line, in this exact format:
   handoff_YYYY-MM-DD_firstname_topic.md
   (all lowercase, topic is 2-4 words joined by hyphens,
   e.g. handoff_2026-10-22_alycia_allergy-filter-page.md)
2. Use the section headings below exactly, in this order. If a section
   has nothing, write "None."
3. Be specific: real file paths, real function/component names, real
   commands. No vague phrases like "made some improvements."
4. For every decision, include WHY we chose it and what we rejected.
5. Only include what actually happened in this chat. Don't invent work.
6. Keep it under one page if possible.

Sections:
## Summary
## Work done
## Files changed
## Decisions and reasoning
## Open issues / blockers
## Next steps
## Notes for the next AI session
```

---

## Where it lives in the repo

```
tastebites/
├── handoffs/
│   ├── HANDOFF_PROMPT.md        <- this file
│   ├── handoff_TEMPLATE.md      <- blank template
│   └── handoff_2026-10-22_alycia_project-setup.md
└── ...
```

**Starting a new session?** Give the AI the most recent 1-2 handoff files first, so it knows where things stand.

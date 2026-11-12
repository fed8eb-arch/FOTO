---
name: youtube-to-skill
description: Transform YouTube videos or playlists into SKILL.md files. Use when user wants to create a skill from YouTube content, convert video tutorials into reusable agent workflows, learn from educational videos, or extract actionable knowledge from any YouTube URL.
---

# YouTube to Skill Transformer

Account rule: run scripts from this skill folder, not `.claude`; write any new skill only in the Cursor source skills folder from the account handoff, then copy that folder to the second Cursor store; use captions only, and do not download audio, run Whisper, write into VIP-Custom, or copy into `.codex\skills` unless Peter asks.

Convert YouTube video content into effective, verified, up-to-date agent skills.

## ⚠️ Before You Generate ANY Skill

**You MUST read [reference.md](./reference.md) first.**

It contains the critical understanding of what makes skills actually work vs useless text files. Without this knowledge, you will create skills that the agent ignores.

---

## ⏰ CRITICAL: Check Current Date

**LLMs are trained on historical data and often assume outdated dates.**

Before verifying ANY technology:
1. Check today's date from your environment/system
2. Use this date when searching for "current" documentation
3. Compare video publish date against TODAY's date (not your training cutoff)

Example: If today is December 2025 and a video was published in January 2024, that's ~2 years old — significant API changes may have occurred.

**When searching, always include the current year:**
- ✅ `"React hooks 2025"` or `"FastAPI latest version December 2025"`
- ❌ `"React hooks"` (may return outdated results)

---

## 🔬 CRITICAL: No Hallucinated Data

**Never include numbers, estimates, or claims you haven't verified.**

This applies to:
- Version numbers → Always look them up
- Performance claims → Only include if from official docs/benchmarks
- Cost estimates → Only if you've calculated from real pricing
- Time estimates → Don't guess, omit if unknown
- Statistics → Must have a verifiable source

**The scientific method:**
1. If you don't know → Look it up or omit it
2. If you can't verify → Don't include it
3. If it's an estimate → Label it clearly with your methodology
4. If the video claims something → Verify before including

**Bad:** "This approach is 10x faster" (unverified claim from video)
**Good:** "The video claims improved performance" or omit entirely
**Best:** Verify with benchmarks and cite source

---

## The Pipeline

```
EXTRACT ──▶ IDENTIFY ──▶ VERIFY ──▶ TRANSFORM ──▶ GENERATE
   │            │           │            │            │
transcript   tools &    current?     narrative    effective
 + meta      versions   enriched?    ──▶ action     skill
```

---

## Step 1: Extract Transcript

```bash
python .claude/skills/youtube-to-skill/scripts/extract_youtube.py "<URL>"
```

- Single videos: `youtube.com/watch?v=...` or `youtu.be/...`
- Playlists: `youtube.com/playlist?list=...`

Output: JSON with title, publish date, channel, and transcript.

**Note the publish date** — older videos need more verification.

---

## Step 2: Identify Technologies

Scan transcript and list ALL mentioned:

| Category | Examples |
|----------|----------|
| Languages | Python 3.9, TypeScript, Rust |
| Frameworks | React 18, Next.js 14, FastAPI |
| Libraries | axios, lodash, pandas |
| Tools | Docker, kubectl, terraform |
| Services | AWS S3, Stripe API, OpenAI |
| CLIs | npm, cargo, pip commands |

Create a verification checklist with version numbers if mentioned.

---

## Step 3: Verify & Update (CRITICAL)

**Videos get outdated. Your skill must not.**

### For Libraries/Frameworks → Use Context7 MCP

```
1. mcp__context7__resolve-library-id
   → Find the library ID (e.g., "react" → "/reactjs/react.dev")

2. mcp__context7__get-library-docs
   → Fetch current documentation for specific topics
   → Use mode='code' for API/examples, mode='info' for concepts
```

Example:
- Video mentions "React useEffect cleanup"
- Resolve: `/reactjs/react.dev`
- Fetch: topic="useEffect cleanup" mode="code"
- Compare video content with current docs

### For Tools/Services/APIs → Use WebSearch

```
WebSearch: "<tool name> documentation <current year>" or "<api> latest version <current month year>"
```

**Always include the current date in searches to avoid stale results.**

### When You Find Outdated Information

**STOP and ask the user:**

```
⚠️ Outdated content detected in video (published <date>):

[Library/Tool] v<old> → Current: v<new>

Breaking changes found:
• <specific change 1>
• <specific change 2>

How should I proceed?
A) Update to current version (recommended)
B) Keep original with deprecation warnings
C) Skip this section
```

### Ask About Enrichment

```
Would you like me to enrich this skill with current official documentation?

This would add:
• Updated API references from Context7
• Additional code examples
• Edge cases not covered in the video

[Yes / No / Ask me for each topic]
```

---

## Step 4: Transform Content

**This is where most skill generation fails.**

See [reference.md](./reference.md) for the deep understanding, but the core principle:

> **You are not transcribing. You are creating executable instructions.**

| ❌ Video Narration | ✅ Skill Instruction |
|-------------------|---------------------|
| "So what we're gonna do here is..." | *(delete)* |
| "You want to open your terminal and type..." | `bash -c "command"` |
| "The cool thing about this is..." | *(delete or convert to a note)* |
| "Make sure you don't forget to..." | **⚠️ Warning:** ... |
| "If you see this error..." | **Troubleshooting:** ... |
| "I usually structure it like..." | **Recommended structure:** |

**The test:** Can the agent follow these instructions without watching the video?

---

## Step 5: Choose Skill Structure

**First, decide: Single file or multi-file?**

```
┌─────────────────────────────────────┐
│         Analyze Content             │
└──────────────────┬──────────────────┘
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
   Short/Simple?        Complex/Long?
         │                   │
         ▼                   ▼
   Single SKILL.md    Multi-file structure:
                      ├── Theory → references/
                      ├── Code → scripts/
                      └── Variants → examples/
```

### Decision Criteria

| Criterion | Single File | Multi-File |
|-----------|-------------|------------|
| Video length | < 10 min | > 20 min |
| Code examples | 1-2 small snippets | Complete runnable scripts |
| Theory vs practice | Mostly practical | Heavy theory + practice |
| Estimated word count | < 2000 words | > 3000 words |
| Multiple workflows | No | Yes (different use cases) |

### Multi-File Structure (Progressive Disclosure)

```
skill-name/
├── SKILL.md              # Core instructions (<5k words, always loaded)
├── references/           # Deep docs (loaded on-demand, saves tokens)
│   ├── concepts.md       # Theory, explanations
│   └── api.md            # API documentation
├── scripts/              # Executable code (can run without loading)
│   └── example.py        # Complete runnable examples
└── assets/               # Templates, images (used in output)
```

**Why this matters:**
- **SKILL.md** is always loaded (~tokens cost)
- **references/** only loaded when Claude needs them (saves tokens)
- **scripts/** can be executed directly without loading into context
- **assets/** copied to output, never loaded

---

## Step 6: Generate the Skill

Use template: [templates/skill_template.md](./templates/skill_template.md)

### Output Format

**For SINGLE FILE output:**
Start directly with the YAML frontmatter:
```
---
name: skill-name
description: ...
---
# Content...
```

**For MULTI-FILE output:**
Use file markers to separate content:
```
<!-- FILE: SKILL.md -->
---
name: skill-name
description: ...
---
# Skill Title
Core actionable instructions here (keep under 5000 words).
For detailed concepts, see [concepts reference](references/concepts.md).

<!-- FILE: references/concepts.md -->
# Theoretical Concepts
Deep explanations, formulas, theory...

<!-- FILE: scripts/example.py -->
#!/usr/bin/env python3
Complete runnable code...
```

### Pre-delivery Checklist

- [ ] **Description has trigger words** users actually say
- [ ] **Description includes "Use when..."** — This is how the agent discovers the skill
- [ ] **One skill = one capability** (split if video covers multiple)
- [ ] **Instructions are executable** (commands, code, steps)
- [ ] **No narrator voice** ("so", "basically", "gonna")
- [ ] **Sources documented** (video URL + docs used)
- [ ] **Versions specified** for all tools/libraries
- [ ] **Required sections present:** Source, Prerequisites, Instructions, Troubleshooting

### YAML Frontmatter Rules

**ONLY these fields are allowed:**
```yaml
---
name: lowercase-with-hyphens
description: ACTION VERB + what it does. Use when user needs X, wants to Y, or asks about Z.
---
```

- `name`: lowercase, hyphens only, max 40 chars
- `description`: Must include "Use when..." trigger phrase

### Ask for Placement

```
Where should I save this skill?

A) .claude/skills/<name>/ — Project skill (shared via git)
B) ~/.claude/skills/<name>/ — Personal skill (your machine only)
```

---

## Available Tools Reference

| Need | Tool | Example |
|------|------|---------|
| Library docs | `mcp__context7__resolve-library-id` | Find React library ID |
| Library docs | `mcp__context7__get-library-docs` | Fetch React hooks docs |
| General search | `WebSearch` | "docker compose v2 migration" |
| Specific URL | `WebFetch` | Fetch a specific doc page |

# Pipeline detail

Read the section for the current phase only. The boundaries, production level, and sign-up link rules stay in `SKILL.md`.

## Phases 1–2: Setup and brief

Check tools and connections, then collect what is missing: business/product and visitor goal, real assets versus generated imagery, own site versus client, desired feeling, optional references, and production level. A detailed brief may answer most of these at once. The user may delegate art direction entirely.

Read [openart.md](openart.md) for connection and live model/price discovery. Install automatic prerequisites yourself; request only the required permission. Give one action at a time for sign-in or purchasing, then verify. Copy the skill tools into `.10k/tools/` and install dependencies there once with scripts disabled before first use. Keep `.10k/plan.md` with the brief, `production_level`, GPT/media choices and evidence, cost approval, actual spend, current asset states and next action. Explain partner links only at the sign-up or payment moment in `SKILL.md`.

## Phases 3–4: Research and concepts

Read [design.md](design.md), [shots.md](shots.md) and [prompt-laws.md](prompt-laws.md). Research enough real customer evidence to understand the visitor's job, useful proof and objections. Make the copy specific and the path to one action clear.

Pitch a small set of genuinely different concepts as short films and whole-page experiences. Recommend the strongest direction. The shot catalogue is inspiration, not a menu. Say what the visitor will remember, how the lower page sustains the world, and how it leads to the goal. Show a simpler interpretation only when the level or the user calls for it.

## Phase 5: Design package, quote and treatment

Use [design-package.md](design-package.md). Design story, typography, hierarchy, imagery, motion and the conversion path together, then storyboard the film. Read [mobile.md](mobile.md): wide and portrait both belong in the plan. For recurring subjects and unproven motion, use [visual-validation.md](visual-validation.md) before expanding production.

Present a compact Visual Story: Scene / What the visitor sees / Words on screen. Include real proposed copy, the lower-page journey and quiet beats. Quote current prices for the exact models, settings, references, exploration, supporting imagery, mobile treatment and correction allowance. Compare with the actual balance. Get the story and the spend approved before generation. A balance alone never authorizes spending it.

Once key imagery is approved, and before the rest of the site, show an early treatment: hero type over imagery with the intended motion, one lower section, and the phone composition. Use a small local HTML preview with the existing engine. Type choreography is part of the concept. Record accepted choices and copy changes.

## Phase 6: Generate, inspect and refine

Follow [openart.md](openart.md), [shots.md](shots.md) and [prompt-laws.md](prompt-laws.md). Resolve the best current image and video models for the level. Full throttle starts video with the latest suitable Seedance family or successor and considers stronger evidenced alternatives. Choose the image model separately. Use the best quality settings for the masters. High resolution is not quality by itself.

Make the composed reveal, then distinct earlier moments. Apply [visual-validation.md](visual-validation.md) before propagating: native and delivery detail, scene relationships, reference roles. A texture change must keep continuity. Reject copied composition and identity drift. Inspect wide and phone frames before review and animation.

Generate approved clips and fresh supporting images in parallel where independent. Prove an uncertain motion with a pilot before dependent renders. Correct framing and identity before expensive animation. Each extra iteration fixes a named weakness inside the allowance and keeps funds for what remains. Stop when the next improvement is not justified. After repeated failure, diagnose and propose a different approach. Full throttle does not silently fall back to a cheaper concept.

For assembly read [ffmpeg-recipes.md](ffmpeg-recipes.md). Test matched cuts before a dissolve. Inspect both sides of every join and watch full playback. One join complaint authorizes a local repair: keep approved content, order and pace. Removing a proven duplicate endpoint frame is a local repair; record the one-frame timing difference. Honor an exact runtime. Broader cuts or a new pace need agreement.

Review with `node .10k/tools/review.mjs review/hero-joined.mp4 --port 8081`. Verify playback and seeking, including slow motion and frame stepping. Finish the film review before the final site. Ask approval unless it was delegated. Decode success is not user playback. Keep approved, current and rejected versions explicit. Recheck dependent assets and type cues when a source changes.

## Phases 7–8: Assets and build

Copy `tools/` to `.10k/tools/` and install dependencies once with scripts disabled. Use [engine.md](engine.md) and [effects.md](effects.md). Run `encode.mjs` on the approved master. The default poster is the final decoded frame; `--poster` sets another. Inspect the portrait journey and use a dedicated portrait source when planned. Keep masters outside the compressed delivery files. Use `depth.mjs` when the story needs depth, not as a cheaper substitute for an approved film.

Build the approved design: readable moving type, deliberate rhythm, one useful brand-specific interaction, a composed ending. Effects need a visual purpose. Engines stay unchanged. Reduced motion, failed media, small screens and keyboard use need designed states. Preserve approved copy. Change the package first when copy must change.

Read [backend.md](backend.md) for the form. Offer the real inbox, an email link, an existing booking link, or an explicitly demo-only form. Then make the brand kit and search basics from [launch.md](launch.md).

## Phase 9: Check and preview

Run `node .10k/tools/check.mjs site review` and fix reported defects. Inspect the hero contact sheet, the phone journey, and lower-page crops. The checker does not certify design or every custom interaction. Exercise the form, menu, gallery and media-failure paths without sending a real message. If the real backend is selected, test storage and guards with notifications off before a live test.

Run the copy review in [design.md](design.md). Score with [checklist.md](checklist.md): evidence and the strongest remaining weakness. Verify film-cue and type links in desktop and phone playback, including reverse and arbitrary seeks. Run `node .10k/tools/typesync.mjs site review` when the site uses `filmtype.js`, then watch slow and fast scrolling. Screenshots do not prove sync. Keep creative review separate from performance scores. Full throttle uses the top GPT for reviews.

Preview with `node .10k/tools/preview.mjs site --port 8080`. If the port is taken, use a free one. Do not stop unrelated servers. Confirm the URL responds. Restart a stopped preview when asked. Apply notes, verify, and show before/after scores. Extra pages or languages only when useful, per [pages.md](pages.md), without delaying the authorized next step.

## Phase 10: Publish

When the user authorizes publishing, read [deploy.md](deploy.md) and continue. Use the selected domain or free address, or offer a simple choice. Connect Hostinger if needed, patch canonical, OG and backend URLs, run `report.mjs site review --seo https://address --seo-only`, archive only deployable files, and deploy with the connector's static operation. Verify live content. Do not overwrite another site by guessing.

Verify HTTPS, both video variants, browser behavior and backend protections. Run the live phone and desktop report from [launch.md](launch.md), repair meaningful failures, and show the phone report. Check robots and indexing separately from the SEO score. Invite a physical-phone review and record whether it happened.

For a real inbox follow [backend.md](backend.md): healthy private storage, the owner's password, supported email, then one labeled live test that confirms storage and email arrival. Report publication, inbox activation and notification delivery as separate states. Never claim delivery from a health check. Client sites get the kit from [launch.md](launch.md).

Deliver the live link, concise changes, the checks, and any pending owner action. Say once that later changes can be asked in ordinary language.

## Phase 11: Iterate

Later changes preserve accepted work, update asset versions, redeploy within the authorization and verify the live revision. One defect stays scoped to that defect unless the user asks for a new direction.

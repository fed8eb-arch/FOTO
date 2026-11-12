---
name: premium-web-design
description: >-
  Use when building, redesigning, or polishing a website or landing page that
  must look Apple/Stripe/Linear-level: premium typography, scroll-driven
  storytelling, motion and 3D. Covers stack choice, design workflow, animation
  rules, and the quality bar to check before handing over.
---
# Premium web design (Apple / Stripe / Linear level)

Goal: a site that feels like the reference set below, not a generic template. Never ship a default-looking page.

## Reference set (study before designing)
- apple.com product pages: big hero shots, sticky sections, scroll-scrubbed video, art-directed `picture`/`srcset`; 3D inserts via Three.js.
- stripe.com: custom WebGL gradient hero (GLSL), premium type (Söhne), strict grid. Next.js + Contentful.
- linear.app: dark UI, variable Inter, cinematic .webm, dense layout. Next.js.
- vercel.com: Geist type system, crisp grid. Next.js + Payload CMS.
- igloo.inc: fullscreen 3D, shaders. Svelte + Vite + Three.js + GSAP.
- lusion.co: heavy WebGL scenes. Astro + Three.js.
- activetheory.net: fullscreen stage, custom engine, Theatre.js timelines.
- bruno-simon.com: 3D game portfolio. Three.js WebGPU + TSL, GSAP, Howler.
- family.co: cinematic marketing. Next.js + Framer Motion + Lottie.
- framer.com: built in Framer, rich type, built-in motion.
If a web reference tool is connected (Refero, Mobbin), pull 5–10 real screens for the exact page type first.

## Step 1. Brief and art direction (before any code)
1. Write one sentence: who it's for, the single feeling (e.g. calm luxury, technical precision), the one action the page drives.
2. Pick ONE reference from the set as the north star and name 3 concrete things to borrow (e.g. Apple sticky scroll, Stripe gradient hero, Linear typography).
3. Define tokens: 1 display font + 1 text font (variable fonts preferred, e.g. Inter Variable, Geist), type scale (hero 72–120px desktop, tight letter-spacing −2% to −4% on display), 1 base neutral palette + 1 accent, spacing scale on 8px, radius, shadow. No more than 2 font families.
4. If Figma is connected, lay out the hero + 2 key sections there first; otherwise sketch the section list in text.

## Step 2. Stack
- Product/marketing site: Next.js (App Router) + Tailwind or CSS modules, deployed on Vercel.
- Motion in React: Motion (Framer Motion) for UI transitions, springs, stagger, `AnimatePresence`.
- Scroll storytelling: GSAP + ScrollTrigger (pin, scrub), smooth scroll with Lenis or ScrollSmoother. Use `useGSAP` in React and clean up on unmount.
- 3D/WebGL hero: Three.js (or react-three-fiber); custom GLSL for gradients/particles; keep it to one canvas.
- Creative showcase / fullscreen 3D: Vite or Astro + Three.js + GSAP.
- No-code path: Framer.
- Product video: Remotion for programmatic video; export .webm + .mp4 with poster.
Load the matching installed skills when present: impeccable, refero-design, gsap-core, gsap-scrolltrigger, gsap-react, gsap-performance, motion, figma-design-to-code, remotion-best-practices.

## Step 3. Page structure (default)
1. Hero: one huge line of copy, one visual (3D/WebGL, video, or hero shot), one CTA. Above the fold nothing else.
2. Sticky scroll story: 3–5 pinned beats, each one idea, visual changes while text swaps.
3. Feature grid: bento layout, real product visuals, not icons-only.
4. Proof: numbers or logos, large type.
5. Final CTA + clean footer.

## Step 4. Motion rules
- Animate only `transform` and `opacity`; never width/height/top/left.
- Easing: custom ease-out (e.g. cubic-bezier(0.22,1,0.36,1)) or springs; durations 0.4–0.9s; stagger 0.04–0.08s.
- Every animation tells the story (reveal, focus, transition); no decorative wiggles.
- Respect `prefers-reduced-motion`: disable scrub/parallax, keep fades.
- One scroll-scrubbed hero moment is enough; don't scrub everything.

## Step 5. Media and performance
- Images: AVIF/WebP, `srcset`, art direction per breakpoint, explicit width/height.
- Video: muted, playsinline, poster, lazy below the fold.
- WebGL: cap devicePixelRatio at 2, pause when off-screen, fallback image on low-end/mobile.
- Fonts: self-host, `font-display: swap`, preload the display font.
- Target Lighthouse performance ≥ 90 on desktop, LCP < 2.5s.

## Step 6. Quality bar (check before handing over)
- Side-by-side with the north-star reference: does the hero hold up? If not, fix type size, spacing and the visual before anything else.
- Typography: tight display tracking, comfortable body (16–18px, 1.5–1.6 line-height), max line length ~70ch.
- Spacing: generous section padding (120–200px desktop), consistent rhythm.
- Mobile: test at 375px; hero still one idea, animations simplified.
- Run the impeccable audit / critique if installed and fix what it flags.
- Screenshot desktop and mobile and show them with the deliverable.

## Don'ts
- No stock gradients-on-everything, no generic hero with 3 icons, no more than one accent color, no autoplay audio, no scroll-jacking that breaks native scroll on mobile.

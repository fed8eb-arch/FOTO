/* ПРОМПОЛ777 v2: header, menu, reveals, photo story, rail, page transitions. */
(() => {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  if (!RM) root.classList.add("js-motion");
  root.classList.remove("no-js");

  const header = document.querySelector(".site-header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", scrollY > 12);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });

  const btn = document.querySelector(".menu-btn");
  if (btn) btn.addEventListener("click", () => {
    const open = root.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", String(open));
  });

  /* reveals */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -10% 0px" });
  document.querySelectorAll("[data-reveal-stagger]").forEach((g) =>
    [...g.children].forEach((c, i) => { c.setAttribute("data-reveal", ""); c.style.setProperty("--d", i % 8); }));
  document.querySelectorAll("[data-reveal], .img-reveal").forEach((el) => io.observe(el));

  /* sticky photo story */
  const story = document.querySelector(".story");
  if (story) {
    const imgs = [...story.querySelectorAll(".story-media img")];
    const steps = [...story.querySelectorAll(".story-steps li")];
    const num = story.querySelector(".story-count span");
    const bar = story.querySelector(".story-bar");
    const set = (i) => {
      imgs.forEach((im, k) => im.classList.toggle("is-on", k === i));
      steps.forEach((s, k) => s.classList.toggle("is-on", k === i));
      if (num) num.textContent = String(i + 1).padStart(2, "0");
      if (bar) bar.style.setProperty("--p", (i + 1) / steps.length);
    };
    set(0);
    const so = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) set(steps.indexOf(e.target));
    }), { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach((s) => so.observe(s));
  }

  /* horizontal rail driven by vertical scroll (desktop only, GSAP) */
  const startRail = () => {
    const rail = document.querySelector(".rail");
    if (!rail || RM || !window.gsap || !window.ScrollTrigger || !matchMedia("(min-width: 901px)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const track = rail.querySelector(".rail-track");
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    gsap.to(track, { x: () => -dist(), ease: "none",
      scrollTrigger: { trigger: rail, start: "top top+=" + (header ? header.offsetHeight : 0), end: () => "+=" + dist(), scrub: 0.7, pin: true, anticipatePin: 1, invalidateOnRefresh: true } });
    addEventListener("load", () => ScrollTrigger.refresh());
  };
  if (document.readyState === "complete") startRail(); else addEventListener("load", startRail);

  /* forms: no backend in the draft */
  document.querySelectorAll("form[data-draft-form]").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    const s = f.querySelector(".form-status");
    if (s) { s.hidden = false; s.textContent = "Чтобы отправить заявку, позвоните +7 905 843-98-18 или напишите на Petr.orsk@yandex.ru."; }
  }));

  /* soft page transition */
  if (!RM) {
    const fade = document.createElement("div"); fade.className = "page-fade"; document.body.appendChild(fade);
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || /^(tel|mailto|https?):/.test(href)) return;
      e.preventDefault(); root.classList.add("is-leaving");
      setTimeout(() => { location.href = a.href; }, 280);
    });
    addEventListener("pageshow", () => root.classList.remove("is-leaving"));
  }
})();

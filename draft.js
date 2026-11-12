/* draft.js — GSAP ScrollTrigger polish. Does not replace scene.js / fx.js / walk.js. */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  document.documentElement.classList.remove("no-js");

  /* Placeholder forms: do not send anywhere. */
  document.querySelectorAll("form[data-draft-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      if (status) {
        status.hidden = false;
        status.textContent = "Форма пока не подключена. Позвоните +7 905 843-98-18 или напишите на Petr.orsk@yandex.ru.";
      }
    });
  });

  const startMotion = () => {
    if (reduced.matches || typeof gsap === "undefined") return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const reveals = gsap.utils.toArray("[data-reveal]");
    reveals.forEach((el, i) => {
      const kids = el.matches("[data-reveal-stagger]")
        ? el.querySelectorAll(":scope > *")
        : [el];
      gsap.set(kids, { opacity: 0, y: 28 });
      gsap.to(kids, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: el.matches("[data-reveal-stagger]") ? 0.07 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          once: true,
        },
      });
    });

    /* Horizontal process rail on desktop */
    const pin = document.querySelector(".process-pin");
    if (pin && window.ScrollTrigger && window.matchMedia("(min-width: 900px)").matches) {
      const track = pin.querySelector(".process-track");
      const stage = pin.querySelector(".process-stage");
      if (track && stage) {
        pin.classList.add("is-ready");
        const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top 18%",
            end: () => "+=" + Math.max(distance() * 0.9, window.innerHeight * 1.2),
            scrub: 0.6,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }
  };

  const whenReady = (fn) => {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  };

  whenReady(() => {
    if (reduced.matches) return;
    startMotion();
  });
  reduced.addEventListener("change", () => {
    if (window.ScrollTrigger) ScrollTrigger.getAll().forEach((t) => t.kill());
    if (!reduced.matches) startMotion();
  });
})();

/* The title rides the worker's walk. Position comes from the frame on screen. */
(() => {
  const video = document.querySelector("video[data-k-scrub]");
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!video) return;

  const place = () => {
    if (reduced.matches || !video.duration) {
      root.style.setProperty("--walk", "0");
      return;
    }
    root.style.setProperty("--walk", String(video.currentTime / video.duration));
  };

  video.addEventListener("seeked", place);
  video.addEventListener("loadedmetadata", place);
  if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
    const loop = () => {
      place();
      video.requestVideoFrameCallback(loop);
    };
    video.requestVideoFrameCallback(loop);
  }
  reduced.addEventListener("change", place);
})();

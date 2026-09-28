document.querySelectorAll(".teaser-motion").forEach((root) => {
  const video = root.querySelector("video");
  const defaultDuration = Number(video.dataset.duration) || 24;
  const still = root.querySelector(".teaser-still");
  const controls = root.querySelector(".teaser-controls");
  const toggle = root.querySelector(".teaser-toggle");
  const replay = root.querySelector(".teaser-replay");
  const progress = root.querySelector(".teaser-progress");
  const time = root.querySelector(".teaser-time");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let animated = !motion.matches;
  let wanted = animated;
  let visible = false;
  let complete = false;
  let loaded = false;
  let failed = false;

  function showMode() {
    video.hidden = !animated;
    still.hidden = animated;
  }
  function format(seconds) {
    const value = Math.floor(seconds || 0);
    return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
  }
  function update() {
    const duration = Number.isFinite(video.duration) ? video.duration : defaultDuration;
    progress.max = duration;
    progress.value = video.currentTime;
    time.textContent = `${format(video.currentTime)} / ${format(duration)}`;
    toggle.textContent = complete ? "Replay animation" : video.paused ? "Play animation" : "Pause";
    root.dataset.state = failed ? "unavailable" : !animated ? "static" : complete ? "complete" : video.paused ? "paused" : "playing";
  }
  function load() {
    if (loaded) return;
    loaded = true;
    video.src = video.dataset.src;
    video.load();
  }
  function sync() {
    if (animated && wanted && visible && !document.hidden && !complete && !failed) {
      load();
      if (video.paused) {
        video.play().catch((error) => {
          if (error.name !== "AbortError") wanted = false;
          update();
        });
      }
    } else {
      video.pause();
    }
    update();
  }
  function start(fromBeginning) {
    if (failed) return;
    animated = true;
    showMode();
    load();
    if (fromBeginning || complete) video.currentTime = 0;
    complete = false;
    wanted = true;
    sync();
  }
  toggle.addEventListener("click", () => {
    if (!video.paused) {
      wanted = false;
      sync();
    } else {
      start(complete);
    }
  });
  replay.addEventListener("click", () => start(true));
  progress.addEventListener("input", () => {
    if (failed) return;
    animated = true;
    wanted = false;
    complete = false;
    showMode();
    load();
    video.pause();
    video.currentTime = Number(progress.value);
    update();
  });
  ["loadedmetadata", "timeupdate", "play", "pause", "seeked"].forEach((event) => video.addEventListener(event, update));
  video.addEventListener("ended", () => {
    complete = true;
    wanted = false;
    update();
  });
  video.addEventListener("error", () => {
    failed = true;
    animated = false;
    wanted = false;
    showMode();
    toggle.hidden = replay.hidden = progress.hidden = time.hidden = true;
    update();
  });
  motion.addEventListener("change", () => {
    animated = !motion.matches;
    wanted = false;
    showMode();
    sync();
  });
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("pagehide", () => video.pause());
  window.addEventListener("pageshow", sync);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      sync();
    }, { rootMargin: "-64px 0px 0px", threshold: [0, 0.35] }).observe(video.parentElement);
  } else {
    // Explicit playback remains available without visibility tracking.
    visible = true;
    wanted = false;
  }
  controls.hidden = false;
  showMode();
  update();
});

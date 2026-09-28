(() => {
  const hero = document.querySelector('.hero');
  const content = hero?.querySelector('.hero-content');
  const media = hero?.querySelector('.hero-media');
  if (!hero || !content || !media) return;

  const mobile = matchMedia('(max-width: 980px)');
  let scheduled = false;
  function update() {
    scheduled = false;
    const width = media.clientWidth;
    // The previous title started at 46% of the 16:9 frame, minus half
    // the text block's height. Remove half of that unused upper space.
    const previousGap = width * 0.25875 - content.offsetHeight / 2;
    const cameraClearance = width * 0.121875 - 20;
    const crop = mobile.matches ? 0 : Math.max(0, Math.min(previousGap / 2, cameraClearance));
    hero.style.setProperty('--hero-frame-height', `${(width * 0.5625).toFixed(3)}px`);
    hero.style.setProperty('--hero-text-anchor', `${(width * 0.25875).toFixed(3)}px`);
    hero.style.setProperty('--hero-top-crop', `${crop.toFixed(3)}px`);
  }
  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener('resize', schedule);
  mobile.addEventListener('change', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(content);
  document.fonts?.ready.then(schedule);
  update();
})();

(() => {
  'use strict';
  const root = document.querySelector('#real-player');
  if (!root) return;
  const video = root.querySelector('video');
  const overview = root.querySelector('.rr-overview');
  const overviewContext = overview.getContext('2d', {alpha: false});
  const hud = root.querySelector('.rr-hud');
  const cameras = [...root.querySelectorAll('.rr-cameras canvas')];
  const contexts = cameras.map(canvas => canvas.getContext('2d', {alpha: false}));
  const poster = root.querySelector('.rr-poster');
  const title = root.querySelector('[data-rr-title]');
  const description = root.querySelector('[data-rr-description]');
  const taskDescriptions = {
    fold: 'Fold the towel into a compact shape with both arms, coordinating the grasp, lift, and fold as the towel layout and surrounding objects change.',
    bread: 'Pick up the bread, transfer it between the arms, and place it on the plate. Randomized scenes vary the object layout and add distractors or additional pieces.',
    milk: 'Bring the drinks within reach, grasp each carton, and place it in the basket while adapting to clutter and varying object positions.',
    duck: 'Open the drawer, pick up the duck, place it inside, and close the drawer. Changing layouts and nearby objects require coordinated grasping and placement.',
  };
  const level = root.querySelector('[data-rr-level]');
  const status = root.querySelector('[data-rr-status]');
  const toggle = root.querySelector('[data-rr-toggle]');
  const replay = root.querySelector('[data-rr-replay]');
  const range = root.querySelector('[data-rr-range]');
  const timeLabel = root.querySelector('[data-rr-time]');
  const fullscreen = root.querySelector('[data-rr-fullscreen]');
  const cards = [...document.querySelectorAll('.rr-clip')];
  const filters = {task: 'all', level: 'all'};
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const narrowScreen = matchMedia('(max-width: 640px)');
  let selected = null, data = null, renderHud = null, controller = null;
  let userPaused = reducedMotion.matches, visible = false, loaded = false, lastFrame = -1;
  let request = 0;
  const clock = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

  function controls() {
    const duration = data?.duration || Number(selected?.dataset.duration) || 0;
    const time = Math.min(duration, video.currentTime || 0);
    toggle.textContent = video.paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} selected rollout`);
    range.max = String(Math.max(0, duration - 1 / 30));
    range.value = String(time);
    range.setAttribute('aria-valuetext', `${clock(time)} of ${clock(duration)}`);
    timeLabel.textContent = `${clock(time)} / ${clock(duration)}`;
  }

  function fail(message) {
    loaded = false;
    video.pause();
    root.classList.remove('is-ready');
    root.setAttribute('aria-busy', 'false');
    status.textContent = message;
    status.hidden = false;
    root.dataset.error = message;
    toggle.disabled = replay.disabled = range.disabled = true;
  }

  function sync() {
    if (!data) return;
    if (!loaded && visible) {
      loaded = true;
      video.src = selected.dataset.video;
      video.load();
    }
    if (loaded && visible && !document.hidden && !userPaused) {
      video.play().catch(() => { controls(); });
    } else {
      video.pause();
    }
    controls();
  }

  function draw(time) {
    if (!data || !loaded || video.readyState < 2 || video.seeking) return;
    const frame = Math.max(0, Math.min(data.frames.length - 1, Math.floor(time * data.fps + 1e-5)));
    if (frame !== lastFrame) {
      lastFrame = frame;
      overviewContext.drawImage(video, ...data.overviewRect, 0, 0, 1600, 900);
      contexts.forEach((context, index) => context.drawImage(video, ...data.cameraRects[index], 0, 0, 320, 240));
      renderHud(time);
      root.dataset.frame = String(frame);
      root.querySelector('.rr-cameras').dataset.frame = String(frame);
    }
    root.classList.add('is-ready');
    root.setAttribute('aria-busy', 'false');
    status.hidden = true;
    toggle.disabled = replay.disabled = range.disabled = false;
    controls();
  }

  async function select(card) {
    if (!card || selected === card) return;
    const token = ++request;
    controller?.abort();
    controller = new AbortController();
    video.pause();
    video.removeAttribute('src');
    video.load();
    selected = card;
    data = renderHud = null;
    loaded = false;
    lastFrame = -1;
    root.classList.remove('is-ready');
    root.dataset.clip = card.dataset.clip;
    delete root.dataset.error;
    root.setAttribute('aria-busy', 'true');
    hud.replaceChildren();
    poster.src = card.dataset.poster;
    poster.alt = `${card.dataset.title} — ${card.dataset.levelLabel}, overview camera`;
    title.textContent = card.dataset.title;
    description.textContent = taskDescriptions[card.dataset.task];
    level.textContent = card.dataset.levelLabel;
    root.querySelector('[data-rr-original]').href = card.dataset.original;
    status.textContent = 'Loading rollout…';
    status.hidden = false;
    toggle.disabled = replay.disabled = range.disabled = true;
    cards.forEach(item => {
      const active = item === card;
      item.classList.toggle('is-selected', active);
      item.setAttribute('aria-pressed', String(active));
    });
    controls();
    try {
      const response = await fetch(card.dataset.source, {signal: controller.signal});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const episode = await response.json();
      if (token !== request) return;
      if (episode.id !== card.dataset.clip || !episode.stages.length) throw new Error('Invalid episode data');
      data = episode;
      renderHud = window.createRolloutHud(data, hud);
      renderHud(0);
      sync();
    } catch (error) {
      if (token !== request || error.name === 'AbortError') return;
      fail('Rollout unavailable. Open the original video below.');
      console.error(error);
    }
  }

  function filter() {
    const shown = cards.filter(card => {
      const match = (filters.task === 'all' || card.dataset.task === filters.task)
        && (filters.level === 'all' || card.dataset.level === filters.level);
      card.hidden = !match;
      return match;
    });
    document.querySelector('[data-rr-count]').textContent = `${shown.length} ${shown.length === 1 ? 'rollout' : 'rollouts'}`;
    if (!shown.includes(selected)) select(shown[0]);
  }

  document.querySelectorAll('#real-robot .filter-button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
    button.addEventListener('click', () => {
      filters[button.dataset.filterGroup] = button.dataset.filterValue;
      document.querySelectorAll(`#real-robot .filter-button[data-filter-group="${button.dataset.filterGroup}"]`).forEach(item => {
        item.classList.toggle('is-active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      filter();
    });
  });
  cards.forEach(card => card.addEventListener('click', () => select(card)));
  toggle.addEventListener('click', () => { userPaused = !video.paused; sync(); });
  replay.addEventListener('click', () => { video.currentTime = 0; userPaused = false; sync(); });
  range.addEventListener('input', () => { video.currentTime = Number(range.value); controls(); });
  fullscreen.hidden = !root.requestFullscreen;
  fullscreen.addEventListener('click', () => {
    const action = document.fullscreenElement === root ? document.exitFullscreen() : root.requestFullscreen();
    action?.catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    fullscreen.textContent = document.fullscreenElement === root ? 'Exit fullscreen' : 'Fullscreen';
  });
  for (const event of ['loadeddata', 'seeked', 'pause', 'timeupdate']) video.addEventListener(event, () => draw(video.currentTime));
  for (const event of ['play', 'pause']) video.addEventListener(event, controls);
  video.addEventListener('error', () => { if (loaded) fail('Video unavailable. Open the original video below.'); });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pageshow', sync);
  reducedMotion.addEventListener('change', () => { userPaused = reducedMotion.matches; sync(); });
  function layout() { hud.setAttribute('viewBox', narrowScreen.matches ? '24 300 336 500' : '0 0 1600 900'); }
  narrowScreen.addEventListener('change', layout);
  layout();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, {threshold: 0}).observe(root);
  } else visible = true;
  if ('requestVideoFrameCallback' in video) {
    const tick = (now, metadata) => { draw(metadata.mediaTime); video.requestVideoFrameCallback(tick); };
    video.requestVideoFrameCallback(tick);
  } else {
    const tick = () => { if (visible && !video.paused) draw(video.currentTime); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }
  filter();
})();

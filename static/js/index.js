const activeFilters = {
  task: "all",
  level: "all",
};

function tryPlay(video) {
  video.muted = true;
  const playAttempt = video.play();

  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(() => {});
  }
}

function updateGallery() {
  const cards = document.querySelectorAll(".video-card");

  cards.forEach((card) => {
    const taskMatch = activeFilters.task === "all" || card.dataset.task === activeFilters.task;
    const levelMatch = activeFilters.level === "all" || card.dataset.level === activeFilters.level;
    const shouldShow = taskMatch && levelMatch;

    card.classList.toggle("is-hidden", !shouldShow);

    const video = card.querySelector("video");
    if (!video) {
      return;
    }

    if (shouldShow) {
      tryPlay(video);
    } else if (!video.paused) {
      video.pause();
    }
  });
}

function setActiveButton(button) {
  const group = button.dataset.filterGroup;
  const value = button.dataset.filterValue;

  activeFilters[group] = value;

  document
    .querySelectorAll(`.filter-button[data-filter-group="${group}"]`)
    .forEach((candidate) => {
      candidate.classList.toggle("is-active", candidate === button);
    });

  updateGallery();
}

function bindGalleryControls() {
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => setActiveButton(button));
  });

  document.querySelectorAll(".video-card video").forEach((video) => {
    video.muted = true;
  });
}

const svgNamespace = "http://www.w3.org/2000/svg";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createSvgElement(tag, attributes = {}, text = "") {
  const element = document.createElementNS(svgNamespace, tag);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });

  if (text) {
    element.textContent = text;
  }

  return element;
}

function initCaseStudy(root) {
  if (!root || root.dataset.caseStudyReady === "true") {
    return;
  }

  root.dataset.caseStudyReady = "true";

  fetch(root.dataset.caseStudySrc)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load case study data: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => renderCaseStudy(root, data))
    .catch(() => {
      root.classList.add("is-static");
    });
}

function renderCaseStudy(root, data) {
  const chart = root.querySelector(".case-chart");
  const range = root.querySelector("[data-case-range]");
  const phaseStrip = root.querySelector(".case-phase-strip");
  const phaseCards = Array.from(root.querySelectorAll(".case-phase-card"));
  const phaseLabel = root.querySelector("[data-case-phase-label]");
  const stepLabel = root.querySelector("[data-case-step]");
  const caption = root.querySelector("[data-case-caption]");
  const kLabel = root.querySelector("[data-case-k]");
  const grid = root.querySelector("[data-case-grid]");
  const bands = root.querySelector("[data-case-bands]");
  const axes = root.querySelector("[data-case-axes]");
  const path = root.querySelector("[data-case-step-path]");
  const replanDots = root.querySelector("[data-case-replan-dots]");
  const phaseDots = root.querySelector("[data-case-phase-dots]");
  const cursorLine = root.querySelector("[data-case-cursor-line]");
  const cursorDot = root.querySelector("[data-case-cursor-dot]");

  if (!chart || !range || !grid || !bands || !axes || !path || !replanDots || !phaseDots || !cursorLine || !cursorDot) {
    return;
  }

  const starts = data.starts.map(Number);
  const kExec = data.kExec.map(Number);
  const episodeSteps = Number(data.episodeSteps);
  const phases = data.phases || [];
  const dimensions = {
    left: 70,
    right: 24,
    top: 40,
    bottom: 58,
    width: 1000,
    height: 330,
  };
  const innerWidth = dimensions.width - dimensions.left - dimensions.right;
  const innerHeight = dimensions.height - dimensions.top - dimensions.bottom;
  const yMin = 8;
  const yMax = 54;
  const animationDuration = 9000;
  const userHoldMs = 2000;
  let currentStep = 0;
  let visible = false;
  let dragging = false;
  let holdUntil = 0;
  let lastTick = null;
  let lastPhaseIndex = -1;

  const xScale = (step) => dimensions.left + (clamp(step, 0, episodeSteps) / episodeSteps) * innerWidth;
  const yScale = (value) => dimensions.top + ((yMax - value) / (yMax - yMin)) * innerHeight;

  function activeReplanIndex(step) {
    let index = 0;
    starts.forEach((start, candidate) => {
      if (step >= start) {
        index = candidate;
      }
    });
    return index;
  }

  function activePhaseIndex(step) {
    let index = 0;
    phases.forEach((phase, candidate) => {
      if (step >= Number(phase.startStep)) {
        index = candidate;
      }
    });
    return index;
  }

  function drawGridAndAxes() {
    grid.replaceChildren();
    axes.replaceChildren();

    [10, 20, 30, 40, 50].forEach((tick) => {
      const y = yScale(tick);
      grid.appendChild(createSvgElement("line", {
        class: "case-grid-line",
        x1: dimensions.left,
        y1: y,
        x2: dimensions.width - dimensions.right,
        y2: y,
      }));
      axes.appendChild(createSvgElement("text", {
        class: "case-tick-label",
        x: dimensions.left - 14,
        y: y + 4,
        "text-anchor": "end",
      }, tick));
    });

    [0, 50, 100, 150, 200, 250, 300].forEach((tick) => {
      const x = xScale(tick);
      axes.appendChild(createSvgElement("line", {
        class: "case-grid-line",
        x1: x,
        y1: dimensions.top,
        x2: x,
        y2: dimensions.height - dimensions.bottom,
      }));
      axes.appendChild(createSvgElement("text", {
        class: "case-tick-label",
        x,
        y: dimensions.height - 24,
        "text-anchor": "middle",
      }, tick));
    });

    axes.appendChild(createSvgElement("line", {
      class: "case-axis-line",
      x1: dimensions.left,
      y1: dimensions.height - dimensions.bottom,
      x2: dimensions.width - dimensions.right,
      y2: dimensions.height - dimensions.bottom,
    }));
    axes.appendChild(createSvgElement("line", {
      class: "case-axis-line",
      x1: dimensions.left,
      y1: dimensions.top,
      x2: dimensions.left,
      y2: dimensions.height - dimensions.bottom,
    }));
    axes.appendChild(createSvgElement("text", {
      class: "case-axis-label",
      x: dimensions.left + innerWidth / 2,
      y: dimensions.height - 5,
      "text-anchor": "middle",
    }, "Executed Action Steps"));
    axes.appendChild(createSvgElement("text", {
      class: "case-axis-label",
      x: 18,
      y: dimensions.top + innerHeight / 2,
      transform: `rotate(-90 18 ${dimensions.top + innerHeight / 2})`,
      "text-anchor": "middle",
    }, "Final Horizon K_exec"));
  }

  function drawBands() {
    bands.replaceChildren();

    phases.forEach((phase, index) => {
      const left = Number(phase.startStep);
      const right = index + 1 < phases.length ? Number(phases[index + 1].startStep) : episodeSteps;
      bands.appendChild(createSvgElement("rect", {
        class: "case-band-rect",
        "data-phase-index": index,
        x: xScale(left),
        y: dimensions.top,
        width: Math.max(1, xScale(right) - xScale(left)),
        height: innerHeight,
      }));
    });
  }

  function drawStepPath() {
    const commands = [`M ${xScale(starts[0]).toFixed(2)} ${yScale(kExec[0]).toFixed(2)}`];

    for (let index = 1; index < starts.length; index += 1) {
      commands.push(`H ${xScale(starts[index]).toFixed(2)}`);
      commands.push(`V ${yScale(kExec[index]).toFixed(2)}`);
    }

    commands.push(`H ${xScale(episodeSteps).toFixed(2)}`);
    path.setAttribute("d", commands.join(" "));
  }

  function drawDots() {
    replanDots.replaceChildren();
    phaseDots.replaceChildren();

    starts.forEach((start, index) => {
      replanDots.appendChild(createSvgElement("circle", {
        class: "case-replan-dot",
        cx: xScale(start),
        cy: yScale(kExec[index]),
        r: 5.8,
      }));
    });

    phases.forEach((phase, index) => {
      phaseDots.appendChild(createSvgElement("circle", {
        class: "case-phase-dot",
        "data-phase-index": index,
        cx: xScale(Number(phase.startStep)),
        cy: yScale(Number(phase.kExec)),
        r: 7.4,
      }));
    });
  }

  function setStep(step, fromUser = false) {
    currentStep = clamp(step, 0, episodeSteps);
    const roundedStep = Math.round(currentStep);
    const replanIndex = activeReplanIndex(roundedStep);
    const phaseIndex = activePhaseIndex(roundedStep);
    const phase = phases[phaseIndex] || phases[0];
    const k = kExec[replanIndex];
    const x = xScale(currentStep);
    const y = yScale(k);

    range.value = String(roundedStep);
    range.style.setProperty("--case-progress", `${(currentStep / episodeSteps) * 100}%`);

    if (phaseLabel && phase) {
      phaseLabel.textContent = phase.label;
    }
    if (stepLabel) {
      stepLabel.textContent = `Step ${roundedStep}`;
    }
    if (caption && phase) {
      caption.textContent = phase.caption;
    }
    if (kLabel) {
      kLabel.textContent = `K=${k}`;
    }

    phaseCards.forEach((card, index) => {
      card.classList.toggle("is-active", index === phaseIndex);
    });

    if (phaseIndex !== lastPhaseIndex) {
      const activeCard = phaseCards[phaseIndex];
      if (activeCard && phaseStrip && phaseStrip.scrollWidth > phaseStrip.clientWidth) {
        activeCard.scrollIntoView({
          block: "nearest",
          inline: "center",
          behavior: fromUser ? "smooth" : "auto",
        });
      }
      lastPhaseIndex = phaseIndex;
    }

    root.querySelectorAll(".case-band-rect").forEach((rect) => {
      rect.classList.toggle("is-active", Number(rect.dataset.phaseIndex) === phaseIndex);
    });
    root.querySelectorAll(".case-phase-dot").forEach((dot) => {
      dot.classList.toggle("is-active", Number(dot.dataset.phaseIndex) === phaseIndex);
    });

    cursorLine.setAttribute("x1", x.toFixed(2));
    cursorLine.setAttribute("x2", x.toFixed(2));
    cursorLine.setAttribute("y1", String(dimensions.top));
    cursorLine.setAttribute("y2", String(dimensions.height - dimensions.bottom));
    cursorDot.setAttribute("cx", x.toFixed(2));
    cursorDot.setAttribute("cy", y.toFixed(2));

    if (fromUser) {
      holdUntil = performance.now() + userHoldMs;
    }
  }

  function stepFromPointer(event) {
    const matrix = chart.getScreenCTM();
    if (!matrix) {
      return currentStep;
    }
    const point = chart.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const local = point.matrixTransform(matrix.inverse());
    return ((local.x - dimensions.left) / innerWidth) * episodeSteps;
  }

  chart.addEventListener("pointerdown", (event) => {
    dragging = true;
    chart.setPointerCapture(event.pointerId);
    setStep(stepFromPointer(event), true);
  });

  chart.addEventListener("pointermove", (event) => {
    if (dragging) {
      setStep(stepFromPointer(event), true);
    }
  });

  ["pointerup", "pointercancel"].forEach((eventName) => {
    chart.addEventListener(eventName, (event) => {
      dragging = false;
      if (chart.hasPointerCapture(event.pointerId)) {
        chart.releasePointerCapture(event.pointerId);
      }
    });
  });

  range.max = String(episodeSteps);
  range.addEventListener("input", () => {
    setStep(Number(range.value), true);
  });

  drawGridAndAxes();
  drawBands();
  drawStepPath();
  drawDots();
  setStep(0);

  const observer = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0.25);
    if (!visible) {
      lastTick = null;
    }
  }, { threshold: [0, 0.25, 0.5] });
  observer.observe(root);

  function tick(timestamp) {
    if (visible) {
      if (lastTick === null) {
        lastTick = timestamp;
      }
      const delta = timestamp - lastTick;
      lastTick = timestamp;

      if (!dragging && timestamp >= holdUntil) {
        let next = currentStep + (delta / animationDuration) * episodeSteps;
        if (next > episodeSteps) {
          next = 0;
        }
        setStep(next);
      }
    }

    window.requestAnimationFrame(tick);
  }

  window.requestAnimationFrame(tick);
}

function initCaseStudies() {
  document.querySelectorAll(".case-study-figure[data-case-study-src]").forEach(initCaseStudy);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hero-video").forEach(tryPlay);
  bindGalleryControls();
  initCaseStudies();
  updateGallery();
});

window.addEventListener("pageshow", () => {
  document.querySelectorAll(".hero-video").forEach(tryPlay);
  updateGallery();
});

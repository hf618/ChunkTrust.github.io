# ChunkTrust Project Page

Static project page for:

**ChunkTrust**

## Layout

- `index.html` - page structure and content.
- `static/css/index.css` - responsive visual styling.
- `static/js/index.js` - hero playback and the interactive case study.
- `static/js/real-robot.js` / `rollout-hud.js` - real-robot clip selection and synchronized logged diagnostics.
- `assets/figures/` - converted paper figures for web display.
- `assets/videos/real_atlas/` - synchronized overview + three-camera atlases for the gallery.
- `assets/videos/real_h264/` - original composed rollout videos, retained as fallback links.
- `assets/thumbs/real/` - video poster frames.
- `.nojekyll` - disables Jekyll processing on GitHub Pages so static assets are served directly.

## Teaser animation

The approved animation is saved at [assets/videos/teaser/chunktrust_teaser.mp4](assets/videos/teaser/chunktrust_teaser.mp4).
It is a 14-second, 2400 × 1470, 30 fps H.264 MP4. The complete static frame is
[assets/figures/teaser_complete.png](assets/figures/teaser_complete.png).
Playback starts from a blank frame, reveals the upper panels from left to right,
then the Fixed schematic and curves, followed by the Adaptive schematic and references.
The page plays it once on entry and provides pause, seeking, and replay controls.

## Action-expert evidence animation

The approved 7.6-second synchronized animation is saved at
[assets/videos/evidence/chunktrust_evidence.mp4](assets/videos/evidence/chunktrust_evidence.mp4)
(1980 × 612, 30 fps, H.264). Panels (a) and (b) reveal together along the x axis;
panel (c) follows immediately, then the complete figure remains on screen.
It uses the current paper's compact Figure 2, with a static fallback at
[assets/figures/evidence_complete.png](assets/figures/evidence_complete.png).

## Method animation

The approved Overview PPT animation is saved at
[assets/videos/method/chunktrust_method.mp4](assets/videos/method/chunktrust_method.mp4)
(7 seconds, 2400 × 934, 30 fps, H.264). It starts blank, then reveals four
whole sections: Policy rollouts → Dual evidence extraction → Action-aware
Horizon Selector (AHS) → Offline Query-based Horizon Adapter (QHA).
Each section fades in as one unit, without intermediate detail-by-detail reveals.
Each fade lasts 0.4 seconds; intermediate pauses last 1 second. The upper blue
dashed connector stays between neighboring action rows, and the gray signal
arrows have fixed right-facing heads. These paths are edited in PPT render
copies; the source PPT and paper figure are preserved.
The complete static frame is
[assets/figures/method_complete.png](assets/figures/method_complete.png).

All three animations end after exactly **2 seconds (60 frames) of the complete figure**.
Teaser and Evidence use shorter transitions matching Method’s pacing, retaining their approved reveal order. Method uses the four-part sequence.
Each figure has independent
autoplay-on-entry, pause, replay, and seek controls, and stays on its final frame
after ending. Reduced-motion preferences, disabled JavaScript, or a video error
use the complete static figure as a fallback.

Central copies of all three deployed MP4s are in
`/home/hfd24/Fanding/Overleaf/Docs/Videos/ChunkTrust/`.

## Headline results

The three Core Idea cards report **relative improvement**, calculated as
`(adapted / base - 1) × 100` using unrounded averages:

- **+31.9%**: RoboTwin2.0, π0.5, eight tasks, Easy + Hard, Base → AHS+QHA
  (success rate: 29.625% → 39.0625%). Source: paper `Tabs/tab_qha_transfer.tex`.
- **+20.2%**: RoboCasa GR1 Tabletop, Qwen3GR00T, 24 tasks, Base → AHS
  (success rate: 47.833333…% → 57.5%). Source: paper `Tabs/tab_robocasa_full.tex`.
- **+14.0%**: real robots, π0.5, four tasks, Fixed → AHS
  (normalized process score: 50.416666…% → 57.5%). Source: `real_robot_scores_raw.csv`.

## Results tables

The Results section reproduces the current paper's **Table 1** and **Table 2**,
with the same values, two-decimal precision, and best-method bolding:

- **AHS performance across simulation benchmarks** — eight policy/cohort
  comparisons across RoboTwin2.0 and RoboCasa GR1 Tabletop, including task
  scope and training recipe. Source: `Tabs/tab_ahs_summary.tex`.
- **QHA augmentation and transfer on RoboTwin2.0** — panel A covers the eight
  QHA training tasks for π0 and π0.5, split by Easy/Hard; panel B covers a
  separate π0.5 QHA head trained on six tasks and tested on two held-out tasks.
  Source: `Tabs/tab_qha_transfer.tex`.

Both table sources are identical in the current arXiv and ICLR projects.
Yellow columns denote AHS; blue columns denote AHS+QHA. Table 1 gains are
absolute differences from Base; Table 2B gains are absolute differences from
AHS. Gains are copied from the paper and computed before rounding, rather
than recomputed from rounded cells.

The 50-task multitask evaluation is a different checkpoint and evaluation
cohort from the eight-task task-specific evaluations. In panel B, only QHA
is held out from the test tasks; base policies remain task-specific.

## Local Preview

From this directory:

```bash
python3 -m http.server 8090 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8090/
```

The page is static and can also be deployed by copying this directory to any static host.

## GitHub Pages

The public deployment tracks only the files needed by the page. Original source videos under
`assets/videos/real/` and local reference templates under `templates/` are intentionally ignored.

## Real Robot gallery

All 12 existing clips (four tasks × Clean / Randomized / More Randomized) use
the hero's C panels: stage caption, stage-shaded execution-horizon history,
posterior mean ± standard deviation with the selected K, and Top/Right/Left
camera windows. Playback stays at its recorded speed; both video viewers display **Autonomous 1x**. A single large viewer and
filterable thumbnails keep the diagnostics readable. On phones the HUD and
camera windows move below the overview; fullscreen, scrubbing, pause, and
replay are supported. Only the selected, visible clip loads and plays.

The 1920 × 900 MP4 atlas contains a 1600 × 900 overview and three 320 × 240
camera tiles. All four views share one video clock, with the same continuous
source-frame ranges as the previous gallery. These internal atlases are
composited in the browser, rather than intended as standalone presentation
videos. Original composed videos remain linked from the player.

`assets/data/real_rollouts/catalog.json` lists all clips. Per-clip JSON holds
the logged action-step / replan / K frame mapping, Beta posterior parameters
expressed as mean and standard deviation, and visual stage captions.
Captions are manual display annotations, not model-predicted phase labels.
The prior Bread More Randomized and Duck More Randomized annotations are
retained. Local build scripts, source frame mappings, caption contact sheets,
and verification records are in
`/home/hfd24/Fanding/output/project_page/real-robot-gallery-deploy-20260929-v27/`.

The Code button links to https://github.com/hf618/ChunkTrust, the public code-release placeholder. Real Robot task titles and requirements appear in the overview camera’s upper blank area and update with the selected task. The Autonomous 1x badge matches the full width of the left diagnostics panel.

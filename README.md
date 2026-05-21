# ChunkTrust Project Page

Static project page for:

**ChunkTrust**

## Layout

- `index.html` - page structure and content.
- `static/css/index.css` - responsive visual styling.
- `static/js/index.js` - real-robot video filtering and playback behavior.
- `assets/figures/` - converted paper figures for web display.
- `assets/videos/real_h264/` - browser-compatible H.264 rollout videos used by the page.
- `assets/thumbs/real/` - video poster frames.
- `.nojekyll` - disables Jekyll processing on GitHub Pages so static assets are served directly.

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

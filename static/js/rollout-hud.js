// Approved hero C design; counts, phase cuts, and horizon history come from the selected rollout.
window.createRolloutHud = function(data, hud) {
  // Display-stage cuts follow this video's visual captions, mapped onto action steps.
  // They are annotations, not model-predicted phases or the appendix's five snapshot anchors.
  const stageCuts = data.stages.map(stage => data.frames[stage.output_frames_half_open[0]][0]);
  const style = 'c';
  const escape = value => String(value).replace(/[&<>"]/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;'}[char]));
  const fmt = n => Number(n.toFixed(3));
  const text = (x, y, s, cls, anchor = 'start') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${escape(s)}</text>`;
  const line = (x1, y1, x2, y2, cls) => `<line x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}" class="${cls}"/>`;
  const colors = ['#ac965d','#619594','#6b9460','#b4818e','#8d80ab'];
  let lastFrame = -1;
  function render(time) {
    const frame = Math.max(0, Math.min(data.frames.length - 1, Math.floor(time * data.fps + 1e-5)));
    if (frame === lastFrame) return;
    lastFrame = frame;
    const [step, r, stageNumber, k] = data.frames[frame];
    const stage = data.stages[stageNumber - 1], current = data.replans[r];
    let s = `<defs><filter id="rr-panel-shadow" x="-15%" y="-10%" width="135%" height="130%"><feDropShadow dx="0" dy="7" stdDeviation="9" flood-color="#0b251d" flood-opacity=".13"/></filter></defs>`;
    s += `<g class="panel" data-style="${style}" transform="translate(24 300)"><rect class="whole-surface" x="0" y="0" width="336" height="500" rx="18"/><rect class="section-surface" x="0" y="0" width="336" height="110" rx="9"/><rect class="section-surface" x="0" y="120" width="336" height="197" rx="9"/><rect class="section-surface" x="0" y="329" width="336" height="171" rx="9"/>`;
    s += text(20, 25, 'Stage', 'eyebrow') + text(316, 25, `${String(stageNumber).padStart(2,'0')} / ${data.stages.length}`, 'stage-count', 'end');
    s += text(20, 52, stage.lines[0], 'stage-caption') + text(20, 75, stage.lines[1], 'stage-caption');
    for(let j = 0; j < data.stages.length; j++) s += `<rect class="stage-segment" x="${fmt(20+j*(296/data.stages.length))}" y="95" width="${fmt(296/data.stages.length-5)}" height="2.5" rx="1.25" opacity="${j === stageNumber-1 ? 1 : j < stageNumber-1 ? .42 : .13}"/>`;
    s += line(20, 112, 316, 112, 'section-rule');
    s += text(20, 142, 'Execution horizon', 'section-title') + text(20, 161, `Replan ${String(r+1).padStart(2,'0')} / ${data.replans.length}`, 'caption');
    s += `<rect class="k-badge" x="241" y="125" width="75" height="37" rx="8"/>` + text(278.5, 151, `K ${k}`, 'k-value', 'middle');
    const px = v => 43 + v/data.totalSteps*264, py = v => 273 - (v-5)/50*88;
    for (let j=0; j<stageNumber; j++) {
      const start=stageCuts[j], end=Math.min(stageCuts[j+1] ?? data.totalSteps,step);
      const x=px(start), width=Math.max(0,px(end)-x), active=j===stageNumber-1;
      s += `<rect class="stage-band ${active?'current-stage-band':j%2?'stage-band-alt':''}" data-stage="${j+1}" x="${fmt(x)}" y="185" width="${fmt(width)}" height="88"/>`;
      if(j>0) s += line(x,185,x,273,'stage-boundary');
      if(width>=12 || active) {
        const labelX=active ? Math.min(301,Math.max(x+6,x+width/2)) : x+width/2;
        s += text(fmt(labelX),180,String(j+1).padStart(2,'0'),`stage-index${active?' current-stage-index':''}`,'middle');
      }
    }
    for (const val of [10,30,50]) s += line(43,py(val),307,py(val),'grid') + text(33,fmt(py(val)+3),val,'tick','end');
    s += line(43,185,43,273,'axis') + line(43,273,307,273,'axis');
    let path = '';
    for (let j=0; j<=r; j++) {
      const p = data.replans[j], end = Math.min(data.replans[j+1]?.start ?? data.totalSteps,step);
      path += `${j===0?'M':'L'}${fmt(px(p.start))},${fmt(py(p.K))} L${fmt(px(end))},${fmt(py(p.K))} `;
    }
    s += `<path class="curve-fill" d="${path} L${fmt(px(step))},273 L43,273 Z"/><path class="horizon-line" d="${path}"/>`;
    s += line(px(step),185,px(step),273,'cursor') + `<circle class="cursor-dot" cx="${fmt(px(step))}" cy="${fmt(py(k))}" r="3.5"/>`;
    for (const val of [0,Math.round(data.totalSteps/200)*100,data.totalSteps]) s += text(fmt(px(val)),288,val,'tick','middle');
    s += text(175,307,'Executed action steps','caption','middle') + line(20,326,316,326,'section-rule');
    s += text(20,354,'Horizon selection','section-title') + text(20,373,'Posterior mean ± std','caption');
    const bx = v => 43 + (v-10)/40*259, by = v => 461-v*67;
    for(const val of [0,1]) s += line(43,by(val),302,by(val),'grid') + text(33,by(val)+3,val,'tick','end');
    s += line(bx(k),390,bx(k),461,'selection-guide') + `<path class="selection-marker" d="M${fmt(bx(k))},390 l-3.5,-6 h7 Z"/>`;
    for(let j=0; j<current.candidates.length; j++) {
      const cand=current.candidates[j], mean=current.mean[j], std=current.std[j], x=fmt(bx(cand));
      s += `<line class="posterior" stroke="${colors[j]}" x1="${x}" x2="${x}" y1="${fmt(by(Math.min(1,mean+std)))}" y2="${fmt(by(Math.max(0,mean-std)))}"/><circle class="posterior-dot" fill="${colors[j]}" cx="${x}" cy="${fmt(by(mean))}" r="4"/>` + text(x,480,cand,'tick','middle');
    }
    hud.innerHTML = s + '</g>';
    hud.dataset.frame = String(frame);
    hud.dataset.k = String(k);
    hud.dataset.stage = String(stageNumber);
    hud.dataset.replan = String(r);
    hud.dataset.style = style;
    hud.setAttribute('aria-label', `Stage ${stageNumber}: ${stage.caption}. Execution horizon ${k}. Replan ${r+1} of ${data.replans.length}.`);
  }
  return render;
};

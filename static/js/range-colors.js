// Paint the existing playback values; playback and scrubbing remain owned by their players.
(() => {
  const sliders=[...document.querySelectorAll('.teaser-progress,.rr-controls input[type="range"]')];
  function paint(){
    for(const slider of sliders){
      const min=Number(slider.min)||0,max=Number(slider.max)||0;
      const fraction=max>min?(Number(slider.value)-min)/(max-min):0;
      slider.style.setProperty('--mint-progress',`${Math.max(0,Math.min(1,fraction))*100}%`);
    }
  }
  // Capture media events, then let the players update their slider values first.
  for(const type of ['input','timeupdate','loadedmetadata','durationchange','seeked','play','pause','emptied','ended']){
    document.addEventListener(type,()=>queueMicrotask(paint),true);
  }
  paint();
})();

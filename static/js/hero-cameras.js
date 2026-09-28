(() => {
  const style='c';
  const root=document.querySelector('#camera-views');
  if(!root)return;
  root.dataset.style=style;
  root.innerHTML='<div class="camera-stack">'+['Top','Right','Left'].map((name,i)=>`<figure class="camera-card"><figcaption class="camera-label"><span>${name} camera</span><span class="camera-index">0${i+1}</span></figcaption><canvas width="320" height="240" aria-label="${name} camera, synchronized at original speed"></canvas></figure>`).join('')+'</div>';
  const video=document.querySelector('#hero-video');
  const overview=document.querySelector('#overview-canvas');
  const background=overview.getContext('2d',{alpha:false});
  const cameras=[...root.querySelectorAll('canvas')].map(c=>c.getContext('2d',{alpha:false}));
  function draw(time) {
    if(video.readyState<2)return;
    background.drawImage(video,0,0,1600,900,0,0,1600,900);
    cameras.forEach((ctx,i)=>ctx.drawImage(video,1600,i*240,320,240,0,0,320,240));
    root.dataset.frame=String(Math.min(1429,Math.max(0,Math.floor(time*30+1e-5))));
  }
  for(const event of ['loadeddata','seeked','pause','timeupdate'])video.addEventListener(event,()=>draw(video.currentTime));
  if('requestVideoFrameCallback' in video) {
    const tick=(now,metadata)=>{draw(metadata.mediaTime);video.requestVideoFrameCallback(tick)};
    video.requestVideoFrameCallback(tick);
  } else {
    const tick=()=>{draw(video.currentTime);requestAnimationFrame(tick)};requestAnimationFrame(tick);
  }
  draw(video.currentTime);
})();

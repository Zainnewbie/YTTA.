
// Typing effect for the long message
(function(){
  const el = document.getElementById('message');
  const text = window.APP_CONFIG.messageText;
  let i = 0;
  const speed = 28; // lower = faster
  function type(){
    if(i < text.length){
      el.innerText += text.charAt(i);
      i++;
      setTimeout(type, (text[i-1] === '.' || text[i-1] === ',') ? speed*3 : speed);
    }
  }
  type();
})();

// Spawn hearts and cute emojis
function spawnHearts(){
  for(let i=0;i<24;i++){
    const e = document.createElement('div');
    e.className = 'heart';
    e.style.left = Math.random()*100 + 'vw';
    e.style.animationDuration = (3 + Math.random()*3) + 's';
    e.textContent = ['💖','💘','💝','💕'][Math.floor(Math.random()*4)];
    document.body.appendChild(e);
    setTimeout(()=>e.remove(), 7000);
  }
}

// Continuous cute floaters (panda, dolphin, balloons)
(function cuteFloaters(){
  const wrap = document.getElementById('floaters');
  const emojis = ['🐼','🐬','🎈','💌','🩵','⭐','🪽'];
  setInterval(()=>{
    const e = document.createElement('div');
    e.className = 'decor';
    e.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    e.style.left = Math.random()*100 + 'vw';
    e.style.fontSize = (18 + Math.random()*26) + 'px';
    e.style.animationDuration = (6 + Math.random()*6) + 's';
    wrap.appendChild(e);
    setTimeout(()=>e.remove(), 12000);
  }, 900);
})();

// Audio autoplay with graceful fallback
(function audioInit(){
  const audio = document.getElementById('bgm');
  const cta = document.getElementById('audio-cta');
  const btn = document.getElementById('play-btn');

  // Try autoplay (muted first to satisfy policies), then unmute
  audio.muted = true;
  const tryPlay = () => audio.play().then(()=>{
    // started muted; quickly unmute if allowed after small user gestures or delay
    setTimeout(()=>{ audio.muted = false; }, 600);
    cta.classList.add('hidden');
  }).catch(()=>{
    // Show CTA if blocked
    cta.classList.remove('hidden');
  });

  document.addEventListener('click', function onFirstClick(){
    // In case autoplay was blocked, a first user interaction will start it
    if (audio.paused){
      audio.muted = false;
      audio.play().then(()=>cta.classList.add('hidden')).catch(()=>cta.classList.remove('hidden'));
    }
    document.removeEventListener('click', onFirstClick);
  }, { once:true });

  btn.addEventListener('click', ()=>{
    audio.muted = false;
    audio.play().then(()=>cta.classList.add('hidden')).catch(()=>cta.classList.remove('hidden'));
  });

  tryPlay();
})();

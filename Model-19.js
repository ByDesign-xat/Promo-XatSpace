   (function () {
      const tabs = document.querySelectorAll('.tab');
      const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
      function activate(id) {
        tabs.forEach(t => t.setAttribute('aria-selected', t.getAttribute('aria-controls') === id));
        panels.forEach(p => p.dataset.active = p.id === id);
      }
      tabs.forEach(tab => tab.addEventListener('click', () => activate(tab.getAttribute('aria-controls'))));
    })();

    const overlay = document.getElementById('zoom-overlay');
    const zoomImg = document.getElementById('zoom-img');
    document.querySelectorAll('.zoomable').forEach(img => {
      img.addEventListener('click', () => {
        zoomImg.src = img.src;
        overlay.style.display = 'flex';
      });
    });
    
    /* EFECTO NIEVE */
    (function () {
      const c = document.getElementById('snow'), ctx = c.getContext('2d');
      let flakes = [], running = true, w, h;
      function resize() { w = innerWidth; h = innerHeight; c.width = w; c.height = h; spawn(); }
      function spawn() {
        flakes = Array.from({ length: 100 }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1 + Math.random() * 3,
          d: Math.random() * 100,
          v: 0.5 + Math.random() * 1.2,
          h: -0.5 + Math.random() * 1 
        }));
      }
      function step() {
        if (!running) return;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        for (const f of flakes) {
          ctx.moveTo(f.x, f.y);
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
          f.y += f.v;
          f.x += f.h + Math.sin(f.d) * 0.5;
          f.d += 0.01;
          if (f.y > h) f.y = -10, f.x = Math.random() * w;
        }
        ctx.fill();
        requestAnimationFrame(step);
      }
      window.addEventListener('resize', resize); resize(); step();
const snowBtn = document.getElementById('toggleSnow');

if(running){
    snowBtn.classList.add('active');
}

snowBtn.addEventListener('click', () => {

    running = !running;

    snowBtn.classList.toggle('active');

    if(running){
        step();
    }else{
        ctx.clearRect(0,0,w,h);
    }
});
    })();
	
	(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "stars";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let stars = [];
  let active = false;
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

stars = Array.from({length:200}, () => ({
  x: Math.random()*w,
  y: Math.random()*h,
  r: 1 + Math.random()*4,
  a: 0.4 + Math.random()*0.6,
  d: 0.01 + Math.random()*0.04
}));
  }

  function animate() {
    if(!active) return;

    ctx.clearRect(0,0,w,h);

    stars.forEach(s=>{
      s.a += s.d;
      if(s.a > 1 || s.a < 0.2) s.d *= -1;

      ctx.shadowBlur = 15;
      ctx.shadowColor = "#ffffff";
      ctx.fillStyle = `rgba(255,255,255,${s.a})`;
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener("resize",resize);

const starsBtn = document.getElementById("toggleStars");

starsBtn.onclick = ()=>{

    active = !active;

    starsBtn.classList.toggle("active");

    if(active){
        animate();
    }else{
        ctx.clearRect(0,0,w,h);
    }
};
})();

const sakuraBtn = document.getElementById("toggleSakura");

sakuraBtn.onclick = ()=>{

    document.body.classList.toggle("sakura-on");

    sakuraBtn.classList.toggle("active");
};


/* SAKURA EFFECT */

(function(){

    let sakuraActive = false;
    let interval;

    function createPetal(){

        const petal = document.createElement("div");
        petal.className = "sakura";

        const size = 8 + Math.random() * 12;

        petal.style.left = Math.random() * window.innerWidth + "px";
        petal.style.width = size + "px";
        petal.style.height = size + "px";

        petal.style.animationDuration =
            (6 + Math.random() * 6) + "s";

        document.body.appendChild(petal);

        setTimeout(()=>{
            petal.remove();
        },12000);
    }

    document
      .getElementById("toggleSakura")
      .addEventListener("click",()=>{

        sakuraActive = !sakuraActive;

        if(sakuraActive){

            interval = setInterval(createPetal,150);

        }else{

            clearInterval(interval);

            document
              .querySelectorAll(".sakura")
              .forEach(e=>e.remove());
        }
    });

})();


/* RAIN EFFECT */

(function(){

    const canvas = document.createElement("canvas");
    canvas.id = "rain";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let drops = [];
    let active = false;
    let w,h;

    function resize(){
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;

        drops = Array.from({length:250},()=>({
            x:Math.random()*w,
            y:Math.random()*h,
            len:10 + Math.random()*20,
            speed:8 + Math.random()*10
        }));
    }

    function draw(){

        if(!active) return;

        ctx.clearRect(0,0,w,h);

        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.lineWidth = 1;

        drops.forEach(d=>{

            ctx.beginPath();
            ctx.moveTo(d.x,d.y);
            ctx.lineTo(d.x-2,d.y+d.len);
            ctx.stroke();

            d.y += d.speed;

            if(d.y > h){
                d.y = -20;
                d.x = Math.random()*w;
            }
        });

        requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize",resize);

const rainBtn = document.getElementById("toggleRain");

rainBtn.addEventListener("click",()=>{

    active = !active;

    rainBtn.classList.toggle("active");

    if(active){
        draw();
    }else{
        ctx.clearRect(0,0,w,h);
    }
});

})();


/* METEOR EFFECT */

(function(){

    const layer = document.createElement("div");
    layer.id = "meteor-layer";

    document.body.appendChild(layer);

    let active = false;
    let interval;

    function createMeteor(){

        const meteor = document.createElement("div");

        meteor.className = "meteor";

const side = Math.random();

if(side < 0.33){

    // sus
    meteor.style.left =
        Math.random() * window.innerWidth + "px";

    meteor.style.top = "-100px";

}else if(side < 0.66){

    // dreapta
    meteor.style.left =
        (window.innerWidth + 100) + "px";

    meteor.style.top =
        Math.random() * window.innerHeight + "px";

}else{

    // stanga
    meteor.style.left = "-100px";

    meteor.style.top =
        Math.random() * (window.innerHeight * 0.5) + "px";
}

        meteor.style.animationDuration =
            (1.2 + Math.random()).toFixed(2) + "s";

        layer.appendChild(meteor);

        setTimeout(()=>{
            meteor.remove();
        },2500);
    }

    const btn =
        document.getElementById("toggleMeteor");

    btn.addEventListener("click",()=>{

        active = !active;

        btn.classList.toggle("active");

if(active){

    interval = setInterval(() => {

        createMeteor();

    }, 2500);

    createMeteor();

}else{

    clearInterval(interval);

    interval = null;

    layer.innerHTML = "";
}
    });

})();

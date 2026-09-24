const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const PARTICLE_COUNT = 70;
const MAX_DIST = 130;
const MOUSE_RADIUS = 140;

let mouse = { x: -9999, y: -9999 };

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    });
  }
}

function update() {
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.hypot(dx, dy);

    if (dist < MOUSE_RADIUS) {
      const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
      p.x += (dx / dist) * force * 1.8;
      p.y += (dy / dist) * force * 1.8;
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(157, 124, 255, 0.6)';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
    ctx.fill();
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);

      if (dist < MAX_DIST) {
        const opacity = (1 - dist / MAX_DIST) * 0.15;
        ctx.strokeStyle = `rgba(157, 124, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
  mouse.x = -9999;
  mouse.y = -9999;
});

window.addEventListener('resize', () => {
  resize();
  createParticles();
});

resize();
createParticles();
loop();
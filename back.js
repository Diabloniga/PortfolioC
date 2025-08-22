const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");
const text = "ADITYA BISHT";

let particles = [];


function initParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "bold 80px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height / 1.5);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  particles = [];
  for (let y = 0; y < canvas.height; y += 6) {
    for (let x = 0; x < canvas.width; x += 6) {
      const index = (y * canvas.width + x) * 4;
      if (data[index + 3] > 128) { 
        particles.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          size: 3,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          vx: 0,
          vy: 0
        });
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    
    p.x += p.vx;
    p.y += p.vy;

    p.vx += (p.baseX - p.x) * 0.01;
    p.vy += (p.baseY - p.y) * 0.01;

    p.vx *= 0.92;
    p.vy *= 0.92;
  }
  requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  for (let p of particles) {
    const dx = p.x - mx;
    const dy = p.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 60) {
      const angle = Math.atan2(dy, dx);
      const force = (60 - dist) / 6;
      p.vx += Math.cos(angle) * force;
      p.vy += Math.sin(angle) * force;
    }
  }
});

canvas.addEventListener("click", () => {
  for (let p of particles) {
    p.vx += (Math.random() - 0.5) * 20;
    p.vy += (Math.random() - 0.5) * 20;
  }
});

initParticles();
animate();



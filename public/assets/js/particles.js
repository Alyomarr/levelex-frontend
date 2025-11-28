const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particlesArray;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Handle resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Mouse interaction
const mouse = {
  x: null,
  y: null,
  radius: 150,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

// Text Content Repulsion
const heroContent = document.querySelector(".hero-content");
let contentRect = { centerX: 0, centerY: 0, radius: 0 };

function updateContentRect() {
  if (heroContent) {
    const rect = heroContent.getBoundingClientRect();
    // Use a radius that covers the content plus some padding
    // We use the larger dimension to ensure coverage
    const maxDim = Math.max(rect.width, rect.height);
    contentRect = {
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
      // Radius of the "force field"
      radius: maxDim * 0.7,
    };
  }
}
updateContentRect();
window.addEventListener("resize", updateContentRect);
window.addEventListener("scroll", updateContentRect);

// Particle Class
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    // Boundary check
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // --- Mouse Interaction ---
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }

    // --- Smooth Content Repulsion ---
    let dxContent = this.x - contentRect.centerX;
    let dyContent = this.y - contentRect.centerY;
    let distContent = Math.sqrt(dxContent * dxContent + dyContent * dyContent);

    // If particle is within the force field
    if (distContent < contentRect.radius) {
      // Calculate repulsion strength (0 to 1)
      // 1 at center, 0 at edge of radius
      let force = (contentRect.radius - distContent) / contentRect.radius;

      // Normalize direction
      let forceX = dxContent / distContent;
      let forceY = dyContent / distContent;

      // Apply smooth force
      // The multiplier determines how "strong" the repulsion is
      const repulsionStrength = 8;

      this.x += forceX * force * repulsionStrength;
      this.y += forceY * force * repulsionStrength;
    }

    // Move particle
    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 2 + 1;
    // Random position
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 0.4 - 0.2;
    let directionY = Math.random() * 0.4 - 0.2;
    let color = "rgba(0, 255, 255, 0.8)";

    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
}

function connect() {
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance =
        (particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x) +
        (particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y);
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - distance / 20000;
        ctx.strokeStyle = "rgba(0, 255, 255," + opacityValue + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

init();
animate();

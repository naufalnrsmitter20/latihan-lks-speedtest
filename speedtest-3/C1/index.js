/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 320;
class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 2;
    this.vel = {
      x: 0,
      y: 0,
    };
  }
  start() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.x += this.speed;
    const rightWall = canvas.width - this.radius;
    if (this.x <= 0) {
      this.speed *= -1;
    }
    if (this.x >= rightWall) {
      this.speed *= -1;
    }
  }
}

const ballObject = new Ball(10, (canvas.height - 10) / 2, 10);
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ballObject.start();
  ballObject.update();
  requestAnimationFrame(animate);
};
animate();

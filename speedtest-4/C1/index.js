/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
let countGroup = 0;
canvas.width = innerWidth;
canvas.height = innerHeight;
let BallGroup = [];
class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 8;
    this.heightJump = 1000;
    this.gravity = 10;
    this.velocity = {
      y: 0,
    };
  }
  start() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }
  update() {
    this.velocity.y += this.speed;
    this.y += this.velocity.y;
    if (this.y >= canvas.height - this.radius) {
      this.velocity.y = -Math.sqrt(this.gravity * this.heightJump);
      countGroup++;
    }
  }
}
function spawnBall() {
  const BallObject = new Ball(Math.floor(Math.random() * canvas.width - 32), Math.floor(Math.random() * canvas.height - 32 * 2), 32);
  BallGroup.push(BallObject);
}
spawnBall();

function spawnAgain() {
  setTimeout(() => {
    spawnBall();
  }, 2000);
}
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  BallGroup.forEach((ball) => {
    ball.start();
    ball.update();
  });
  if (countGroup >= 3) {
    countGroup = 0;
    BallGroup = [];
    spawnAgain();
  }
  requestAnimationFrame(animate);
};
animate();

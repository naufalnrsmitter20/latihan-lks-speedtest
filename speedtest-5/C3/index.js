/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let isClick = false;
function createText() {
  ctx.beginPath();
  ctx.font = "40px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Haloo", 40, 40);
  ctx.fill();
  ctx.closePath();
}
class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  start() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
const rectObject = new Rect(0, 0, 400, 400);
canvas.addEventListener("mousedown", () => {
  isClick = true;
});
canvas.addEventListener("mouseup", () => {
  isClick = false;
});

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  if (isClick) {
    rectObject.x = mouseX;
    rectObject.y = mouseY;
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createText();
  rectObject.start();
  requestAnimationFrame(animate);
}
animate();

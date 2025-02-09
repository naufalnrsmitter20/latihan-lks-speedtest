/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  start() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.strokeStyle = "red";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
const circleObject = new Circle((canvas.width - 30) / 2, (canvas.height - 30) / 2, 30);
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  circleObject.x = mouseX;
  circleObject.y = mouseY;
});
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circleObject.start();
  requestAnimationFrame(animate);
};
animate();

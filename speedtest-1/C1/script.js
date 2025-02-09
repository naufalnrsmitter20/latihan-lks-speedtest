/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let circlegroup = [];
function drawGround() {
  ctx.fillStyle = "lightBlue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 5;
  }
  start() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }
  //   detectMouse(mouseX, mouseY) {
  //     const dx = mouseX - this.x;
  //     const dy = mouseY - this.y;
  //     const distance = Math.sqrt(dx * dx + dy * dy);
  //     return distance <= this.radius;
  //   }
  update() {
    this.y -= this.speed;
  }
}
const size = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

function drawCircle(mouseX, mouseY) {
  for (let i = 0; i < 1; i++) {
    const circleObject = new Circle(mouseX, mouseY, size[Math.floor(Math.random() * size.length)]);
    circlegroup.push(circleObject);
  }
}
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  drawCircle(mouseX, mouseY);
  console.log(circlegroup);
});

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGround();
  circlegroup.forEach((item) => {
    item.start();
    item.update();
  });
  requestAnimationFrame(animate);
};
animate();

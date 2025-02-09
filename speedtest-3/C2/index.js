/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.width = 1220;
canvas.height = 680;
let rectGroup = [];

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  start() {
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
  touch(mouseX, mouseY) {
    return mouseX <= this.x + this.width && this.x <= mouseX && mouseY <= this.y + this.height && this.y <= mouseY;
  }
  colored() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}

const imgWidth = canvas.width;
const imgHeight = canvas.height;
let x = 0;
let y = 0;
function HandleSubmit(e) {
  e.preventDefault();
  try {
    const formData = new FormData(e.target);
    const valueData = Object.fromEntries(formData.entries());
    x = parseInt(valueData.x);
    y = parseInt(valueData.y);
    rectGroup = [];
    spawnRectangle();
  } catch (error) {
    console.log(error);
  }
}
function imageDrawing() {
  const image = new Image();
  image.src = "./img/image.jpg";
  ctx.drawImage(image, 0, 0, imgWidth, imgHeight);
}
function spawnRectangle() {
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const rectObject = new Rectangle(i * (canvas.width / x), j * (canvas.height / y), canvas.width / x, canvas.height / y);
      rectGroup.push(rectObject);
    }
  }
}
canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  rectGroup.forEach((item, index) => {
    const isTouch = item.touch(mouseX, mouseY);
    if (isTouch) {
      rectGroup.splice(index, 1);
    }
  });
});
canvas.addEventListener("mouseover", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  rectGroup.forEach((item) => {
    const isTouch = item.touch(mouseX, mouseY);
    if (isTouch) {
      item.colored();
    }
  });
});

spawnRectangle();
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  imageDrawing();
  rectGroup.forEach((item) => {
    item.start();
  });
  requestAnimationFrame(animate);
};
animate();

/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 500;

const JumlahGroup = [13, 27, 41, 55, 70];
const tanggalGroup = [1, 2, 3, 4, 5, 6, 7, 8];
const dataset = [11, 17, 172, 96, 158, 31, 148, 76];
const verticalGap = 6;
const horizontalGap = 5;

const heightJumlah = Math.max(...JumlahGroup);
const widthTanggal = Math.max(...tanggalGroup);

function createLeftLine() {
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(50, canvas.height - 50);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function createBottomLine() {
  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50);
  ctx.lineTo(canvas.width - 50, canvas.height - 50);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function createVerticalText(x, y, text) {
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText(text, x, y);
}

function createHorizontalText(x, y, text) {
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText(text, x, y);
}

function spawnTextVertical() {
  for (let i = 0; i < JumlahGroup.length; i++) {
    createVerticalText(20, canvas.height - i * 40 - 60, JumlahGroup[i]);
  }
}

function spawnTextHorizontal() {
  for (let i = 0; i < tanggalGroup.length; i++) {
    createHorizontalText(50 + i * 60, canvas.height - 30, tanggalGroup[i]);
  }
}

function spawnLineChart() {
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;

  for (let i = 0; i < dataset.length - 1; i++) {
    let x1 = 50 + i * 60;
    let y1 = canvas.height - dataset[i] - 50;
    let x2 = 50 + (i + 1) * 60;
    let y2 = canvas.height - dataset[i + 1] - 50;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.stroke();
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createLeftLine();
  createBottomLine();
  spawnTextVertical();
  spawnTextHorizontal();
  spawnLineChart();
  requestAnimationFrame(animate);
};
animate();

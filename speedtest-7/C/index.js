/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.width = 460;
canvas.height = 320;
/**@type {HTMLSelectElement} */
const selectedImage = document.getElementById("image");
/**@type {HTMLSelectElement} */
const selectedFilter = document.getElementById("filter");

function createGround() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawImageFirst(image) {
  const imageData = new Image();
  imageData.src = image;
  ctx.drawImage(imageData, 10, 10);
}
function drawImageLast(image, filter) {
  const imageData = new Image();
  imageData.src = image;
  ctx.filter = filter;
  ctx.drawImage(imageData, canvas.width - 210, canvas.height - 310);
  ctx.filter = "none";
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createGround();
  drawImageLast(selectedImage.selectedOptions && selectedImage.value, selectedFilter.selectedOptions && selectedFilter.value);
  drawImageFirst(selectedImage.selectedOptions && selectedImage.value);
  requestAnimationFrame(animate);
};
animate();

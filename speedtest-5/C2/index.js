const grayImage = document.getElementById("filtered");
const round = document.getElementById("round");
const container = document.getElementById("container");
let containerWidth = 500;
let containerHeight = 300;
container.style.width = `${containerWidth}px`;
container.style.height = `${containerHeight}px`;

let isClick = false;
round.addEventListener("mousedown", () => {
  isClick = true;
});
round.addEventListener("mouseup", () => {
  isClick = false;
});

container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  let percentOfOffset = (offsetX / containerWidth) * 100;
  if (isClick && percentOfOffset <= 100) {
    grayImage.style.width = `${percentOfOffset}%`;
    round.style.left = `${percentOfOffset - 2}%`;
  }
});

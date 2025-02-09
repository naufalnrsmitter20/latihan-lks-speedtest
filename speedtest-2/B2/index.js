const FillStar = document.getElementById("img-fill");
const container = document.getElementById("container");

let isClick = false;
container.addEventListener("mousedown", () => {
  isClick = true;
});
container.addEventListener("mouseup", () => {
  isClick = false;
});
container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  const offset = e.clientX - rect.left;
  FillStar.style.width = `${offset}px`;
});

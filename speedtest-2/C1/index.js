const body = document.body;
const container = document.getElementById("main-container");
const mouse = document.getElementById("container-mouse");
const clickContainer = document.getElementById("click-container");
const clickDiv = document.createElement("div");
clickContainer.appendChild(clickDiv);
let state = false;
container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  mouse.style.transform = `translate(${x}px, ${y}px)`;
  clickContainer.style.transform = `translate(${x}px, ${y}px)`;
});

container.addEventListener("mousedown", (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  clickDiv.classList.add("clicked");
  clickContainer.style.transform = `translate(${x}px, ${y}px)`;
  setTimeout(() => {
    clickDiv.classList.remove("clicked");
  }, 400);
});

container.addEventListener("mouseup", () => {});

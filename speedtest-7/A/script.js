const hamburger = document.getElementById("hamburger");
const modal = document.getElementById("modal");
let state = false;
function HandleClick() {
  if (!state) {
    modal.style.display = "block";
    state = true;
  } else {
    modal.style.display = "none";
    state = false;
  }
}

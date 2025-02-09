const time = document.getElementById("time");

let startnum = 0;
let isStart = false;
let timerId = null;
time.textContent = formatTime(startnum);

function start() {
  if (!isStart) {
    timerId = setInterval(() => {
      startnum++;
      time.textContent = formatTime(startnum);
    }, 100);
    isStart = true;
  }
}

function stop() {
  clearInterval(timerId);
  isStart = false;
}
function reset() {
  clearInterval(timerId);
  startnum = 0;
  isStart = false;
  time.textContent = formatTime(startnum);
}
function formatTime(second) {
  let secs = Math.floor(second % 60);
  let minutes = Math.floor(second / 60);
  return `${minutes < 10 ? `${0}${minutes}` : minutes}:${secs < 10 ? `${0}${secs}` : secs}`;
}

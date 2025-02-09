const dataMusic = [
  {
    id: 0,
    judul: "Maher Zain - Ramadan (Malay_Bahasa Version) _ Official Music Video",
    audio: new Audio("./asset/Maher Zain - Ramadan (Malay_Bahasa Version) _ Official Music Video.mp3"),
    author: "Maher Zain",
    status: false,
    duration: 0,
  },
  {
    id: 1,
    judul: "Maher Zain - Sepanjang Hidup (Bahasa Version) - For The Rest Of My Life _ Official Music Video",
    audio: new Audio("./asset/Maher Zain - Sepanjang Hidup (Bahasa Version) - For The Rest Of My Life _ Official Music Video.mp3"),
    author: "Maher Zain",
    status: false,
    duration: 0,
  },
  {
    id: 2,
    judul: "Maher Zain Rahmatul Lil Alamiin (Malay_Bahasa Version) _ Official Music Video",
    audio: new Audio("./asset/maher zain rahmatul lil aalamiin.mp3"),
    author: "Maher Zain",
    status: false,
    duration: 0,
  },
];
// const rangeObject = document.getElementById("range");
let intervalId = null;
let selectedMusic = null;
let currentDuration = 0;
let audioDuration = 0;
let CurrentTimeDuration = 0;
let rangeValue = 0;
let CurrentIndex = null;
function updateDuration(index) {
  if (intervalId) clearInterval(intervalId);

  const audio = dataMusic[index].audio;
  const durationElement = document.querySelector(`.music-duration[data-index="${index}"]`);
  const selectedDurationElement = document.getElementById("selected-duration");
  if (!durationElement) return;

  intervalId = setInterval(() => {
    let remainingTime = audio.duration - audio.currentTime;
    rangeValue = (Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100;
    /**@type {HTMLInputElement} */
    const rangeElement = document.getElementById("range");
    rangeElement.value = rangeValue;

    if (rangeElement) {
      rangeElement.addEventListener("input", () => {
        if (selectedMusic) {
          const newTime = (rangeElement.value / 100) * audio.duration;
          audio.currentTime = newTime;
        }
      });
    }

    if (remainingTime < 0) remainingTime = 0;
    currentDuration = remainingTime;

    durationElement.textContent = formatTime(remainingTime);
    selectedDurationElement.textContent = formatTime(remainingTime);
    if (remainingTime === 0) clearInterval(intervalId);
  }, 1000);
}

function formatTime(second) {
  let secs = Math.floor(second % 60);
  let minutes = Math.floor((second / 60) % 60);
  return `${minutes < 10 ? `0${minutes}` : minutes}:${secs < 10 ? `0${secs}` : secs}`;
}
let pausedIcon = document.getElementById("pause");
let PlayIcon = document.getElementById("play");
function HandlePlayClick(index) {
  CurrentIndex = index;
  const audio = dataMusic[index].audio;
  dataMusic.forEach((music, i) => {
    if (i !== index) {
      music.audio.pause();
      music.audio.currentTime = 0;
      dataMusic[index].status = false;
      document.querySelector(`.pause-btn[data-index="${i}"]`).classList.add("hide");
      document.querySelector(`.play-btn[data-index="${i}"]`).classList.remove("hide");
      const durationElement = document.querySelector(`.music-duration[data-index="${i}"]`);
      if (durationElement) {
        durationElement.textContent = formatTime(music.audio.duration);
      }
    }
  });
  audio.play();
  dataMusic[index].status = true;
  selectedMusic = dataMusic[index];
  const bottomBar = document.getElementById("bottom-bar");
  const bottomBarContent = `
      <div class="range-container">
        <input type="range" value="0" name="range" class="range" id="range" />
        <div class="button-container">
          <button class="pause-only-btn hide">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide2 lucide-circle-pause">
              <circle cx="12" cy="12" r="10" />
              <line x1="10" x2="10" y1="15" y2="9" />
              <line x1="14" x2="14" y1="15" y2="9" />
            </svg>
          </button>
          <button class="play-only-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide1 lucide-circle-play">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
          </button>
        </div>
      </div>
      <div class="bar-container">
        <h2>${selectedMusic.judul}</h2>
        <p>${selectedMusic.author}</p>
        <p id="selected-duration">${selectedMusic.duration}</p>
      </div>
`;
  bottomBar.innerHTML = bottomBarContent;

  document.querySelector(`.pause-btn[data-index="${index}"]`).classList.remove("hide");
  document.querySelector(`.play-btn[data-index="${index}"]`).classList.add("hide");
  const playOnlyButton = document.querySelector(".play-only-btn");
  if (playOnlyButton) {
    playOnlyButton.addEventListener("click", () => {
      HandlePausedClick(index);
      playOnlyButton.classList.add("hide");
      document.querySelector(`.pause-only-btn`).classList.remove("hide");
    });
  }
  // document.querySelector(`.play-only-btn`).classList.add("hide");
  updateDuration(index);
}

function HandlePausedClick(index) {
  const audio = dataMusic[index].audio;
  audio.pause();
  dataMusic[index].status = false;
  clearInterval(intervalId);
  document.querySelector(`.pause-btn[data-index="${index}"]`).classList.add("hide");
  document.querySelector(`.play-btn[data-index="${index}"]`).classList.remove("hide");
  const pauseOnlyButton = document.querySelector(".pause-only-btn");
  if (pauseOnlyButton) {
    pauseOnlyButton.addEventListener("click", () => {
      HandlePlayClick(index);
      pauseOnlyButton.classList.add("hide");
      document.querySelector(`.play-only-btn`).classList.remove("hide");
    });
  }
  // document.querySelector(`.pause-only-btn`).classList.add("hide");
}

const item = document.getElementById("music-group");
dataMusic.forEach((music, index) => {
  music.audio.addEventListener("loadedmetadata", () => {
    dataMusic[index].duration = formatTime(music.audio.duration);

    const musicElement = `
            <div id="item" class="item">
                  <div>
                    <h4 class="music-title">${music.judul}</h4>
                    <p class="music-author">${music.author}</p>
                    <p class="music-duration" data-index="${index}">${formatTime(music.audio.duration)}</p>
                  </div>
                <button class="pause-btn hide" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide2 lucide-circle-pause">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="10" x2="10" y1="15" y2="9" />
                    <line x1="14" x2="14" y1="15" y2="9" />
                    </svg>
                </button>
                <button class="play-btn" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide1 lucide-circle-play">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                </button>
                </div>
            `;
    item.insertAdjacentHTML("beforeend", musicElement);
  });
});

// setTimeout(() => {
//   /**@type {HTMLButtonElement} */
//   const playOnlyButton = document.querySelector(".play-only-btn");
//   if (playOnlyButton) {
//     playOnlyButton.addEventListener("click", () => {
//       HandlePlayClick(CurrentIndex);
//     });
//   }
//   const pauseOnlyButton = document.querySelector(".pause-only-btn");
//   if (pauseOnlyButton) {
//     pauseOnlyButton.addEventListener("click", () => {
//       HandlePausedClick(CurrentIndex);
//     });
//   }
//   console.log(CurrentIndex);
// }, 3000);

setTimeout(() => {
  document.querySelectorAll(".play-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.dataset.index, 10);
      HandlePlayClick(index);
    });
  });
  document.querySelectorAll(".pause-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.dataset.index, 10);
      HandlePausedClick(index);
    });
  });
}, 3000);

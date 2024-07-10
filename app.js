import playList from "./playList.json" with { type: "json" };

const musicImg = document.querySelector(".music-img");
const audioController = document.querySelector(".audio-controller");
const playButton = createIconButton(getIconClassName("play"));
const mutedButton = createIconButton(getIconClassName("volume-up"));
const playIcon = playButton.childNodes[0];
const mutedIcon = mutedButton.childNodes[0];

let audio;
let playState = false;
let mutedState = false;
let volumeState;

const container = document.createElement("div");
container.className = "left-controls";


// 오디오 컨트롤러 렌더링
renderLeftControls();
randomChoiceMusic();

audio.addEventListener('ended',()=>{
  randomChoiceMusic();
  audioPlay();
})

function randomChoiceMusic(){
  const playListArray = playList.data;
  const randomNumber = Math.floor(Math.random() * playListArray.length);
  const randomMusic = playListArray[randomNumber];

  audio = new Audio(`./assets/mp3/${randomMusic.title}.mp3`);
  audio.volume = volumeState
  musicImg.src = `./assets/img/${randomMusic.imgNumber}.png`;
}

function audioPlay() {
  playIcon.className = getIconClassName("pause");
  audio.play();
}

function audioPause() {
  playIcon.className = getIconClassName("play");
  audio.pause();
}

function audioMutedTrue() {
  mutedIcon.className = getIconClassName("muted");
  audio.muted = true;
}

function audioMutedFalse() {
  if (volumeState > 0.5) {
    mutedIcon.className = getIconClassName("volume-up");
  } else {
    mutedIcon.className = getIconClassName("volume");
  }
  audio.muted = false;
}

function playButtonRender() {
  playButton.addEventListener("click", () => {
    playState = !playState;

    if (playState) {
      audioPlay();
    } else {
      audioPause();
    }
  });
  container.appendChild(playButton);
}

function mutedButtonRender() {
  mutedButton.addEventListener("click", () => {
    mutedState = !mutedState;

    if (mutedState) {
      audioMutedTrue();
    } else {
      audioMutedFalse();
    }
  });

  container.appendChild(mutedButton);
}

function volumeRangeRender() {
  const span = document.createElement("span");
  const input = document.createElement("input");
  input.className = "volume-range";
  input.type = "range";
  input.id = "volume";
  input.min = "0";
  input.max = "10";
  input.value = "3";
  
  input.oninput = () => {
    volumeState = audio.volume = input.value / 10;
    
    if (audio.volume === 0) {
      audioMutedTrue();
    } else {
      audioMutedFalse();
    }
  };

  // 볼륨 초기값
  volumeState = input.value / 10
  if (volumeState > 0.5) {
    mutedIcon.className = getIconClassName("volume-up");
  } else {
    mutedIcon.className = getIconClassName("volume");
  }

  span.appendChild(input);
  container.appendChild(span);
}

function renderLeftControls() {
  playButtonRender();
  mutedButtonRender();
  volumeRangeRender();

  audioController.appendChild(container);
}

function createIconButton(iconClassName) {
  const button = document.createElement("button");
  const icon = document.createElement("i");
  icon.className = iconClassName;
  button.appendChild(icon);
  return button;
}

function getIconClassName(icon) {
  let className;

  //volumeState에 의해서 muted 아이콘을 결정하는 로직을 여기에

  if (icon === "pause") {
    className = "fas fa-pause fa-lg";
  } else if (icon === "play") {
    className = "fas fa-play fa-lg";
  } else if (icon === "muted") {
    className = "fas fa-volume-mute fa-lg";
  } else if (icon === "volume") {
    className = "fas fa-volume-down fa-lg";
  } else if (icon === "volume-up") {
    className = "fas fa-volume-up fa-lg";
  }

  return className;
}

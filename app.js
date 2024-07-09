const musicScreenImg = document.querySelector(".music-screen img");
const audioController = document.querySelector(".audio-controller");

const audio = new Audio("./assets/mp3/볼빨간사춘기 - 나의 사춘기에게.mp3");

let playState = false;
let mutedState = false;

const container = document.createElement("div");
container.className = "left-controls";

const playButton = createIconButton(getIconClassName("play"));
const mutedButton = createIconButton(getIconClassName("volume"));

renderLeftControls();

function playButtonRender() {
  playButton.addEventListener("click", () => {
    playState = !playState;
    const icon = playButton.childNodes[0];

    if (playState) {
      icon.className = getIconClassName("pause");
      audio.play();
    } else {
      icon.className = getIconClassName("play");
      audio.pause();
    }
  });
  container.appendChild(playButton);
}

function mutedButtonRender() {
  mutedButton.addEventListener("click", () => {
    mutedState = !mutedState;
    const icon = mutedButton.childNodes[0];

    if (mutedState) {
      icon.className = getIconClassName("muted");
      audio.muted = true;
    } else {
      icon.className = getIconClassName("volume");
      audio.muted = false;
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
  input.oninput = () => {
    audio.volume = input.value / 10;
    if (input.value === "0") {
      // 여기에 audio muted 로직
      // 각각의 audio 함수 로직 만들기
    }
  };

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

  if (icon === "pause") {
    className = "fas fa-pause fa-lg";
  } else if (icon === "play") {
    className = "fas fa-play fa-lg";
  } else if (icon === "muted") {
    className = "fas fa-volume-mute fa-lg";
  } else if (icon === "volume") {
    className = "fas fa-volume-down fa-lg";
  }

  return className;
}

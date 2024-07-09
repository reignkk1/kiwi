const musicScreenImg = document.querySelector(".music-screen img");
const audioController = document.querySelector(".audio-controller");

const audio = new Audio("./assets/mp3/볼빨간사춘기 - 나의 사춘기에게.mp3");

let playState = false;
let mutedState = false;

const container = document.createElement("div");
container.className = "left-controls";

renderLeftControls();

function playButtonRender() {
  const { playIconClassName } = getIconClassName();
  const playButton = createIconButton(playIconClassName);
  playButton.addEventListener("click", () => {
    playState = !playState;
    const { playIconClassName } = getIconClassName();
    const icon = playButton.childNodes[0];
    icon.className = playIconClassName;

    if (playState) {
      audio.play();
    } else {
      audio.pause();
    }
  });
  container.appendChild(playButton);
}

function mutedButtonRender() {
  const { volumeIconClassName } = getIconClassName();
  const mutedButton = createIconButton(volumeIconClassName);
  mutedButton.addEventListener("click", () => {
    mutedState = !mutedState;
    const { volumeIconClassName } = getIconClassName();
    const icon = mutedButton.childNodes[0];
    icon.className = volumeIconClassName;

    if (mutedState) {
      audio.muted = true;
    } else {
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

function getIconClassName() {
  let playIconClassName;
  let volumeIconClassName;

  if (playState) {
    playIconClassName = "fas fa-pause fa-lg";
  } else {
    playIconClassName = "fas fa-play fa-lg";
  }

  if (mutedState) {
    volumeIconClassName = "fas fa-volume-mute fa-lg";
  } else {
    volumeIconClassName = "fas fa-volume-down fa-lg";
  }

  return { playIconClassName, volumeIconClassName };
}

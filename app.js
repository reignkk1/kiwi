const musicScreenImg = document.querySelector(".music-screen img");
const audioController = document.querySelector(".audio-controller");
const audio = document.querySelector(".audio");

let playState = false;
let mutedState = false;

renderLeftControls();

function renderLeftControls() {
  const Container = document.createElement("div");
  Container.className = "left-controls";

  const { playIconClassName, volumeIconClassName } = createIconClassName();

  const playButton = createIconButton(playIconClassName);
  const mutedButton = createIconButton(volumeIconClassName);

  playButton.addEventListener("click", () => {
    playState = !playState;
    audioController.removeChild(Container);
    renderLeftControls();
  });

  mutedButton.addEventListener("click", () => {
    mutedState = !mutedState;
    audioController.removeChild(Container);
    renderLeftControls();
  });

  Container.appendChild(playButton);
  Container.appendChild(mutedButton);
  audioController.appendChild(Container);
}

function createIconButton(iconClassName) {
  const button = document.createElement("button");
  const icon = document.createElement("i");
  icon.className = iconClassName;
  button.appendChild(icon);
  return button;
}

function createIconClassName() {
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

import { createElement } from "./utils.js";

// 플레이 리스트 데이터 가져오기
const playList = await import("./playList.json", {
  with: {
    type: "json",
  },
});

// 뮤직 플레이어 초기 상태
let audio = new Audio();
let playState = false;
let mutedState = false;
let volumeState;

// HTML Elements
const musicScreen = createElement("section", { class: "music-screen" });

const { playButton, playIcon } = createPlayButton();
const { mutedButton, mutedIcon } = createMutedButton();
const volumeRange = createVolumeRange();

const audioController = createElement("div", { class: "audio-controller" });
const musicImg = createElement("img", { class: "music-img" });

// 실행순서
// 컨트롤러 렌더링 -> 음악 랜덤으로 뽑기 -> 뮤직 플레이어 렌더링 -> 이벤트 리스너들 등록
renderLeftController();
randomChoiceMusic();
renderMusicScreen();
addEventListners();

// 모든 이벤트 리스너
function addEventListners() {
  audio.addEventListener("ended", () => {
    randomChoiceMusic();
    audioPlay();
  });

  musicImg.addEventListener("click", () => {
    playState = !playState;
    if (playState) {
      audioPlay();
    } else {
      audioPause();
    }
  });

  musicScreen.addEventListener("mouseleave", () => {
    if (playState) {
      audioController.classList.add("no-show");
    }
  });
  musicScreen.addEventListener("mouseover", () => {
    audioController.classList.remove("no-show");
  });
}

// 뮤직 플레이어 렌더링
function renderMusicScreen() {
  musicScreen.appendChild(musicImg);
  musicScreen.appendChild(audioController);
}

// Audio Controller 렌더링
function renderLeftController() {
  const leftController = createElement("div", { class: "left-controls" });

  leftController.append(playButton, mutedButton, volumeRange);
  audioController.appendChild(leftController);
}

// 음악 랜덤뽑기
function randomChoiceMusic() {
  const playListArray = playList.default.data;
  const randomNumber = Math.floor(Math.random() * playListArray.length);
  const randomMusic = playListArray[randomNumber];

  audio.src = `./assets/mp3/${randomMusic.title}.mp3`;
  audio.volume = volumeState;
  musicImg.src = `./assets/img/${randomMusic.imgNumber}.png`;
}

// 음악 재생
function audioPlay() {
  playIcon.className = getIconClassName("pause");
  audio.play();
}

// 음악 일시정지
function audioPause() {
  playIcon.className = getIconClassName("play");
  audio.pause();
}

// 음소거
function audioMutedTrue() {
  mutedIcon.className = getIconClassName("muted");
  audio.muted = true;
}
// 음소거 해제
function audioMutedFalse() {
  mutedIcon.className = getIconClassName("volume");
  audio.muted = false;
}

// 시작 버튼 생성
function createPlayButton() {
  const playButton = createIconButton(getIconClassName("play"));
  const playIcon = playButton.childNodes[0];
  playButton.addEventListener("click", () => {
    playState = !playState;

    if (playState) {
      audioPlay();
    } else {
      audioPause();
    }
  });

  return { playButton, playIcon };
}

// 음소거 버튼 생성
function createMutedButton() {
  const mutedButton = createIconButton(getIconClassName("volume-up"));
  const mutedIcon = mutedButton.childNodes[0];
  mutedButton.addEventListener("click", () => {
    mutedState = !mutedState;

    if (mutedState) {
      audioMutedTrue();
    } else {
      audioMutedFalse();
    }
  });
  return { mutedButton, mutedIcon };
}

// 볼륨 바 생성
function createVolumeRange() {
  const span = createElement("span");
  const input = createElement("input", {
    class: "volume-range",
    type: "range",
    min: "0",
    max: "10",
    value: "3",
  });

  input.oninput = () => {
    volumeState = audio.volume = input.value / 10;

    if (audio.volume === 0) {
      audioMutedTrue();
    } else {
      audioMutedFalse();
    }
  };

  // 볼륨 초기값
  // audio 의존성 해결하기
  volumeState = input.value / 10;
  audioMutedFalse();

  span.appendChild(input);
  return span;
}

// 아이콘 버튼 생성함수
function createIconButton(iconClassName) {
  const button = createElement("button");
  const icon = createElement("i", { class: iconClassName });
  button.appendChild(icon);
  return button;
}

// 아이콘 ClassName 리턴함수
function getIconClassName(icon) {
  let className;

  if (icon === "pause") {
    className = "fas fa-pause fa-lg";
  } else if (icon === "play") {
    className = "fas fa-play fa-lg";
  } else if (icon === "muted") {
    className = "fas fa-volume-mute fa-lg";
  } else if (icon === "volume") {
    if (volumeState > 0.5) {
      className = "fas fa-volume-up fa-lg";
    } else {
      className = "fas fa-volume-down fa-lg";
    }
  }
  return className;
}

export default musicScreen;

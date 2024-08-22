import state from '../../store';

export function getVolumeIcon() {
  if (state.muted) {
    return 'fas fa-volume-mute fa-lg volume-icon';
  } else if (state.audio.volume >= 0.5) {
    return 'fas fa-volume-up fa-lg volume-icon';
  } else {
    return 'fas fa-volume-down fa-lg volume-icon';
  }
}

export function getPlayIcon() {
  if (state.play) {
    return 'fas fa-pause fa-lg';
  } else {
    return 'fas fa-play fa-lg';
  }
}

export function togglePlay() {
  if (state.play) {
    state.audio.pause();
    state.play = false;
  } else {
    state.audio.play();
    state.play = true;
  }
}

export function toggleMuted() {
  if (state.muted) {
    state.audio.muted = false;
    state.muted = false;
  } else {
    state.audio.muted = true;
    state.muted = true;
  }
}

export function randomChoiceMusic(playList) {
  const playListArray = playList.default.data;
  const randomNumber = Math.floor(Math.random() * playListArray.length);
  const randomMusic = playListArray[randomNumber];

  state.imgSrc = `./assets/img/${randomMusic.imgNumber}.png`;
  state.audio.src = `./assets/mp3/${randomMusic.title}.mp3`;
  state.audioTitle = randomMusic.title;
}

export function showAudioController() {
  document.querySelector('.audio-controller').style = 'display:block';
}

export function hideAudioController() {
  document.querySelector('.audio-controller').style = 'display:none';
}

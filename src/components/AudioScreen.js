const playList = await import('../../playList.json', {
  with: {
    type: 'json',
  },
});

class AudioScreen extends HTMLElement {
  template = () => {
    return `
    <div class='music-screen'>
        <img class='music-img' src='${this.imgSrc}'/>
        <span class='music-title'>${this.musicTitle}</span>
        <div class='audio-controller'>
            <div class='left-controls'>
                <button class='play-button'>
                    <i class='${this.getPlayIcon()}'></i>    
                </button>
                <button class='volume-button'>
                    <i class='${this.getVolumeIcon()}'></i>                 
                </button>
                <span>
                    <input class='volume-range' type='range' min='0' max='1' step='0.1' value='${
                      this.audio.volume
                    }'/>
                </span>
            </div>
        </div>
    </div>
  `;
  };

  constructor() {
    super();

    this.audio = new Audio();
    this.audio.volume = 0.3;

    this.imgSrc = '';
    this.musicTitle = '';
    this.play = false;
    this.muted = false;

    this.randomChoiceMusic();
    this.render();
  }

  render() {
    this.innerHTML = `
    ${this.template()}
    `;
    this.addEvents();
  }

  addEvents() {
    this.audio.addEventListener('ended', () => {
      this.randomChoiceMusic();
      this.audio.play();
      this.render();
    });
    this.querySelector('.play-button').addEventListener('click', () => {
      this.togglePlay();
      this.render();
    });
    this.querySelector('.volume-button').addEventListener('click', () => {
      this.toggleMuted();
      this.render();
    });
    this.querySelector('.volume-range').oninput = (e) => {
      this.audio.volume = e.target.value;

      if (this.audio.volume === 0) {
        this.muted = true;
      } else {
        this.muted = false;
      }
      this.querySelector('.volume-icon').className = this.getVolumeIcon();
    };
    this.querySelector('.music-screen').addEventListener('mouseleave', () => {
      if (this.play) this.hideAudioController();
    });
    this.querySelector('.music-screen').addEventListener('mouseover', () => {
      if (this.play) this.showAudioController();
    });
    this.querySelector('.music-img').addEventListener('click', () => {
      this.togglePlay();
      this.render();
    });
  }

  showAudioController() {
    this.querySelector('.audio-controller').style = 'display:block';
  }

  hideAudioController() {
    this.querySelector('.audio-controller').style = 'display:none';
  }

  togglePlay() {
    if (this.play) {
      this.audio.pause();
      this.play = false;
    } else {
      this.audio.play();
      this.play = true;
    }
  }

  toggleMuted() {
    if (this.muted) {
      this.audio.muted = false;
      this.muted = false;
    } else {
      this.audio.muted = true;
      this.muted = true;
    }
  }

  getVolumeIcon() {
    if (this.muted) {
      return 'fas fa-volume-mute fa-lg volume-icon';
    } else if (this.audio.volume >= 0.5) {
      return 'fas fa-volume-up fa-lg volume-icon';
    } else {
      return 'fas fa-volume-down fa-lg volume-icon';
    }
  }

  getPlayIcon() {
    if (this.play) {
      return 'fas fa-pause fa-lg';
    } else {
      return 'fas fa-play fa-lg';
    }
  }

  randomChoiceMusic() {
    const playListArray = playList.default.data;
    const randomNumber = Math.floor(Math.random() * playListArray.length);
    const randomMusic = playListArray[randomNumber];

    this.imgSrc = `./assets/img/${randomMusic.imgNumber}.png`;
    this.audio.src = `./assets/mp3/${randomMusic.title}.mp3`;
    this.musicTitle = randomMusic.title;
  }
}

export default AudioScreen;

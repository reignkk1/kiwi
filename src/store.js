const state = {
  comments: [],
  audio: new Audio(),
  play: false,
  muted: false,
  imgSrc: '',
  audioSrc: '',
  audioTitle: '',
};

// 컴포넌트 Class가 상태를 구독했다면 상태가 변경됬을 때 구독한 컴포넌트 Class들은 this.render() 실행

export default state;

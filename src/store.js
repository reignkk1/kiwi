export const playListStore = {
  music: await import('../playList.json', {
    with: {type: 'json'},
  }),
};

export const audioStore = {
  audio: new Audio(),
  img: '',
  title: '',
  play: false,
  loop: false,
  shuffle: false,
  muted: false,
};

export const modalMessageStore = {
  show: false,
  text: '',
};

export const modalPlayListStore = {
  show: false,
};

export const musicTitleStore = {
  animation: false,
};

const modalMessage = createStore(
  {
    show: false,
    text: '',
  },
  ['home-main']
);
export function createStore(state, components) {
  return {};
}

createStore();

// 컴포넌트 Class가 상태를 구독했다면 상태가 변경됬을 때 구독한 컴포넌트 Class들은 this.render() 실행
// 인자로 상태와 상태가 변경되면 재렌더링 될 class 컴포넌트를 배열의 형태로 받는다.
// state 객체를 기반으로 set함수들을 만들고 배열에 담긴 컴포넌트들을 재렌더링 시킨다.

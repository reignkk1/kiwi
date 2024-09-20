export const playListStore = {
  music: await import('../playList.json', {
    with: {type: 'json'},
  }),
};

export const audio = new Audio();

export const musicInfoStore = createStore(
  {title: '', singer: '', imgSrc: '', slide: false},
  ['music-info', 'music-img', 'play-list']
);

export const audioControllerStore = createStore(
  {
    play: false,
    loop: false,
    shuffle: false,
    muted: false,
  },
  ['audio-controller']
);

export const modalMessageStore = createStore({show: false}, ['modal-message']);

export const modalPlayListStore = createStore(
  {
    show: false,
  },
  ['play-list-wrap']
);

// 상태관리 하기위한 Store 개념의 모듈
// 첫번째 인자로 state 객체를 넣습니다.
// 두번째 인자로 state가 변할때마다 재렌더링 될 컴포넌트를 넣습니다.
function createStore(state = {}, components = ['']) {
  let currentState = state;
  let setState;
  let getState;

  // setStae 인자로 함수가 들어올 때 return 값을 state로 바꿈
  // 함수 인자로 prevState 리턴되게 연구
  setState = (newState) => {
    currentState = {...currentState, ...newState};
    // setTimeout을 안쓰면 컴포넌트 render부분이 오류남
    // render가 비동기로
    setTimeout(() => {
      components.forEach((component) => {
        document.querySelector(component).render();
      });
    });
  };

  getState = () => {
    return currentState;
  };

  return {getState, setState};
}

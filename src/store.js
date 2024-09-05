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

// setState 함수 객체를 따로 만들어보기 set함수를 실행하면 자동 렌더링
export function useStore() {}
// 컴포넌트 Class가 상태를 구독했다면 상태가 변경됬을 때 구독한 컴포넌트 Class들은 this.render() 실행

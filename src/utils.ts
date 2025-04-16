import parse from "html-react-parser";
import { useLocation } from "react-router-dom";
import { BASE_URL_SLICE } from "./constant";

// 현재 어떤 페이지에 위치하고 있는지 리턴해주는 함수
export function useCurrentPage() {
  const { pathname } = useLocation();

  const pageMap: { [key: string]: string } = {
    "/": "home",
    "/search": "search",
    "/storage": "storage",
    "/player": "player",
  };

  return pageMap[pathname] || "unknown";
}

// letter 인자로 들어온 글자들 중 keyWord에 해당하는 부분을 marking 해주는 함수
export function markKeyword(letter: string, keyWord: string) {
  return parse(letter.replaceAll(keyWord, `<mark>${keyWord}</mark>`));
}

// 총 길이에서 현재 시간을 인자 값으로 받아 퍼센트로 나타내주는 함수
// ex) getProgressPercent(50,100) => 50%
export function getProgressPercent(currentTime: number, duration: number) {
  return Number(((currentTime / duration) * 100).toFixed(1));
}

// 총 길이와 퍼센트 숫자를 인자 값으로 넣으면 현재 시간이 리턴된다.
export function convertFromPercentToTime(duration: number, percent: number) {
  return Math.floor(Math.floor(duration) * (percent / 100));
}

// 숫자로 된 초시간을 인자 값으로 받아 쌍점(:)을 사용한 표기법으로 변환
// 1분 10초 => 70초
// ex) convertTime(70) => 1:10
export function convertTime(time: number) {
  time = Math.floor(time);

  const minute = Math.floor(time / 60);
  const second = String(time % 60).padStart(2, "0");

  return `${minute}:${second}`;
}

// 타입 확인 is 객체 => boolean 값 리턴
export const is = {
  boolean: (data: any) => typeof data === "boolean",
  number: (data: any) => typeof data === "number",
  object: (data: any) => typeof data === "object",
  string: (data: any) => typeof data === "string",
};

// 어레이 안에 있는 값들을 랜덤으로 뽑는 함수
export function selectRandomWithinArray(array: Array<number>) {
  return array[Math.floor(Math.random() * array.length)];
}

// 기본 베이스 주소를 더하다.
export function addBasePath(path?: string) {
  const pathSplit = path?.split("/");
  pathSplit?.splice(0, 1, BASE_URL_SLICE);

  return pathSplit?.join("/");
}

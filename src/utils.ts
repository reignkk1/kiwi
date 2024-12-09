import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

export function useActiveSection() {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return "home";
  } else {
    return pathname.split("/")[1];
  }
}

export function markKeyword(letter: string, keyWord: string) {
  return parse(letter.replaceAll(keyWord, `<mark>${keyWord}</mark>`));
}

export function getProgressPercent(currentTime: number, duration: number) {
  return Number(((currentTime / duration) * 100).toFixed(1));
}

// 숫자 데이터를 넣었을 때 => 0:00, 2:23 이런식으로 변환해주는 모듈 개발

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

export function convertTime(time: number) {
  time = Math.floor(time);

  const minute = Math.floor(time / 60);
  const second = String(time % 60).padStart(2, "0");

  return `${minute}:${second}`;
}

export function convertFromPercentToTime(duration: number, percent: number) {
  return Math.floor(Math.floor(duration) * (percent / 100));
}

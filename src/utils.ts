import parse from "html-react-parser";
import { useLocation } from "react-router-dom";

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

export const is = {
  boolean: (data: any) => typeof data === "boolean",
  number: (data: any) => typeof data === "number",
  object: (data: any) => typeof data === "object",
  string: (data: any) => typeof data === "string",
};

export function selectRandomWithinArray(array: Array<string | number>) {
  return array[Math.floor(Math.random() * array.length)];
}

import parse from "html-react-parser";
import { BASE_URL_SLICE } from "./constant";
import music from "./musicData.json";
import { GenreType } from "./types";

// letter 인자로 들어온 글자들 중 keyWord에 해당하는 부분을 marking 해주는 함수
export function markKeyword(letter: string, keyWord: string) {
  return parse(letter.replaceAll(keyWord, `<mark>${keyWord}</mark>`));
}

// 숫자로 된 초시간을 인자 값으로 받아 쌍점(:)을 사용한 표기법으로 변환
// 1분 10초 => 70초
// ex) convertTime(70) => 1:10
export function formatTime(time: number) {
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
export function addBasePath(path: string = "") {
  const pathSplit = path?.split("/");
  pathSplit?.splice(0, 1, BASE_URL_SLICE);

  return pathSplit?.join("/");
}

// 음악 id 값에 대한 타입 검증 함수
// 문자열 number 값이 들어오면 숫자로 인식하여 변환
export function resolveMusicId(musicId?: string | number) {
  if (musicId === undefined || musicId === null) {
    throw new Error("musicId is required");
  }
  const resolvedMusicId = Number(musicId);

  if (isNaN(resolvedMusicId)) {
    throw new Error("musicId is not number");
  }

  return resolvedMusicId;
}

// 음악 id 값으로 데이터 가져오기
export function getMusicDataFromId(id?: string | number) {
  const resolvedMusicId = resolveMusicId(id);
  const musicData = music.data.find(({ id }) => id === resolvedMusicId);
  if (!musicData) throw new Error("music not found");
  return musicData;
}

// 음악 src 값으로 데이터 가져오기
export function getMusicDataFromSrc(src: string) {
  const musicData = music.data.find(({ imgSrc }) => imgSrc === src);
  if (!musicData) throw new Error("music not found");
  return musicData;
}

// 장르에 맞는 음악 데이터 가져오기
export function getMusicDataFromGenre(genre: GenreType | "all") {
  if (genre === "all") {
    return music.data;
  }

  const musicData = music.data.filter((music) => music.genre === genre);
  if (!musicData) throw new Error("music not found");
  return musicData;
}

// 메뉴 id값을 한글로 변경
export function convertToGenreKorea(letter?: string | GenreType) {
  if (!letter) return null;

  const convertMap: Record<GenreType | string, string> = {
    indie: "인디음악",
    ballad: "발라드",
    hiphop: "랩/힙합",
    all: "전체",
  };
  return convertMap[letter];
}

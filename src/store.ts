import { parserLocalStorage } from "parser-storages";
import { create } from "zustand";
import musicData from "./musicData.json";

interface AudioStore {
  audio: HTMLAudioElement;
  isPlay: boolean;
  musicInfo: { title: string; singer: string };
  play: (musicInfo: { title: string; singer: string }) => void;
  pause: () => void;
  togglePlay: () => void;
}

interface UserNameStore {
  userName: string;
  setUserName: (name: string) => void;
}

const music = musicData.data;

export const musicStore = {
  getAllMusic: () => {
    return music;
  },
  getIncludedMusic: (keyword: string) => {
    return music.filter(({ title, singer }) => {
      const isIncludesKeyword = (letter: string) =>
        letter.replaceAll(" ", "").includes(keyword);
      return isIncludesKeyword(title) || isIncludesKeyword(singer);
    });
  },
};

export const useAudioStore = create<AudioStore>((set) => ({
  audio: new Audio(),
  isPlay: false,
  musicInfo: { title: "", singer: "" },
  play: (newMusicInfo) =>
    set((state) => {
      if (newMusicInfo) {
        state.musicInfo = newMusicInfo;
        state.audio.src = `./mp3/${newMusicInfo.singer} - ${newMusicInfo.title}.mp3`;
      }
      state.audio.play();
      return { isPlay: true };
    }),
  pause: () =>
    set((state) => {
      state.audio.pause();
      return { isPlay: false };
    }),

  togglePlay: () =>
    set((state) => {
      if (state.isPlay) {
        state.audio.pause();
      } else {
        state.audio.play();
      }
      return { isPlay: !state.isPlay };
    }),
}));

export const useUserNameStore = create<UserNameStore>((set) => ({
  userName: parserLocalStorage.get("name"),
  setUserName: (name) =>
    set(() => {
      return { userName: name };
    }),
}));

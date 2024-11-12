import { create } from "zustand";
import { MusicType } from "./types";
import musicData from "./musicData.json";
import { parserLocalStorage } from "parser-storages";

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

interface SearchStore {
  searchKeyWord: string;
  searchResultMusic: MusicType[];
  setSearchKeyWord: (keyWord: string) => void;
  searchMusic: () => void;
}

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

export const useSearchStore = create<SearchStore>((set) => ({
  searchKeyWord: "",
  searchResultMusic: [],
  setSearchKeyWord: (keyWord) =>
    set(() => {
      return { searchKeyWord: keyWord };
    }),
  searchMusic: () =>
    set((state) => {
      if (!state.searchKeyWord) {
        return { searchResultMusic: [] };
      }

      const result = musicData.data.filter(({ title, singer }) => {
        const getCleanedString = (letter: string) =>
          letter.replaceAll(" ", "").toLowerCase();

        const isIncludesKeyword = (letter: string) =>
          getCleanedString(letter).includes(
            getCleanedString(state.searchKeyWord)
          );

        return isIncludesKeyword(title) || isIncludesKeyword(singer);
      });

      return { searchResultMusic: result };
    }),
}));

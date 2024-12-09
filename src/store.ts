import { create } from "zustand";
import { MusicType } from "./types";
import musicData from "./musicData.json";
import { parserLocalStorage } from "parser-storages";
import { getProgressPercent } from "./utils";

interface AudioStore {
  audio: HTMLAudioElement;
  isPlay: boolean;
  musicInfo: MusicType;
  progressPercent: number;
  currentTime: number;
  play: (musicInfo: MusicType) => void;
  pause: () => void;
  togglePlay: () => void;
  setProgressPercent: () => void;
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

interface EntryStore {
  show: boolean;
  showEntry: () => void;
  hiddenEntry: () => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  audio: new Audio(),
  isPlay: false,
  musicInfo: {} as MusicType,
  progressPercent: 0,
  currentTime: 0,
  play: (newMusicInfo) =>
    set((state) => {
      if (newMusicInfo) {
        state.audio.src = `./mp3/${newMusicInfo.singer} - ${newMusicInfo.title}.mp3`;
      }
      state.audio.play();
      return { isPlay: true, musicInfo: newMusicInfo };
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

  setProgressPercent: () =>
    set((state) => {
      return {
        progressPercent: getProgressPercent(
          state.audio.currentTime,
          state.audio.duration
        ),
        currentTime: state.audio.currentTime,
      };
    }),
}));

export const useUserNameStore = create<UserNameStore>((set) => ({
  userName: parserLocalStorage.get("name"),
  setUserName: (name) =>
    set(() => {
      return { userName: name.slice(0, 4) };
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

export const useEntryStore = create<EntryStore>((set) => ({
  show: false,
  showEntry: () =>
    set(() => {
      return { show: true };
    }),
  hiddenEntry: () =>
    set(() => {
      return { show: false };
    }),
}));

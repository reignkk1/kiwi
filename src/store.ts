import { create } from "zustand";
import { MusicType } from "./types";
import musicData from "./musicData.json";
import { parserLocalStorage } from "parser-storages";

interface AudioStore {
  audio: HTMLAudioElement;
  isPlay: boolean;
  musicInfo: MusicType;
  progressPercent: number;
  currentTime: number;
  play: (musicInfo: MusicType) => void;
  pause: () => void;
  togglePlay: () => void;
  setProgressPercent: (progressPercent: number) => void;
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

interface ActiveGenreMenuStore {
  activeGenreMenu: string;
  setActiveGenreMenu: (genreMenu: string) => void;
}

interface AlbumMusicListStore {
  albumMusicList: MusicType[];
  setAlbumMusicListAll: () => void;
  filterAlbumMusicList: (activeGenreMenu: string) => void;
}

interface IsExpandStore {
  isExpand: boolean;
  setIsExpand: (isExpand: boolean) => void;
}

interface ProgressInputValueStore {
  progressInputValue: number;
  setProgressInputValue: (progressInputValue: number) => void;
}

interface IsExpandLyricsStore {
  isExpandLyrics: boolean;
  setIsExpandLyrics: (isExpandLyrics: boolean) => void;
  toggleExpandLyrics: () => void;
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

  setProgressPercent: (progressPercent) =>
    set((state) => {
      return {
        progressPercent,
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

export const useActiveGenreMenu = create<ActiveGenreMenuStore>((set) => ({
  activeGenreMenu: "all",
  setActiveGenreMenu: (genreMenu) => {
    set(() => {
      return { activeGenreMenu: genreMenu };
    });
  },
}));

export const useAlbumMusicList = create<AlbumMusicListStore>((set) => ({
  albumMusicList: [],
  setAlbumMusicListAll: () => {
    set(() => {
      return { albumMusicList: musicData.data };
    });
  },
  filterAlbumMusicList: (activeGenreMenu) => {
    set(() => {
      return {
        albumMusicList: musicData.data.filter(
          ({ genre }) => genre === activeGenreMenu
        ),
      };
    });
  },
}));

// 잡고 끌었는지 ?
export const useIsExpandStore = create<IsExpandStore>((set) => ({
  isExpand: false,
  setIsExpand: (isExpand) => {
    set(() => {
      return { isExpand };
    });
  },
}));

// expand 됬을 때 input의 value 퍼센트
export const useProgressInputStore = create<ProgressInputValueStore>((set) => ({
  progressInputValue: 0,
  setProgressInputValue: (progressInputValue) => {
    set(() => {
      return { progressInputValue };
    });
  },
}));

// 가사 클릭시 확대
export const useIsExpandLyricsStore = create<IsExpandLyricsStore>((set) => ({
  isExpandLyrics: false,
  setIsExpandLyrics: (isExpandLyrics) => {
    set(() => {
      return { isExpandLyrics };
    });
  },
  toggleExpandLyrics: () =>
    set((state) => {
      return { isExpandLyrics: !state.isExpandLyrics };
    }),
}));

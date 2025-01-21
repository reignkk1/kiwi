import { create } from "zustand";
import musicData from "./musicData.json";
import { parserLocalStorage } from "parser-storages";
import {
  ActiveGenreMenuAction,
  ActiveGenreMenuState,
  AlbumMusicListAction,
  AlbumMusicListState,
  AudioAction,
  AudioState,
  EntryAction,
  EntryState,
  IsExpandAction,
  IsExpandLyricsAction,
  IsExpandLyricsState,
  IsExpandState,
  MusicType,
  ProgressInputValueAction,
  ProgressInputValueState,
  SearchAction,
  SearchState,
  UserNameAction,
  UserNameState,
} from "./types";
import { getProgressPercent } from "./utils";

export const useAudioStore = create<AudioState & AudioAction>((set) => ({
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
  updateProgressPercent: () =>
    set((state) => {
      return {
        progressPercent:
          getProgressPercent(state.audio.currentTime, state.audio.duration) ||
          0,
        currentTime: state.audio.currentTime,
      };
    }),

  setProgressPercent: (value) => {
    set(() => {
      return {
        progressPercent: value,
      };
    });
  },
}));

export const useUserNameStore = create<UserNameState & UserNameAction>(
  (set) => ({
    userName: parserLocalStorage.get("name"),
    setUserName: (name) =>
      set(() => {
        return { userName: name.slice(0, 4) };
      }),
  })
);

export const useSearchStore = create<SearchState & SearchAction>((set) => ({
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

export const useEntryStore = create<EntryState & EntryAction>((set) => ({
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

export const useActiveGenreMenu = create<
  ActiveGenreMenuState & ActiveGenreMenuAction
>((set) => ({
  activeGenreMenu: "all",
  setActiveGenreMenu: (genreMenu) => {
    set(() => {
      return { activeGenreMenu: genreMenu };
    });
  },
}));

export const useAlbumMusicList = create<
  AlbumMusicListState & AlbumMusicListAction
>((set) => ({
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
export const useIsExpandStore = create<IsExpandState & IsExpandAction>(
  (set) => ({
    isExpand: false,
    setIsExpand: (isExpand) => {
      set(() => {
        return { isExpand };
      });
    },
  })
);

// expand 됬을 때 input의 value 퍼센트
export const useProgressInputStore = create<
  ProgressInputValueState & ProgressInputValueAction
>((set) => ({
  progressInputValue: 0,
  setProgressInputValue: (progressInputValue) => {
    set(() => {
      return { progressInputValue };
    });
  },
}));

// 가사 클릭시 확대
export const useIsExpandLyricsStore = create<
  IsExpandLyricsState & IsExpandLyricsAction
>((set) => ({
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

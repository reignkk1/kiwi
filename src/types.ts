export interface MusicType {
  id: number;
  title: string;
  singer: string;
  imgSrc: string;
  backGroundColor: string[];
  genre: string;
  lyrics: { text: string; startTime: number; endTime: number }[];
}

export interface AudioState {
  audio: HTMLAudioElement;
  isPlay: boolean;
  musicInfo: MusicType;
  progressPercent: number;
  currentTime: number;
}

export interface AudioAction {
  play: (musicInfo: AudioState["musicInfo"]) => void;
  pause: () => void;
  togglePlay: () => void;
  setProgressPercent: (progressPercent: AudioState["progressPercent"]) => void;
}

export interface UserNameState {
  userName: string;
}

export interface UserNameAction {
  setUserName: (name: UserNameState["userName"]) => void;
}

export interface SearchState {
  searchKeyWord: string;
  searchResultMusic: MusicType[];
}

export interface SearchAction {
  setSearchKeyWord: (keyWord: SearchState["searchKeyWord"]) => void;
  searchMusic: () => void;
}

export interface EntryState {
  show: boolean;
}

export interface EntryAction {
  showEntry: () => void;
  hiddenEntry: () => void;
}

export interface ActiveGenreMenuState {
  activeGenreMenu: string;
  setActiveGenreMenu: (genreMenu: string) => void;
}

export interface ActiveGenreMenuAction {
  activeGenreMenu: string;
  setActiveGenreMenu: (
    genreMenu: ActiveGenreMenuState["activeGenreMenu"]
  ) => void;
}

export interface AlbumMusicListState {
  albumMusicList: MusicType[];
}

export interface AlbumMusicListAction {
  setAlbumMusicListAll: () => void;
  filterAlbumMusicList: (activeGenreMenu: string) => void;
}

export interface IsExpandState {
  isExpand: boolean;
}

export interface IsExpandAction {
  isExpand: boolean;
  setIsExpand: (isExpand: IsExpandState["isExpand"]) => void;
}

export interface ProgressInputValueState {
  progressInputValue: number;
}

export interface ProgressInputValueAction {
  setProgressInputValue: (
    progressInputValue: ProgressInputValueState["progressInputValue"]
  ) => void;
}

export interface IsExpandLyricsState {
  isExpandLyrics: boolean;
}

export interface IsExpandLyricsAction {
  setIsExpandLyrics: (
    isExpandLyrics: IsExpandLyricsState["isExpandLyrics"]
  ) => void;
  toggleExpandLyrics: () => void;
}

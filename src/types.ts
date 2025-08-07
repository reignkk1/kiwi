export type GenreType = "ballad" | "indie" | "hiphop";

export type Pages = "home" | "search" | "drawer" | "player" | "music" | "album";

export type MusicType = {
  id: number;
  title: string;
  singer: string;
  imgSrc: string;
  backGroundColor: Array<string>;
  genre: string;
  releaseDate?: string;
  publisher?: string;
  agency?: string;
  albumTitle?: string;
  albumIntro?: string;
  lyricist?: string;
  composer?: string;
  arranger?: string;
  lyrics: Array<{ text: string; startTime: number; endTime: number }>;
};

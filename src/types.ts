export type GenreMenuType = "all" | "ballad" | "indie" | "hiphop";

export type Pages = "home" | "search" | "storage" | "player" | "music";

export type MusicType = {
  id: number;
  title: string;
  singer: string;
  imgSrc: string;
  backGroundColor: Array<string>;
  genre: string;
  lyrics: Array<{ text: string; startTime: number; endTime: number }>;
};

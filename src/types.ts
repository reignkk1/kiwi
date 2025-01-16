export interface MusicType {
  id: number;
  title: string;
  singer: string;
  imgSrc: string;
  backGroundColor: string[];
  genre: string;
  lyrics: { text: string; startTime: number; endTime: number }[];
}

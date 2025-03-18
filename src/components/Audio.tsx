import { useShallow } from "zustand/react/shallow";
import { createAudioStore } from "./shared/store";
import { useEffect, useRef } from "react";
import {
  createIsRepeatStore,
  createIsShuffleStore,
} from "./pages/player/store";
import { musicDrawerStorage } from "../lib/localStorage";
import music from "../musicData.json";
import { selectRandomWithinArray } from "../utils";

export default function AudioImpl() {
  const [isPlay, src, setCurrentTime, setDuration, moveTimePoint, play] =
    createAudioStore(
      useShallow((state) => [
        state.isPlay,
        state.src,
        state.setCurrentTime,
        state.setDuration,
        state.moveTimePoint,
        state.play,
      ])
    );

  const isShuffle = createIsShuffleStore((state) => state.isShuffle);
  const isRepeat = createIsRepeatStore((state) => state.isRepeat);

  const { get, set } = musicDrawerStorage;

  // 셔플, 반복재생 구현

  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    if (isPlay) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlay, src]);

  useEffect(() => {
    audioRef.current.currentTime = moveTimePoint;
  }, [moveTimePoint]);

  const onTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);

  const onDurationChange = () => setDuration(audioRef.current.duration);
  const playRandom = () => {
    console.log("실행");
    const musicInfo = music.data.find(
      (music) => music.id === selectRandomWithinArray(get("musicDrawer"))
    );

    // 랜덤 재생 구현

    console.log(musicInfo);
    if (musicInfo) {
      play(musicInfo);
    }
  };
  const playInOrder = () => {};

  return (
    <audio
      ref={audioRef}
      src={src}
      onTimeUpdate={onTimeUpdate}
      onDurationChange={onDurationChange}
      onEnded={playRandom}
    />
  );
}

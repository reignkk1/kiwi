import { useEffect, useRef } from "react";
import { musicDrawerStorage } from "../../lib/localStorage";
import music from "../../musicData.json";
import { selectRandomWithinArray } from "../../utils";
import { useAudioImplStore } from "./hooks";
import { MusicType } from "../shared/types";

export default function AudioImpl() {
  const {
    state: {
      isPlay,
      src,
      action,
      moveTimePoint,
      musicInfo,
      isRepeat,
      isShuffle,
    },
    action: { setAction, setCurrentTime, setDuration, setIsPlay, setMusicInfo },
  } = useAudioImplStore();

  const { get: getMusicDrawerStorage } = musicDrawerStorage;
  const musicDrawer = getMusicDrawerStorage("musicDrawer");
  const defaultMusicInfo = music.data.find(
    (music) => music.id === musicDrawer[0]
  );

  const audioRef = useRef<HTMLAudioElement>(new Audio());

  console.log(musicDrawer);

  //  음악 히스토리 스택으로 구현
  const nextPlayedMusicHistory = useRef<Array<MusicType>>([]).current;
  const prevPlayedMusicHistory = useRef<Array<MusicType>>([]).current;

  useEffect(() => {
    if (defaultMusicInfo) {
      setMusicInfo(defaultMusicInfo);
    }
  }, []);

  useEffect(() => {
    if (action === "playNext") {
      if (isShuffle) {
        if (nextPlayedMusicHistory.length === 0) {
          playRandom();
          prevPlayedMusicHistory.push(musicInfo);
        } else {
          setMusicInfo(
            nextPlayedMusicHistory[nextPlayedMusicHistory.length - 1]
          );
          setIsPlay(true);

          prevPlayedMusicHistory.push(musicInfo);
          nextPlayedMusicHistory.pop();
        }
      } else {
        playInOrder("next");
      }
    } else if (action === "playPrev") {
      if (isShuffle) {
        if (prevPlayedMusicHistory.length === 0) {
          playRandom();
          nextPlayedMusicHistory.push(musicInfo);
        } else {
          setMusicInfo(
            prevPlayedMusicHistory[prevPlayedMusicHistory.length - 1]
          );
          setIsPlay(true);

          nextPlayedMusicHistory.push(musicInfo);
          prevPlayedMusicHistory.pop();
        }
      } else {
        playInOrder("prev");
      }
    }

    setAction(null);
  }, [action]);

  useEffect(() => {
    if (isPlay) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlay, src]);

  useEffect(() => {
    audioRef.current.currentTime = moveTimePoint;
  }, [moveTimePoint]);

  useEffect(() => {
    if (isRepeat) {
      audioRef.current.loop = true;
    } else {
      audioRef.current.loop = false;
    }
  }, [isRepeat]);

  const onTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);

  const onDurationChange = () => setDuration(audioRef.current.duration);

  // musicId를 인자 값으로 넣으면 해당 음악을 재생한다.
  const playMusic = (musicId: number | string) => {
    const newMusicInfo = music.data.find((music) => music.id === musicId)!;
    setMusicInfo(newMusicInfo);
    setIsPlay(true);
  };

  // 랜덤 재생
  const playRandom = () => {
    if (musicDrawer.length === 1) {
      audioRef.current.load();
      return audioRef.current.play();
    }
    // 음악서랍에 담긴 musicId 배열 값 안에서 랜덤으로 musicId 값을 뽑는다.
    let nextMusicId = selectRandomWithinArray(musicDrawer);

    // 현재 재생 중인 음악 id값
    let currentMusicId = musicInfo.id;

    // 랜덤으로 뽑은 음악이 현재 재생 중인 음악과 같다면 다를 때까지 다시 뽑는다.
    while (nextMusicId === currentMusicId) {
      nextMusicId = selectRandomWithinArray(musicDrawer);
    }

    playMusic(nextMusicId);
  };

  // 순서가 있는 재생
  const playInOrder = (type: "next" | "prev") => {
    if (musicDrawer.length === 1) {
      setIsPlay(true);
      audioRef.current.load();
      return audioRef.current.play();
    }

    // 현재 재생 중인 음악의 다음 곡 인덱스 값을 가져온다.
    let musicIndex =
      musicDrawer.findIndex((musicId) => musicId === musicInfo.id) +
      (type === "next" ? 1 : -1);

    // 만약 다음 곡의 인덱스가 없다면 첫번째 곡으로 간다.
    if (type === "next") {
      if (musicIndex === musicDrawer.length) {
        musicIndex = 0;
      }

      // 만약 이전 곡의 인덱스가 없다면 마지막 곡으로 간다.
    } else if (type === "prev") {
      if (musicIndex === -1) {
        musicIndex = musicDrawer.length - 1;
      }
    }

    // 다음 곡의 id 값
    const nextMusicId = musicDrawer[musicIndex];

    playMusic(nextMusicId);
  };

  return (
    <audio
      ref={audioRef}
      src={src}
      onTimeUpdate={onTimeUpdate}
      onDurationChange={onDurationChange}
      onEnded={() => setAction("playNext")}
    />
  );
}

// 리팩토링 진행, 스토어 디스패처 형태로 구현해보기

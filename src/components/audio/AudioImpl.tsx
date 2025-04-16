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

  // localStorage 저장소 객체
  const { get: getMusicDrawerStorage } = musicDrawerStorage;
  const musicDrawer = getMusicDrawerStorage("musicDrawer");

  const defaultMusicInfo = music.data.find(
    (music) => music.id === musicDrawer[0]
  );

  // 오디오 객체
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const audio = audioRef.current;

  //  음악 히스토리 스택
  const nextPlayedMusicHistory = useRef<Array<MusicType>>([]).current;
  const prevPlayedMusicHistory = useRef<Array<MusicType>>([]).current;

  // 음악서랍의 첫번째 곡을 초기 상태로 설정
  useEffect(() => {
    if (defaultMusicInfo) {
      setMusicInfo(defaultMusicInfo);
    }
  }, []);

  // 사용자의 액션에 따른 로직 수행
  useEffect(() => {
    if (action === "playNext") playDirection("next");
    if (action === "playPrev") playDirection("prev");

    // 액션 초기화
    setAction(null);
  }, [action]);

  useEffect(() => {
    isPlay ? audio.play() : audio.pause();
  }, [isPlay, src]);

  useEffect(() => {
    audio.currentTime = moveTimePoint;
  }, [moveTimePoint]);

  useEffect(() => {
    audio.loop = isRepeat;
  }, [isRepeat]);

  const playDirection = (direction: "next" | "prev") => {
    if (musicDrawer.length === 1) return playAgainCurrentMusic();

    const historyStack =
      direction === "next" ? prevPlayedMusicHistory : nextPlayedMusicHistory;

    const playHistoryStack =
      direction === "next" ? nextPlayedMusicHistory : prevPlayedMusicHistory;

    if (isShuffle) {
      if (historyStack.length === 0) {
        playRandom();
        playHistoryStack.push(musicInfo);
      } else {
        const popMusicInfo = historyStack.pop()!;
        setMusicInfo(popMusicInfo);
        setIsPlay(true);
        playHistoryStack.push(musicInfo);
      }
    } else {
      playInOrder(direction);
    }
  };

  // 현재 음악 다시 로드하고 재생
  const playAgainCurrentMusic = () => {
    setIsPlay(true);
    audio.load();
    audio.play();
  };

  // musicId를 인자 값으로 넣으면 해당 음악을 재생한다.
  const playMusic = (musicId: number) => {
    const newMusicInfo = music.data.find((music) => music.id === musicId)!;
    setMusicInfo(newMusicInfo);
    setIsPlay(true);
  };

  // 랜덤 재생
  const playRandom = () => {
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
  const playInOrder = (direction: "next" | "prev") => {
    // 현재 재생 중인 음악의 다음 곡 인덱스 값을 가져온다.
    let nextMusicIndex =
      musicDrawer.findIndex((musicId) => musicId === musicInfo.id) +
      (direction === "next" ? 1 : -1);

    // 이전 곡이 없으면 마지막 곡으로
    if (nextMusicIndex === -1) nextMusicIndex = musicDrawer.length - 1;

    // 다음 곡이 없으면 첫번째 곡으로
    if (nextMusicIndex === musicDrawer.length) nextMusicIndex = 0;

    // 다음 곡의 id 값
    const nextMusicId = musicDrawer[nextMusicIndex];

    playMusic(nextMusicId);
  };

  return (
    <audio
      ref={audioRef}
      src={src}
      onTimeUpdate={() => setCurrentTime(audio.currentTime)}
      onDurationChange={() => setDuration(audio.duration)}
      onEnded={() => setAction("playNext")}
    />
  );
}

// 리팩토링 진행, 스토어 디스패처 형태로 구현해보기

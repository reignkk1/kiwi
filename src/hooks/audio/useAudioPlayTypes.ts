import music from "../../musicData.json";
import { selectRandomWithinArray } from "../../utils";
import { useAudioStore } from "../../store/audio";
import { useCurrentMusicStore } from "../../store/shared";
import { useShallow } from "zustand/react/shallow";
import { useMusicDrawerStore } from "../../store/storage/useMusicDrawerStore";

// 오디오 플레이 방식들을 리턴하는 Hook
// 1. 선택재생
// 2. 랜덤재생
// 3. 순차재생

export default function useAudioPlayTypes() {
  const musicDrawer = useMusicDrawerStore((state) => state.musicDrawer);

  const setIsPlay = useAudioStore((state) => state.setIsPlay);

  const [currentMusic, setCurrentMusic] = useCurrentMusicStore(
    useShallow((state) => [state.currentMusic, state.setCurrentMusic])
  );

  // 선택 재생
  // musicId를 인자 값으로 넣으면 해당 음악을 재생한다.
  const playMusicId = (musicId: number) => {
    const newMusicInfo = music.data.find((music) => music.id === musicId)!;
    setCurrentMusic(newMusicInfo);
    setIsPlay(true);
  };

  // 랜덤 재생
  const playRandom = () => {
    // 음악서랍에 담긴 musicId 배열 값 안에서 랜덤으로 musicId 값을 뽑는다.
    let nextMusicId = selectRandomWithinArray(musicDrawer);

    // 현재 재생 중인 음악 id값
    let currentMusicId = currentMusic.id;

    // 랜덤으로 뽑은 음악이 현재 재생 중인 음악과 같다면 다를 때까지 다시 뽑는다.
    while (nextMusicId === currentMusicId) {
      nextMusicId = selectRandomWithinArray(musicDrawer);
    }

    playMusicId(nextMusicId);
  };

  // 순차 재생
  const playInOrder = (direction: "next" | "prev") => {
    // 현재 재생 중인 음악의 다음 곡 인덱스 값을 가져온다.
    let nextMusicIndex =
      musicDrawer.findIndex((musicId) => musicId === currentMusic.id) +
      (direction === "next" ? 1 : -1);

    // 이전 곡이 없으면 마지막 곡으로
    if (nextMusicIndex === -1) nextMusicIndex = musicDrawer.length - 1;

    // 다음 곡이 없으면 첫번째 곡으로
    if (nextMusicIndex === musicDrawer.length) nextMusicIndex = 0;

    // 다음 곡의 id 값
    const nextMusicId = musicDrawer[nextMusicIndex];

    playMusicId(nextMusicId);
  };

  return { playRandom, playInOrder, playMusicId };
}

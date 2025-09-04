import { useEffect } from "react";
import music from "../../musicData.json";
import { useCurrentMusicStore } from "../../store/shared";
import { useDrawerStore } from "../../store/drawer/useDrawerStore";

// 오디오 초기음악 설정 hook

export default function useAudioInitialize() {
  const playListIds = useDrawerStore((state) => state.playListIds);

  const setCurrentMusic = useCurrentMusicStore(
    (state) => state.setCurrentMusic
  );

  // 음악서랍에 저장된 첫번째 곡을 default 값으로 초기화
  const defaultMusicInfo = music.data.find(
    (music) => music.id === playListIds[0]
  );

  useEffect(() => {
    if (defaultMusicInfo) {
      setCurrentMusic(defaultMusicInfo);
    }
  }, [defaultMusicInfo, setCurrentMusic]);
}

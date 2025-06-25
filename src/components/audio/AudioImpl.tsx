import { useEffect, useRef } from "react";
import { useAudioImplStore } from "../../hooks/audio/useAudioImplStore";
import useAudioInitialize from "../../hooks/audio/useAudioInitialize";
import useAudioDirectionHandler from "../../hooks/audio/useAudioDirectionHandler";
import { addBasePath } from "../../utils";

export default function AudioImpl() {
  useAudioInitialize();

  const {
    state: { isPlay, src, playDirection, currentMusic, isLoop, seekTo },
    action: {
      setPlayDirection,
      setCurrentTime,
      setDuration,
      setSrc,
      setSeekTo,
      setSeeking,
    },
  } = useAudioImplStore();

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const audio = audioRef.current;

  const handlePlayDirection = useAudioDirectionHandler(audio);

  // 사용자의 액션에 따른 로직 수행
  useEffect(() => {
    if (playDirection === "next") handlePlayDirection("next");
    if (playDirection === "prev") handlePlayDirection("prev");

    // 액션 초기화
    setPlayDirection(null);
  }, [playDirection, handlePlayDirection, setPlayDirection]);

  useEffect(() => {
    isPlay ? audio.play().catch(() => audio.play()) : audio.pause();
  }, [isPlay, src, audio]);

  useEffect(() => {
    audio.loop = isLoop;
  }, [isLoop, audio]);

  useEffect(() => {
    setSrc(
      addBasePath(`/mp3/${currentMusic.singer} - ${currentMusic.title}.mp3`)
    );
    audio.currentTime = 0;
  }, [currentMusic, setSrc, audio]);

  useEffect(() => {
    if (seekTo) {
      audio.currentTime = seekTo;
      setSeekTo(null);
    }
  }, [seekTo, audio, setSeekTo]);

  return (
    <audio
      ref={audioRef}
      src={src}
      onSeeked={() => setSeeking(false)}
      onTimeUpdate={() => setCurrentTime(audio.currentTime)}
      onDurationChange={() => setDuration(audio.duration)}
      onEnded={() => setPlayDirection("next")}
    />
  );
}

// 오디오 재생관련된 로직들을 각각 추상화 해보기
// 기능별로 현재는 너무 복잡함. 렌더링 최적화 진행
// 각각의 로직별로 써보면서 정리해보기

import { useEffect } from "react";
import { useAudioImplStore } from "../../hooks/audio/useAudioImplStore";
import useAudioInitialize from "../../hooks/audio/useAudioInitialize";
import useAudioDirectionHandler from "../../hooks/audio/useAudioDirectionHandler";
import useAudioRef from "../../hooks/audio/useAudioRef";
import { addBasePath } from "../../utils";

export default function AudioImpl() {
  useAudioInitialize();

  const {
    state: { isPlay, src, playDirection, currentMusic, isRepeat, currentTime },
    action: { setPlayDirection, setCurrentTime, setDuration, setSrc },
  } = useAudioImplStore();

  const { audio, audioRef } = useAudioRef();

  const handlePlayDirection = useAudioDirectionHandler();

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
    audio.currentTime = currentTime;
  }, [currentTime, audio]);

  useEffect(() => {
    audio.loop = isRepeat;
  }, [isRepeat, audio]);

  useEffect(() => {
    setSrc(
      addBasePath(`/mp3/${currentMusic.singer} - ${currentMusic.title}.mp3`)
    );
  }, [currentMusic, setSrc]);

  return (
    <audio
      ref={audioRef}
      src={src}
      onTimeUpdate={() => setCurrentTime(audio.currentTime)}
      onDurationChange={() => setDuration(audio.duration)}
      onEnded={() => setPlayDirection("next")}
    />
  );
}

import { useEffect, useRef } from "react";
import { useAudioImplStore } from "../hooks/audio/useAudioImplStore";
import useAudioInitialize from "../hooks/audio/useAudioInitialize";
import { addBasePath } from "../utils";
import { useMutedStore } from "../store/player/useMutedStore";
import { useVolumeStore } from "../store/player/useVolumeStore";

export default function AudioImpl() {
  useAudioInitialize();

  const {
    state: { isPlay, src, currentMusic, isLoop, seekTo },
    action: {
      setPlayDirection,
      setCurrentTime,
      setDuration,
      setSrc,
      setSeekTo,
      setSeeking,
    },
  } = useAudioImplStore();

  const isMuted = useMutedStore((state) => state.isMuted);
  const volume = useVolumeStore((state) => state.volume);

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const audio = audioRef.current;

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
      setSeekTo(0);
    }
  }, [seekTo, audio]);

  useEffect(() => {
    audio.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);

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

import { useRef } from "react";

export default function useAudioRef() {
  // 오디오 객체
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const audio = audioRef.current;

  return { audio, audioRef };
}

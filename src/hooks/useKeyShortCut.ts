import { useEffect } from "react";

export function useKeyShortCut() {
  const setKeyShortCut = (key: string, event: () => void) => {
    useEffect(() => {
      const keyUpEvent = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          event();
        }
      };

      window.addEventListener("keyup", keyUpEvent);
      return () => window.removeEventListener("keyup", keyUpEvent);
    }, [key, event]);
  };

  return setKeyShortCut;
}

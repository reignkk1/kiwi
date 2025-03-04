import { useShallow } from "zustand/react/shallow";
import {
  createAlertMessageStore,
  createAudioStore,
  createIsExpandProgressBarStore,
  createProgressInputStore,
} from "../../shared/store";
import {
  createIsExpandLyricsStore,
  createIsLyricsClickedStore,
  createIsPlayerMenuStore,
} from "./store";

export function useLyricsAndImageStore() {
  const isExpandProgressBar = createIsExpandProgressBarStore(
    (state) => state.isExpandProgressBar
  );

  const isPlayerMenu = createIsPlayerMenuStore((state) => state.isPlayerMenu);

  const [musicInfo, currentTime] = createAudioStore(
    useShallow((state) => [state.musicInfo, state.currentTime])
  );

  const [isLyricsClicked, clickLyrics, unclickedLyrics] =
    createIsLyricsClickedStore(
      useShallow((state) => [
        state.isLyricsClicked,
        state.clickLyrics,
        state.unclickedLyrics,
      ])
    );

  const [isExpandLyrics, setIsExpandLyrics, toggleExpandLyrics] =
    createIsExpandLyricsStore(
      useShallow((state) => [
        state.isExpandLyrics,
        state.setIsExpandLyrics,
        state.toggleExpandLyrics,
      ])
    );

  return {
    state: {
      musicInfo,
      currentTime,
      isExpandLyrics,
      isExpandProgressBar,
      isLyricsClicked,
      isPlayerMenu,
    },
    action: {
      setIsExpandLyrics,
      toggleExpandLyrics,
      clickLyrics,
      unclickedLyrics,
    },
  };
}

export function usePlayerHeaderStore() {
  const musicInfo = createAudioStore((state) => state.musicInfo);

  const isExpandLyrics = createIsExpandLyricsStore(
    (state) => state.isExpandLyrics
  );

  const [isPlayerMenu, openPlayerMenu, closePlayerMenu] =
    createIsPlayerMenuStore(
      useShallow((state) => [
        state.isPlayerMenu,
        state.openPlayerMenu,
        state.closePlayerMenu,
      ])
    );

  return {
    state: { musicInfo, isExpandLyrics, isPlayerMenu },
    action: { openPlayerMenu, closePlayerMenu },
  };
}

export function useTimeStampStore() {
  const [audio, currentTime] = createAudioStore(
    useShallow((state) => [state.audio, state.currentTime])
  );

  const isExpandProgressBar = createIsExpandProgressBarStore(
    (state) => state.isExpandProgressBar
  );

  const progressInputValue = createProgressInputStore(
    (state) => state.progressInputValue
  );

  return {
    state: { audio, currentTime, isExpandProgressBar, progressInputValue },
  };
}

export function usePlayerMenuStore() {
  const musicInfo = createAudioStore((state) => state.musicInfo);

  const closePlayerMenu = createIsPlayerMenuStore(
    (state) => state.closePlayerMenu
  );

  const [showAlertMessage, hiddenAlertMessage] = createAlertMessageStore(
    useShallow((state) => [state.showAlertMessage, state.hiddenAlertMessage])
  );

  let timeoutId: NodeJS.Timeout;

  const toggleShowAlertMessage = (text: string) => {
    // 눌렀을 때 clear함수가 스택에 있으면 clear 없으면 noclear
    // 클릭을 여러번 계속하면 메시지는 계속 띄워지고 2초뒤에 사라짐
    // alert 컴포넌트 transtion 으로 구현하기
    hiddenAlertMessage();
    showAlertMessage(text);
    console.log(timeoutId);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => hiddenAlertMessage(), 2000);
    console.log(timeoutId);
  };
  return {
    state: { musicInfo },
    action: {
      closePlayerMenu,
      toggleShowAlertMessage,
    },
  };
}

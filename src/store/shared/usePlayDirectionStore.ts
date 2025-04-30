import { create } from "zustand";

// 사용자의 상호작용 이벤트에 대한 상태 Store

type PlayDirectionState = {
  playDirection: "next" | "prev" | null;
};

type PlayDirectionAction = {
  setPlayDirection: (direction: PlayDirectionState["playDirection"]) => void;
};

type PlayDirectionStore = PlayDirectionState & PlayDirectionAction;

export const usePlayDirectionStore = create<PlayDirectionStore>((set) => ({
  playDirection: null,
  setPlayDirection: (direction) => set({ playDirection: direction }),
}));

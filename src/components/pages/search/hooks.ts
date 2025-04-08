import { useShallow } from "zustand/react/shallow";
import { createSearchStore } from "./store";

export function useSearchBarStore() {
  const [searchKeyWord, searchMusic, setSearchKeyWord] = createSearchStore(
    useShallow((state) => [
      state.searchKeyWord,
      state.searchMusic,
      state.setSearchKeyWord,
    ])
  );
  return {
    state: { searchKeyWord },
    action: { setSearchKeyWord, searchMusic },
  };
}

export function useSearchListStore() {
  const [searchKeyWord, searchResultMusic] = createSearchStore(
    useShallow((state) => [state.searchKeyWord, state.searchResultMusic])
  );
  return { state: { searchKeyWord, searchResultMusic } };
}

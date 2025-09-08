import usePlayinglistResolver from "./usePlayinglistResolver";
import usePlaylistResolver from "./usePlaylistResolver";

export const ACTIONS = {
  GET_PLAYLIST_BY_CURRENT_CATEGORY: "GET_PLAYLIST_BY_CURRENT_CATEGORY",
  GET_PLAYLIST_BY_PAGE: "GET_PLAYLIST_BY_PAGE",
} as const;

type ActionType = {
  GET_PLAYLIST_BY_CURRENT_CATEGORY: ReturnType<typeof usePlayinglistResolver>;
  GET_PLAYLIST_BY_PAGE: ReturnType<typeof usePlaylistResolver>;
};

export default function resolverDispatch<K extends keyof typeof ACTIONS>(
  action: K
): ActionType[K] {
  const storeMap: { [P in keyof typeof ACTIONS]: () => ActionType[P] } = {
    [ACTIONS.GET_PLAYLIST_BY_CURRENT_CATEGORY]: usePlayinglistResolver,
    [ACTIONS.GET_PLAYLIST_BY_PAGE]: usePlaylistResolver,
  };
  return storeMap[action]();
}

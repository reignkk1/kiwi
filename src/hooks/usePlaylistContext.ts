import { drawerDispatcher, playListDispatcher } from "./musicListDispatcher";
import { useCurrentPage } from "./useCurrentPage";

export default function usePlaylistContext() {
  const currentPage = useCurrentPage();

  const resolveDispatcher =
    currentPage === "drawer" ? drawerDispatcher : playListDispatcher;

  return { ...resolveDispatcher };
}

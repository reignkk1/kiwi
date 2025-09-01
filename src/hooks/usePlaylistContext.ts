import {
  useDrawerDispatcher,
  usePlaylistDispatcher,
} from "./musicListDispatcher";
import { useCurrentPage } from "./useCurrentPage";

export default function usePlaylistContext() {
  const currentPage = useCurrentPage();

  const resolveDispatcher =
    currentPage === "drawer" ? useDrawerDispatcher() : usePlaylistDispatcher();

  return { ...resolveDispatcher };
}

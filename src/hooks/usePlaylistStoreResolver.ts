import {
  useDrawerStore,
  usePlaylistStore,
} from "../store/drawer/useMusicListStore";
import { useCurrentPage } from "./useCurrentPage";

export default function usePlaylistStoreResolver() {
  const currentPage = useCurrentPage();

  const resolveStore =
    currentPage === "drawer" ? useDrawerStore() : usePlaylistStore();

  return { ...resolveStore };
}

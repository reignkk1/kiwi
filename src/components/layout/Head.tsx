import { Helmet } from "react-helmet";
import { useCurrentPage } from "../../hooks/useCurrentPage";
import { useCurrentMusicStore } from "../../store/shared";
import type { Pages } from "../../types";

export default function Head() {
  const currentPage = useCurrentPage();
  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const titleMap: Record<Pages, string> = {
    home: "Kiwi - 노래가 필요한 순간, 키위",
    search: "Kiwi - 검색",
    drawer: "Kiwi - 음악서랍",
    player: currentMusic
      ? `${currentMusic.title} - ${currentMusic.singer}`
      : "Kiwi - 플레이어",
    music: "Kiwi - 곡 정보",
    album: "Kiwi - 앨범 정보",
  };

  return (
    <Helmet>
      <title>{titleMap[currentPage]}</title>
    </Helmet>
  );
}

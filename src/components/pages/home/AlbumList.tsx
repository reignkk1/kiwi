import Album from "./Album";
import { useEffect } from "react";
import styled from "styled-components";
import { useAlbumListStore } from "../../../hooks/store/useAlbumListStore";

export default function AlbumList() {
  const {
    state: { activeMenu, albumMusicList },
    action: { setAlbumMusicListAll, filterAlbumMusicList },
  } = useAlbumListStore();

  useEffect(() => {
    activeMenu === "all"
      ? setAlbumMusicListAll()
      : filterAlbumMusicList(activeMenu);
    console.log(activeMenu);
  }, [activeMenu, setAlbumMusicListAll, filterAlbumMusicList]);

  // 메뉴를 클릭시 필터된 데이터를 캐싱하여 성능 최적화 한다.
  // useMemo 했는데 왜 데이터가 초기화되는지 보기

  // 해당 컴포넌트가 재렌더링이 되면서 그전의 list 상태를 갖고 있으므로
  // 그 이전의 상태를 갖고 컴포넌트를 렌더링을 함.

  // 그다음 렌더링이 끝나면 useEffect가 실행이 되면서 메뉴에 따른 새로운 list를 업데이트함.
  // 업데이트되면 해당 list 컴포넌트가 다시 재렌더링 되면서 데이터를 새롭게 다시 보여줌.

  console.log(albumMusicList);

  return (
    <Container>
      {albumMusicList.map((music) => (
        <Album key={music.id} music={music} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  height: 400px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  overflow: auto;
  grid-gap: 10px;
`;

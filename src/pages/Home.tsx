import HeaderTitle from "../components/layout/Header";
import AlbumList from "../components/pages/home/AlbumList";
import GenreMenu from "../components/pages/home/GenreMenu";
import { useUserNameStore } from "../store/layout";

export default function Home() {
  const userName = useUserNameStore((state) => state.userName);

  return (
    <div>
      <HeaderTitle title={userName + "님 어서오세요!"} />
      <GenreMenu />
      <AlbumList />
    </div>
  );
}

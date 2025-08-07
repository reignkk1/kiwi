import HeaderTitle from "../components/layout/Header";
import TitleContent from "../components/layout/TitleContent";
import HomeAlbumList from "../components/pages/home/HomeAlbumList";
import HomeGenreMenu from "../components/pages/home/HomeGenreMenu";
import { useUserNameStore } from "../store/layout";

export default function Home() {
  const userName = useUserNameStore((state) => state.userName);

  return (
    <div>
      <HeaderTitle title={userName + "님 어서오세요!"} />
      <TitleContent title="장르">
        <HomeGenreMenu />
        <HomeAlbumList />
      </TitleContent>
    </div>
  );
}

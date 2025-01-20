import AlbumList from "../components/pages/home/AlbumList";
import GenreMenu from "../components/pages/player/GenreMenu";

export default function Home() {
  return (
    <div>
      <GenreMenu />
      <AlbumList />
    </div>
  );
}

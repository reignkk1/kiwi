import PlaylistHeaderNav from "../components/shared/PlaylistHeaderNav";
import PlaylistMusic from "../components/shared/PlaylistMusic";
import PlaylistTotalCount from "../components/shared/PlaylistTotalCount";

export default function Playlist() {
  return (
    <div>
      <PlaylistHeaderNav />
      <PlaylistTotalCount />
      <PlaylistMusic />
    </div>
  );
}

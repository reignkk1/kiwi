import Header from "../components/layout/Header";
import DrawerMusicList from "../components/pages/drawer/DrawerMusicList";
import DrawerTotalCount from "../components/pages/drawer/DrawerTotalCount";

export default function Drawer() {
  return (
    <div>
      <Header title="음악서랍" />
      <DrawerTotalCount />
      <DrawerMusicList />
    </div>
  );
}

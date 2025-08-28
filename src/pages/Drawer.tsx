import DrawerHeaderNav from "../components/pages/drawer/DrawerHeaderNav";
import DrawerMusicList from "../components/pages/drawer/DrawerMusicList";
import DrawerTotalCount from "../components/pages/drawer/DrawerTotalCount";

export default function Drawer() {
  return (
    <div>
      <DrawerHeaderNav />
      <DrawerTotalCount />
      <DrawerMusicList />
    </div>
  );
}

import Header from "../components/layout/Header";
import MusicDrawerList from "../components/pages/storage/MusicDrawerList";
import TotalCount from "../components/pages/storage/TotalCount";

export default function Storage() {
  return (
    <div>
      <Header title="음악서랍" />
      <TotalCount />
      <MusicDrawerList />
    </div>
  );
}

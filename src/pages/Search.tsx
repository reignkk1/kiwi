import HeaderTitle from "../components/layout/Header";
import SearchBar from "../components/pages/search/SearchBar";
import SearchList from "../components/pages/search/SearchList";

export default function Search() {
  return (
    <div>
      <HeaderTitle title="나에게 맞춘 탐색" />
      <SearchBar />
      <SearchList />
    </div>
  );
}

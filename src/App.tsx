import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { AlbumIntro, Home, Music, Player, Search, Drawer } from "./pages";
import { BASE_URL_SLICE } from "./constant";

function App() {
  return (
    <BrowserRouter basename={BASE_URL_SLICE}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/player" element={<Player />} />
          <Route path="/drawer" element={<Drawer />} />
          <Route path="/music/:id" element={<Music />} />
          <Route path="/album/:id" element={<AlbumIntro />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

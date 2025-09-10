import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { AlbumIntro, Home, Music, Player, Search, Drawer } from "./pages";
import { BASE_URL_SLICE } from "./constant";
import Head from "./components/layout/Head";
import Playlist from "./pages/Playlist";

function App() {
  return (
    <BrowserRouter basename={BASE_URL_SLICE}>
      <Head />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/player" element={<Player />} />
          <Route path="/drawer" element={<Drawer />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/music/:id" element={<Music />} />
          <Route path="/album/:id" element={<AlbumIntro />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

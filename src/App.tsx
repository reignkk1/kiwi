import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { Home, Music, Player, Search, Storage } from "./pages";

function App() {
  return (
    <BrowserRouter basename="/comfort">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/player" element={<Player />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/music/:id" element={<Music />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

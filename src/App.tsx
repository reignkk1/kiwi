import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Player from "./pages/Player";
import Layout from "./components/layout";
import Storage from "./pages/Storage";

function App() {
  return (
    <BrowserRouter basename="/comfort">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/player" element={<Player />} />
          <Route path="/storage" element={<Storage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

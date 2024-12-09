import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Player from "./pages/Player";
import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/player" element={<Player />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyles } from "./components/GlobalStyles";
import AudioImpl from "./components/audio/AudioImpl";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <AudioImpl />
    <GlobalStyles />
    <App />
  </>
);

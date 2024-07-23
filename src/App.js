import { createElement } from "./utils.js";
import commentsContainer from "./Comments.js";
import musicScreen from "./Audio.js";
import "./reset.css";
import "./styles.css";

const app = createElement("main", { class: "main-content" });

app.append(musicScreen, commentsContainer);

export default app;

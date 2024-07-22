import { createElement } from "./utils.js";
import commentsContainer from "./Comments.js";
import musicScreen from "./Audio.js";

const app = createElement("main", { class: "main-content" });

app.append(musicScreen, commentsContainer);

export default app;

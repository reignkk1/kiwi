import AudioScreen from './components/AudioScreen.js';
import Comment from './components/comment/index.js';
import Buttons from './components/comment/Buttons.js';
import TextArea from './components/comment/TextArea.js';
import CommentList from './components/comment/CommentList.js';

import './reset.css';
import './comment.css';
import './audioScreen.css';

customElements.define('comment-list', CommentList);
customElements.define('button-container', Buttons);
customElements.define('text-area', TextArea);
customElements.define('audio-screen', AudioScreen);
customElements.define('comment-screen', Comment);

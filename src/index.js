import AudioScreen from './components/audio/index.js';
import Comment from './components/comment/index.js';
import Buttons from './components/comment/Buttons.js';
import TextArea from './components/comment/TextArea.js';
import CommentList from './components/comment/CommentList.js';
import AudioController from './components/audio/AudioController.js';

import './styles/reset.css';
import './styles/comment.css';
import './styles/audioScreen.css';

customElements.define('audio-screen', AudioScreen);
customElements.define('audio-controller', AudioController);

customElements.define('comment-screen', Comment);
customElements.define('text-area', TextArea);
customElements.define('button-container', Buttons);
customElements.define('comment-list', CommentList);

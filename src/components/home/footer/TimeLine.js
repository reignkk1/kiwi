import {inputChangeEvent} from '../events';

class TimeLine extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
            <div class='footer-top'>
                <div class='time-range'>
                    <input class='input-range' type='range' value='0'/>
                </div>
                <div class='time-line'>
                    <span class='current-time'>0:00</span>
                    <span class='end-time'></span>
                </div>
            </div>
        `;
    this.addEvents();
  }
  addEvents() {
    inputChangeEvent();
  }
}
export default TimeLine;

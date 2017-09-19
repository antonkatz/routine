import BellSound from './bell.mp3'

export default class AudioPlayer {
  constructor() {
    let _this = this
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.play === true) {
          _this.play()
        }
      });

    this.audio = new Audio();        // create the audio object
    this.audio.src = BellSound; // assign the audio file to its src
  }

  play() {
    this.audio.play()
  }
}
import AudioPlayer from './AudioPlayer'
import JiraComms from './data/JiraComms'

new AudioPlayer()

// setting host for use after
JiraComms.getHost()

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('index.html'), 'selected': true});
});

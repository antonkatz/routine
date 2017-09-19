import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

chrome.cookies.getAll({url: "https://plentyofthanks.atlassian.net/"}, function(cookies){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log("Cookies sent", cookies)
    chrome.tabs.sendMessage(tabs[0].id, {cookies: cookies});
  });
})

ReactDOM.render(<App />, window.document.getElementById('root'));

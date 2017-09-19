import React from 'react';
import ReactDOM from 'react-dom';
import IssueInsert from './IssueInsert'

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.cookies) {
      JiraComms.setCookies(request.cookies)
    }
  });

window.onload = function() {
  let insertInto = window.document.getElementById("ghx-detail-head")

  if (insertInto) {
    let keyGroup = insertInto.getElementsByClassName("ghx-key-group")[0]
    let app = document.createElement("div")
    keyGroup.appendChild(app)

    ReactDOM.render(<IssueInsert/>, app);
  }

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://plentyofthanks.atlassian.net/rest/api/2/issue/HOME-2/worklog", false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function(value) {
    if (xhr.readyState == 4) {
      console.log("ME Got back", value)
    }
  };
  xhr.send(JSON.stringify( {body: comment} ));
}
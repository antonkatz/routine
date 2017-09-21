import React from 'react';
import ReactDOM from 'react-dom';
import IssueInsert from './IssueInsert'

function onChangeWithWait() {
  window.setTimeout(onChange, 1000)
}

let pomodoroControls = null;

function onChange() {
  let insertInto = window.document.getElementsByTagName("body")[0];
  let hasPomodoroControls = window.document.getElementById("pomodoro-controls");

  console.log("pomodorocontroal", pomodoroControls);
  console.log('has', hasPomodoroControls);
  console.log("inster", insertInto);

  if (!hasPomodoroControls && insertInto) {
    if (!pomodoroControls) {
      pomodoroControls = document.createElement("div");
      pomodoroControls.id = "pomodoro-controls"
    }
    insertInto.insertBefore(pomodoroControls, insertInto.firstChild);
    ReactDOM.render(<IssueInsert/>, pomodoroControls);
  }
}

window.onload = onChange;
window.addEventListener("click", onChangeWithWait);
window.addEventListener("dragend", onChangeWithWait);
// chrome.tabs.onActivated.addListener(() => {alert("activated")})
// window.addEventListener()
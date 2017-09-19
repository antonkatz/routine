import React from 'react';
import ReactDOM from 'react-dom';
import IssueInsert from './IssueInsert'
import JiraComms from "./JiraComms";


window.onload = function() {
  // let insertInto = window.document.getElementById("ghx-detail-head")
  let insertInto = window.document.getElementById("ghx-detail-head")

  if (insertInto) {
    // let keyGroup = insertInto.getElementsByClassName("ghx-key-group")[0]
    let app = document.createElement("div")
    insertInto.insertBefore(app, insertInto.firstChild)

    ReactDOM.render(<IssueInsert/>, app);
  }
}
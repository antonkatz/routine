import URI from 'urijs'

export default class JiraComms {

  static host;

  static getHost() {
    // if (!JiraComms.host) {
    //   let uri = URI(window.location.href)
    //   JiraComms.host = uri.host()
    // }
    // return JiraComms.host
    return "plentyofthanks.atlassian.net"
  }

  static getBaseUrl() {
    return ("https://" + JiraComms.getHost())
  }

  static getIssueKey() {
    let uri = URI(window.location.href);
    let queries = uri.query().split("&").map((q) => {
      let qv = q.split("=");
      return ({name: qv[0], value: qv[1]})
    });
    let issueQuery = queries.find((q) => q.name === "selectedIssue");
    console.log("Current issue " + (issueQuery ? issueQuery.value : "none"));
    return issueQuery ? issueQuery.value : JiraComms.getIssueByBrowseDir()
  }

  static getIssueByBrowseDir() {
    let uri = URI(window.location.href);
    if (uri.directory() === "/browse") {
      return uri.segment()[1]
    } else {
      return null
    }
  }

  static logTime(seconds, issueKey) {
    console.log("Logging seconds", seconds);

    // fixme shift by time into the past

    let xhr = new XMLHttpRequest();
    xhr.open("POST", JiraComms.getBaseUrl() + "/rest/api/2/issue/" + issueKey + "/worklog", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (!JSON.parse(xhr.response).id) {
          alert("failed to log time")
        }
      }
    };
    xhr.send(JSON.stringify({"timeSpentSeconds": seconds}));
  }

  static getWorklogs(from, to, callback) {
    let infoGetter = (ids) => JiraComms.getWorklogsInfo(ids, callback);
    JiraComms.getWorklogIds(from, to, infoGetter)
  }

  static getWorklogsInfo(ids, callback) {
    let uri = URI(JiraComms.getBaseUrl() + "/rest/api/2/worklog/list");

    let xhr = new XMLHttpRequest();
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let info = JSON.parse(xhr.response).map((i) => {
          return {time: i.timeSpentSeconds, issueId: i.issueId}
        });
        callback(info)
      }
    };
    xhr.send(JSON.stringify({ids: ids}));
  }

  static getWorklogIds(from, to, callback) {
    let uri = URI(JiraComms.getBaseUrl() + "/rest/api/2/worklog/updated");
    uri = uri.query({since: from, expand: "timeSpentSeconds,issueId"});
    let xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let ids = JSON.parse(xhr.response).values.filter((l) => {
          return l.updatedTime <= to
        }).map((l) => {
          return l.worklogId
        });
        callback(ids)
      }
    };
    xhr.send();
  }

  static getIssueInfo(id, callback) {
    let uri = URI(JiraComms.getBaseUrl() + "/rest/api/2/issue/" + id);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(JSON.parse(xhr.response))
      }
    };
    xhr.send();
  }

  static getEpics(callback) {
    let uri = JiraComms.getBaseUrl() + "/rest/api/2/search?jql=issuetype=Epic"
    // let uri = JiraComms.getBaseUrl() + "/rest/api/2/search"

    fetch(uri, {
      method: "GET",
      credentials: "same-origin",
      // body: {"jql": "issuetype=Epic"}
    }).then((resp) => {
      resp.json().then((data) => callback(data.issues))
    })
  }
}

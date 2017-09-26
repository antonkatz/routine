import JiraComms from "./JiraComms";

export default class Data {
  static epics;

  static load() {
    let epicParsingCallback = (es) => {
      Data.epics = Data.epicsParser(es)
      console.log(Data.epics)
    }
    JiraComms.getEpics(epicParsingCallback)
  }

  static epicsParser(epics) {
    let singleEpicParser = (e) => {
      let p = Data.singleIssueParser(e)
      return p
    }

    return epics.map(singleEpicParser)
  }

  static singleIssueParser(i) {
    let f = i.fields
    console.log("single issue parser", f.customfield_10008)
    return {
      id: i.id, key: i.key, type: f.issuetype.name, projectName: f.project.name,
      summary: f.summary, epicKey: f.customfield_10008}
  }
}

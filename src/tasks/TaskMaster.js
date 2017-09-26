import React, {Component} from 'react';
import JiraComms from '../data/JiraComms'
import Data from "../data/Data";
import TaskDisplay from "./TaskDisplay";
import TimeLine from "./TimeLine"

export default class TaskMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: {},
      tasks: []
    };
    this.setLogs = this.setLogs.bind(this);

    this.bootstrapLoad()
  }

  bootstrapLoad(props) {
    let from = props ? props.date.valueOf() : this.props.date.valueOf();
    let to = from + 24 * 60 * 60 * 1000;
    JiraComms.getWorklogs(from, to, this.setLogs)
  }

  setLogs(logs) {
    let reduced = this.reduceLogs(logs);
    this.setState({logs: reduced});
    this.loadTasks()
  }

  reduceLogs(logs) {
    let reduced = {};
    logs.forEach((l) => {
      let existing = reduced[l.issueId];
      let time = existing ? existing : 0;
      reduced[l.issueId] = time + l.time
    });
    return reduced
  }

  loadTasks() {
    let tasks = []
    let logKeys = Object.keys(this.state.logs)

    logKeys.forEach((logId) => {
      JiraComms.getIssueInfo(logId, (info) => {
        tasks.push(Data.singleIssueParser(info));
        console.log("setting task", logId, logKeys, logKeys.length)
        if (tasks.length === logKeys.length) {
          console.log("pushing all ")
          this.setState({tasks: tasks})
        }
      })
    })
  }

  /** creates a nested object. first level keys are project names. second level keys are epic keys. the leaf values
   *  are issues*/
  groupedTasks(issues, packers = this.groupingFunctions()) {
    let packer = packers[0]
    let remainingPackers = [...packers].splice(0, 1)

    let tasksWithKeys = issues.map((t) => {
      return Object.assign({}, t, {group: gf.groupKeyFunc(t)})
    })
    console.log(tasksWithKeys)
    let groupKeys = new Set(tasksWithKeys.map((t) => (t.group)))
    console.log(groupKeys)

    let grouped = {}
    groupKeys.forEach((g) => {
      let filtered = tasksWithKeys.filter((t) => (t.group === g))
      grouped[g] = {
        title: gf.title + " " + gf.nameFunc(g),
        children: this.groupedTasks(filtered, remainingPackers)
      }
    })
    console.log(grouped)
    return grouped
  }

  componentWillReceiveProps(nextProps) {
    this.bootstrapLoad(nextProps)
  }

  render() {
    return (
      <div>
        <TaskDisplay logs={this.state.logs} tasks={this.state.tasks}/>
        <TimeLine logs={this.state.logs}/>
      </div>
    )
    // return (<span>Nothing for now</span>)
  }
}
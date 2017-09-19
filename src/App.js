import React, {Component} from 'react';
import './App.css';
import DatePicker from 'material-ui/DatePicker';
import JiraComms from './JiraComms'
import {GridList, GridTile} from 'material-ui/GridList';
import Utils from "./utils"

class App extends Component {
  constructor() {
    super()
    this.state = {
      forDate: new Date().setHours(0,0,0,0)
    }

    this.onDateChange = this.onDateChange.bind(this)
  }

  onDateChange(date) {
    date.setHours(0,0,0,0)
    this.setState({forDate: date})
  }

  render() {
    return (
      <div>
        <DatePicker hintText="Pick date" defaultDate={new Date()} onChange={(discard, date) => this.onDateChange(date)}
                    autoOk={true}/>
        <TaskList date={this.state.forDate}/>
      </div>
    );
  }
}

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: []
    }
    this.setLogs = this.setLogs.bind(this)

    this.getTasks()
  }

  getTasks(props) {
    let from = props ? props.date.valueOf() : this.props.date.valueOf()
    let to = from + 24 * 60 * 60 * 1000
    JiraComms.getWorklogs(from, to, this.setLogs)
  }

  setLogs(logs) {
    let reduced = this.reduceLogs(logs)
    this.setState({logs: reduced})
    this.mapIssueNames()
  }

  mapIssueNames() {
    let logs = []
    this.state.logs.forEach((l) => {
      JiraComms.getIssueInfo(l.id, (info) => {
        logs.push(Object.assign({}, l, {name: info.fields.summary}))
        this.setState({logs: logs})
      })
    })
  }

  reduceLogs(logs) {
    let reduced = []
    logs.forEach((l) => {
      let existing = reduced.find((o) => (o.id === l.issueId))
      if (existing) {
        existing.time = existing.time + l.time
      } else {
        reduced.push({id: l.issueId, time: l.time})
      }
    })
    return reduced
  }

  componentWillReceiveProps(nextProps) {
    this.getTasks(nextProps)
  }

  render() {
    return (<TaskListDisplay logs={this.state.logs}></TaskListDisplay>)
  }
}

let TaskListDisplay = (props) => {
  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    list: {
      display: 'flex',
      justifyContent: 'space-around'
    },
    tile: {
    }
  };

  return (
    <div style={styles.root}>
      <GridList
        style={styles.list}
      >
        {props.logs.map((l) => {
          return (<GridTile key={l.id} style={styles.tile}>
            <p>{l.name ? l.name : "loading..."}</p>
            <p>{Utils.secondsToHuman(l.time, false)}</p>
          </GridTile>)
        })}
      </GridList>
    </div>)
}

export default App;

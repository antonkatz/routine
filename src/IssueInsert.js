import React, {Component} from 'react';
import JiraComms from './JiraComms'

class IssueInsert extends Component {
  constructor() {
    super()
    this.jira = new JiraComms()

    this.pomodoroDuration = 60 * 15
    this.breakDuration = 60 * 2

    this.state = {
      pomodoroTime: 0,
      breakTime: 0,
      counter: null,
      inPomodoro: true
    }
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
  }

  count() {
    if (this.state.inPomodoro) {
      if (this.state.pomodoroTime >= this.pomodoroDuration) {
        this.setState({
          inPomodoro: false
        })
        this.log()
      }
      this.setState({
        pomodoroTime: this.state.pomodoroTime + 1
      })
    } else {
      if (this.state.breakTime >= this.breakDuration) {
        this.setState({
          inPomodoro: true
        })
      }
      this.setState({
        breakTime: this.state.breakTime + 1
      })
    }
  }

  log() {
    this.jira.logTime()
  }

  resetTime() {
    this.setState({
      pomodoroTime: 0,
      breakTime: 0
    })
  }

  start() {
    let f = this.count.bind(this)
    let counter = window.setInterval(f, 1000)
    this.setState({
      counter: counter
    })
  }

  stop() {
    let c = this.state.counter
    if (c) {
      window.clearInterval(c)
    }
    this.log()
    this.resetTime()
    this.setState({
      inPomodoro: true
    })
  }

  pause() {

  }

  render() {
    return (
      <div>
        <p>
          <a onClick={this.start}>Start</a>
          <a onClick={this.stop}>Stop</a>
        </p>
        <Timer ptime={this.state.pomodoroTime} btime={this.state.breakTime} inpom={this.state.inPomodoro}/>
      </div>
    );
  }
}

class Timer extends Component {
  display(seconds) {
    let min = Math.floor(seconds / 60).toFixed(0)
    let s = seconds % 60
    return min + "m " + s + "s"
  }

  render() {
    let label = this.props.inpom ? "Pomodoro" : "Break"
    let time = this.props.inpom ? this.props.ptime : this.props.btime
    return (<p>{label} {this.display(time)} </p>)
  }
}

export default IssueInsert;

import React, {Component} from 'react';
import JiraComms from './JiraComms'
import Utils from './utils'


class IssueInsert extends Component {
  constructor() {
    super();

    this.pomodoroDuration = 60 * 15;
    this.shortBreakDuration = 60 * 2;
    this.longBreakDuration = 60 * 2;
    this.breaksBeforeLong = 6;

    this.state = {
      pomodoroTime: 0,
      breakTime: 0,
      breaksCount: 0,
      breakDuration: this.shortBreakDuration,
      counter: null,
      inPomodoro: true
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this)
  }

  // getFromStorage()

  /** @return duration of break */
  breakPomodoro() {
    this.setState({breaksCount: this.state.breaksCount + 1, inPomodoro: false});
    if (this.state.breaksCount >= this.breaksBeforeLong) {
      this.setState({breaksCount: 0});
      this.setState({breakDuration: this.longBreakDuration})
    } else {
      this.setState({breakDuration: this.shortBreakDuration})
    }

    this.playSound();
    this.log()
  }

  count() {
    console.log("tick");
    if (this.state.inPomodoro) {
      if (this.state.pomodoroTime >= this.pomodoroDuration) {
        this.breakPomodoro()
      }
      this.setState({
        pomodoroTime: this.state.pomodoroTime + 1
      })
    } else {
      if (this.state.breakTime >= this.state.breakDuration) {
        this.playSound();
        this.stop()
      }
      this.setState({
        breakTime: this.state.breakTime + 1
      })
    }
  }

  log() {
    if (this.state.pomodoroTime >= 60) {
      JiraComms.logTime(this.state.pomodoroTime)
    }
    this.setState({pomodoroTime: 0})
  }

  resetTime() {
    this.setState({
      pomodoroTime: 0,
      breakTime: 0
    });
    this.setState({
      inPomodoro: true
    })
  }

  playSound() {
    console.log("playing sound");
    chrome.runtime.sendMessage({play: true});
  }

  start() {
    this.log();
    this.resetTime();

    let f = this.count.bind(this);
    if (!this.state.counter) {
      let counter = window.setInterval(f, 1000);
      this.setState({
        counter: counter
      })
    }
  }

  stop() {
    let c = this.state.counter;
    if (c) {
      window.clearInterval(c);
      this.setState({counter: null})
    }
    this.log();
    this.resetTime()
  }

  render() {
    return (
      <div style={{backgroundColor: 'green'}}>
        <p>
          <a onClick={this.start}>Start</a>
          <a onClick={this.stop}>Stop</a>
        </p>
        <TimerDisplay ptime={this.state.pomodoroTime} btime={this.state.breakTime} inpom={this.state.inPomodoro}/>
      </div>
    );
  }
}

class TimerDisplay extends Component {
  render() {
    let label = this.props.inpom ? "Pomodoro" : "Break";
    let time = this.props.inpom ? this.props.ptime : this.props.btime;
    return (<p>{label} {Utils.secondsToHuman(time)} </p>)
  }
}

export default IssueInsert;

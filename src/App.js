import React, {Component} from 'react';
import './styles/App.css';
import DatePicker from 'material-ui/DatePicker';
import TaskMaster from "./tasks/TaskMaster"

class App extends Component {
  constructor() {
    super();
    this.state = {
      forDate: new Date().setHours(0, 0, 0, 0)
    };

    this.onDateChange = this.onDateChange.bind(this)
  }

  onDateChange(date) {
    date.setHours(0, 0, 0, 0);
    this.setState({forDate: date})
  }

  render() {
    return (
      <div>
        <DatePicker hintText="Pick date" defaultDate={new Date()} onChange={(discard, date) => this.onDateChange(date)}
                    autoOk={true}/>
        <TaskMaster date={this.state.forDate}/>
      </div>
    );
  }
}

export default App;

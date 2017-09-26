import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Data from './data/Data'

// needs to go first to load epics before the main program runs
Data.load()

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>, window.document.getElementById('root'));


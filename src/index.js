import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Data from './data/Data'
ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>, window.document.getElementById('root'));

Data.load()
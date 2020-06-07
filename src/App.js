import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/core';
import validate from 'validate.js';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import firebase  from 'firebase/app'
import 'firebase/messaging'
import { useDispatch } from 'react-redux';
import { SET_LOADING, UNSET_LOADING } from 'app/Garage/ui/uiSlice';
const browserHistory = createBrowserHistory();
const messaging  = firebase.messaging();
validate.validators = {
  ...validate.validators,
  ...validators
};
function App() {
  const dispatch  = useDispatch();
 
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;

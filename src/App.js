import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider  } from '@material-ui/core';
import validate from 'validate.js';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import {connect} from 'react-redux'
import { getStore } from 'async/store/store';

const browserHistory = createBrowserHistory();

validate.validators = {
  ...validate.validators,
  ...validators
};

const mapToProps = (state)=>{
  return {
    storeId:state.user.uid
  }
}

const mapToDispatch = dispatch=>{
  return {
    loadInfo:(storeId)=>{
      dispatch(getStore(storeId))
    }
  }
}

class App extends Component {
  componentDidMount(){
   
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes/>
        </Router>
      </ThemeProvider>
    );
  }
}


export default App  = connect(mapToProps,mapToDispatch)(App);

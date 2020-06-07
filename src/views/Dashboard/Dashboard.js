import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import {
  Budget,
    TasksProgress,
  LatestOrders
} from './components';
import { getServices, getStore, setToken } from 'async/store/store';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectUid, selectToken } from 'app/Garage/user/userSlice';

import firebase from 'firebase/app'
import 'firebase/messaging'
import { setNotifications } from 'app/Garage/notifications/notificationSlice';
import { SET_LOADING,UNSET_LOADING } from 'app/Garage/ui/uiSlice';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = useSelector(selectUid);
  const messaging  = firebase.messaging();

  useEffect(()=>{
    dispatch(getServices(id))
    dispatch(getStore(id))
    messaging.requestPermission().then(()=>{
      return messaging.getToken()
    }).then(token=>{
      if(typeof token!=='undefined'){
        console.log(id,token);
        dispatch(setToken(id,token));
      }
    }).catch((err)=>{
      console.log(err);
    })
    // fetcheNotifications(id);
  },[])
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment'
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Typography,
  Card,
  makeStyles,
  Popover,
  Avatar,
  Grid,
  CardContent,
  Menu,
  MenuItem
} from '@material-ui/core';
import { useSelector ,useDispatch} from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { selectNotications, addNotification, clearNotifications, setNotifications } from 'app/Garage/notifications/notificationSlice';
import PersonIcon from '@material-ui/icons/Person';
import { logoutUser } from 'async/user/user';
import { logout, selectUid } from 'app/Garage/user/userSlice';
import  firebase from 'firebase/app'
import 'firebase/messaging';
import { SET_LOADING,UNSET_LOADING,selectLoading, resetUI } from 'app/Garage/ui/uiSlice';
import { resetHistory } from 'app/Garage/history/historySlice';
import { resetStore } from 'app/Garage/store/storeSlice';
import { resetOrders } from 'app/Garage/orders/orders';
import { resetServices } from 'app/Garage/services/services';
const messaging = firebase.messaging();
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorUserEl, setUserAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotications);
  const count = notifications.length;
  const history = useHistory();
  messaging.onMessage((payload)=>{
    console.log(payload);
  })

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleUserClick = event => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserAnchorEl(null);
  };

  const handleSignOut = (event)=>{
    handleUserClose(event);
    dispatch(logout());
    dispatch(logoutUser());
    dispatch(resetHistory());
    dispatch(clearNotifications());
    dispatch(resetOrders());
    dispatch(resetServices());
    dispatch(resetUI())
    dispatch(resetStore());
  }
  const storeId = useSelector(selectUid);
  useEffect(()=>{
    dispatch(clearNotifications());
    const query = firebase.firestore().collection('notifications').orderBy('placedAt','desc');
    query.onSnapshot((notifys)=>{
      const snaps = notifys.docs.filter(notify=>storeId.localeCompare(notify.data().storeId)===0);
      const _notifications = snaps.map((notify)=>({
        id:notify.id,
        msg:notify.data().msg.data.msg,
        placedAt:notify.data().placedAt
      }))
      dispatch(setNotifications(_notifications));
    })
  },[])
  const handleProfile=()=>{
    handleUserClose();
    history.push('/profile')
  }
  const handleAccount = ()=>{
    handleUserClose();
    history.push('/account')
  }
  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <Typography style={{ color: 'white' }} variant="h4">
            Home
          </Typography> 
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden>
          <IconButton color="inherit" onClick={handleClick}>
            <Badge
              badgeContent={count}
              color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}>
            <Notification notifications={notifications}/>
          </Popover>
          <IconButton color="inherit" onClick={handleUserClick}>
            <PersonIcon/>
          </IconButton>
          <Menu
              id="simple-menu-account"
              anchorEl={anchorUserEl}
              keepMounted
              open={Boolean(anchorUserEl)}
              onClose={handleUserClose}>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleAccount}>My account</MenuItem>
              <MenuItem onClick={()=>handleSignOut()}>Logout</MenuItem>
            </Menu>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;

const Notification = ({notifications}) => {
  const loading = useSelector(selectLoading);
  return (
    <div>
      <Card style={{ padding: 0, minWidth: 500 }}>
        <div style={{ backgroundColor: '#FF6060' }}>
          <Typography
            variant="h4"
            style={{
              color: '#EEEEEE',
              marginLeft: 16,
              paddingTop: 8,
              paddingBottom: 4
            }}>
            Notifications
          </Typography>
        </div>
        {
         (!loading)?notifications.map((notify)=>(
            <CardContent key={notify.id}>
              <Grid container direction="row">
                <Grid item style={{ marginRight: 8 }}>
                  <Avatar>A</Avatar>
                </Grid>
                <Grid item>
                  <Typography component="div" variant="h6">
                    {notify.msg}
                  </Typography>
                  <Typography component="p" variant="caption">
                  {moment(new Date(notify.placedAt.seconds * 1000), 'ss').fromNow()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          ))
        :null}
      </Card>
    </div>
  );
};

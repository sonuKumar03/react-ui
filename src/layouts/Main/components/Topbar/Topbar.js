import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Typography,
  Card,makeStyles, Popover, Avatar, Grid } from '@material-ui/core';
import {useSelector}  from  'react-redux'

import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import InputIcon from '@material-ui/icons/Input';
import { selectNotications } from 'app/Garage/notifications/notificationSlice';
import CheckIcon  from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'

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
  const [notifications] = useState(useSelector(selectNotications));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
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
              badgeContent={notifications.length}
              color="primary"
              variant="dot">
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
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
             <Notification/>
            </Popover>
          <IconButton className={classes.signOutButton} color="inherit">
            <InputIcon />
          </IconButton>
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
const Notification = ()=>{
  return (
    <div  style={{}}>
    <Card style={{padding:8}}spacing={2}>
      <Grid container direction="row">
        <Grid item style={{marginRight:8}}>
        <Avatar>
          A
        </Avatar>
          </Grid>
          <Grid item>
            <Typography component='div' variant="h6">sonu needs car serivce
            <IconButton size="small">
              <CheckIcon/>
            </IconButton>
            <IconButton size="small">
              <ClearIcon/>
            </IconButton>
            </Typography>
             <Typography component='p' variant='caption'>12 min ago</Typography>
          </Grid>
      </Grid>
    </Card>

    <Card style={{padding:8}}spacing={2}>
    <Grid container direction="row">
        <Grid item style={{marginRight:8}}>
        <Avatar>
          A
        </Avatar>
          </Grid>
          <Grid item>
            <Typography component='div' variant="h6">sonu needs car serivce
            <IconButton size="small">
              <CheckIcon/>
            </IconButton>
            <IconButton size="small">
              <ClearIcon/>
            </IconButton>
            </Typography>
             <Typography component='p' variant='caption'>12 min ago</Typography>
          </Grid>
      </Grid>
    </Card>


    </div>
  )
}

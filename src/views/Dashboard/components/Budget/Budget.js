import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import { useState } from 'react';
import 'config'
import firebase from 'firebase/app'
import {useSelector} from 'react-redux'
import { selectUid } from 'app/Garage/user/userSlice';
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));
const Budget = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const storeId = useSelector(selectUid);
  const [pending,setPending] = useState(0);

  useEffect(()=>{
    const query = firebase.firestore().collection('orders').where('storeId','==',storeId);
    query.onSnapshot((snaps)=>{
      const _orders = snaps.docs.map((order)=>order.data());
      let i = 0;
      _orders.forEach(order=>{
        if(order.status.localeCompare('serviced')===0 || order.status.localeCompare('rejected')===0){
          i++;
        }
      });
      setPending(_orders.length-i);
    });
  },[])

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              PENDING ORDERS
            </Typography>
  <Typography variant="h4">{pending}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;

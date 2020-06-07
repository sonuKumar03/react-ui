import React, { useEffect ,useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { useSelector } from 'react-redux';
import { selectUid } from 'app/Garage/user/userSlice';
import 'config'
import firebase from 'firebase/app'
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const TasksProgress = props => {
  const { className, ...rest } = props;
  const [orders,setOrders] = useState([]);
  const [serviced,setServiced]=useState(0);
  const classes = useStyles();
  const storeId = useSelector(selectUid);

  const total = orders.length;

  const completed = serviced*100/total;

  useEffect(()=>{
    const query = firebase.firestore().collection('orders').where('storeId','==',storeId);
    query.onSnapshot((snaps)=>{
      const _orders = snaps.docs.map((order)=>order.data());
      setOrders(_orders);
      let i = 0;
      _orders.forEach(order=>{
        if(order.status.localeCompare('serviced')===0 || order.status.localeCompare('rejected') ===0){
          i++;
        }
      });
      setServiced(_orders.length-i);
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
              ORDER PROGRESS
            </Typography>
  <Typography variant="h4">{`${Math.floor(completed)} %`}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <LinearProgress
          className={classes.progress}
          value={Math.floor(completed)}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;

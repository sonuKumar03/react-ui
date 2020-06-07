import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { selectUid } from 'app/Garage/user/userSlice';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import 'config';
import firebase from 'firebase/app';
import moment from 'moment';
import { Collapse, Typography, Box, IconButton } from '@material-ui/core';
import UpArrow from '@material-ui/icons/KeyboardArrowUp';
import DownArrow from '@material-ui/icons/KeyboardArrowDown';
import { setOrders as setOrdersToRedux } from 'app/Garage/orders/orders';




export default function LatestOrders() {
  const [orders, setOrders] = useState([]);
  const [shouldLoad, setLoad] = useState(false);
  const storeId = useSelector(selectUid);
  useEffect(() => {
    setLoad(false);
    const query = firebase
      .firestore()
      .collection('orders')
      .orderBy('placeAt',"desc")

    query.onSnapshot(snaps => {
      console.log(snaps.docs.map(order=>order.data()));
      const fetchedOrders = snaps.docs.filter(order =>storeId.localeCompare(order.data().storeId)===0);
      setOrders(fetchedOrders.map(order=>({orderId:order.id,...order.data()})));
      setLoad(true);
    });
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" style={{minWidth:700}}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order Id</TableCell>
            <TableCell align="right">User Id</TableCell>
            <TableCell align="right">placed At</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => (
            <Row
              key={order.orderId}
              order={order}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
});

function Row(props) {
  const { order } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [anchorEl, setAchorE1] = useState(false);

  const handleClick = event => {
    console.log(event.currentTarget);
    setAchorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAchorE1(null);
  };
  const _open = Boolean(anchorEl);
  const id = _open ? 'simple-popover' : undefined;

  console.log(id,_open);
  
  const db = firebase.firestore();

  const handleOrderAction = async (orderId, action) => {
    console.log(orderId, action);
    await db.doc(`orders/${orderId}`).update({ status: action });
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <UpArrow /> : <DownArrow />}
          </IconButton>
        </TableCell>
        <TableCell>{order.orderId}</TableCell>
        <TableCell align="right">{order.userId}</TableCell>
        <TableCell align="right">
          {moment(new Date(order.placeAt.seconds * 1000), 'ss').fromNow()}
        </TableCell>
        <TableCell align="right">{order.status}</TableCell>
        <TableCell align="right">
          <Button variant="contained" color="secondary" onClick={handleClick} disabled={order.status.localeCompare('serviced') ===0 || order.status.localeCompare('rejected') ===0}>
            Action
          </Button>
          <Popover
            id={id}
            open={_open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center'
            }}>
            <Paper className={classes.paper}>
              <MenuList>
                <MenuItem
                  disabled={order.status.localeCompare('serviced') ===0 || order.status.localeCompare('rejected')===0}
                  onClick={e => {
                    handleOrderAction(order.orderId, 'opened');
                    handleClose(e);
                  }}>
                  opened
                </MenuItem>
                <MenuItem
                  disabled={order.status.localeCompare('serviced') === 0||order.status.localeCompare('rejected') ===0}
                  onClick={e => {
                    handleOrderAction(order.orderId, 'accepted');
                    handleClose(e);
                  }}>
                  Accepted
                </MenuItem>
                <MenuItem
                  disabled={order.status.localeCompare('serviced') === 0||order.status.localeCompare('rejected') ===0}
                  onClick={e => {
                    handleOrderAction(order.orderId, 'rejected');
                    handleClose(e);
                  }}>
                  Rejected
                </MenuItem>
                <MenuItem
                  disabled={order.status.localeCompare('serviced') === 0|| order.status.localeCompare('rejected') ===0}
                  onClick={e => {
                    handleOrderAction(order.orderId, 'serviced');
                    handleClose(e);
                  }}>
                  Serviced
                </MenuItem>
              </MenuList>
            </Paper>
          </Popover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Descriptions
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">service</TableCell>
                    <TableCell align="right">count</TableCell>
                    <TableCell align="right">type</TableCell>
                    <TableCell align="right">price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.services.map((service, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {service.service.name}
                      </TableCell>
                      <TableCell align="right">{service.count}</TableCell>
                      <TableCell align="right">
                        {service.service.type}
                      </TableCell>
                      <TableCell align="right">
                        {service.count * service.service.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// const useStyles = makeStyles(theme => ({
//   table: {
//     minWidth: 650
//   },
//   typography: {
//     padding: theme.spacing(2)
//   }
// }));

// export default function SimpleTable() {
//   const classes = useStyles();
//   const [anchorEl, setAchorE1] = useState(false);
//   const storeId = useSelector(selectUid);
//   const [orders, setOrders] = useState();
//   const [shouldLoad, setLoad] = useState(false);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     setLoad(false);
//     firebase
//       .firestore()
//       .collection('orders')
//       .onSnapshot(
//         snaps => {
//           let lists = snaps.docs.filter(
//             order => storeId.localeCompare(order.data().storeId) === 0
//           );
//           let _orders = lists.map(order => ({
//             orderId: order.id,
//             ...order.data()
//           }));

//           setOrders(_orders);
//           // console.log(_orders);
//           setLoad(true);
//           dispatch(setOrdersToRedux(_orders));
//         },
//         err => {
//           console.log(err);
//         }
//       );
//   }, []);
//   const handleClick = event => {
//     setAchorE1(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAchorE1(null);
//   };
//   const db = firebase.firestore();
//   const handleOrderAction = async (orderId, action) => {
//     console.log(orderId, action);
//     await db.doc(`orders/${orderId}`).update({ status: action });
//   };
//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;
//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Order Ref</TableCell>
//             <TableCell>User</TableCell>
//             <TableCell>Request At</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {shouldLoad
//             ? orders.map(order => (
//                 <React.Fragment key={order.orderId}>
//                   <TableRow>
//                     <TableCell component="th" scope="row">
//                       {order.orderId}
//                     </TableCell>
//                     <TableCell>{order.userId}</TableCell>
//                     <TableCell>
//                       {moment(
//                         new Date(order.placeAt.seconds * 1000),
//                         'ss'
//                       ).fromNow()}
//                     </TableCell>
//                     <TableCell>{order.status}</TableCell>
//                     <TableCell align="right">
//                       <div>
//                         <Button onClick={handleClick}>Action</Button>
//                         <Popover
//                           id={id}
//                           open={open}
//                           anchorEl={anchorEl}
//                           onClose={handleClose}
//                           anchorOrigin={{
//                             vertical: 'center',
//                             horizontal: 'center'
//                           }}
//                           transformOrigin={{
//                             vertical: 'center',
//                             horizontal: 'center'
//                           }}>
//                           <Paper className={classes.paper}>
//                             <MenuList>
//                               <MenuItem
//                                 disabled={
//                                   order.status.localeCompare('serviced') === 0
//                                 }
//                                 onClick={e => {
//                                   handleOrderAction(order.orderId, 'opened');
//                                   handleClose(e);
//                                 }}>
//                                 opened
//                               </MenuItem>
//                               <MenuItem
//                                 disabled={
//                                   order.status.localeCompare('serviced') === 0
//                                 }
//                                 onClick={e => {
//                                   handleOrderAction(order.orderId, 'rejected');
//                                   handleClose(e);
//                                 }}>
//                                 Rejected
//                               </MenuItem>
//                               <MenuItem
//                                 disabled={
//                                   order.status.localeCompare('serviced') === 0
//                                 }
//                                 onClick={e => {
//                                   handleOrderAction(order.orderId, 'serviced');
//                                   handleClose(e);
//                                 }}>
//                                 Serviced
//                               </MenuItem>
//                             </MenuList>
//                           </Paper>
//                         </Popover>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                   </React.Fragment>
//               ))
//             : null}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

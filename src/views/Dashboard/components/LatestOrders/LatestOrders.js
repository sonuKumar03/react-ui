import React, { useState,useEffect } from 'react';
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
import 'config'
import firebase from 'firebase/app'
import 'firebase/functions'
import { selectUid } from 'app/Garage/user/userSlice';
import {useSelector} from 'react-redux'
const functions = firebase.functions();

const useStyles = makeStyles(theme=>({
  table: {
    minWidth: 650
  },
  typography:{
      padding:theme.spacing(2)
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

export default function SimpleTable() {
  const classes = useStyles();
  const [anchorEl, setAchorE1] = useState(false);
  const storeId = useSelector(selectUid);

  const getOrders = functions.httpsCallable('store_getOrders');
  useEffect(()=>{
    console.log(storeId);
      getOrders(storeId).then(response=>{
        let orders = response.data;
        console.log(orders);
      })
  },[])

  const handleClick = event => {
    setAchorE1(event.currentTarget);
  };
  const handleClose = () => {
    setAchorE1(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Ref</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Vehicle No</TableCell>
            <TableCell align="right">Request At</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">
                <div>
                  <Button onClick={handleClick}>Action</Button>
                  <Popover
                    id={id}
                    open={open}
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
             <MenuItem  onClick={handleClose}>Pending</MenuItem>
             <MenuItem onClick={handleClose} >Confirmed</MenuItem>
             <MenuItem onClick={handleClose} >Serviced</MenuItem>
           </MenuList>
         </Paper>
                  </Popover>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

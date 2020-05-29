import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectShedules } from 'app/Garage/store/storeSlice';
import { getStore } from 'async/store/store';
import 'config';
import firebase from 'firebase/app';
import { Chip, IconButton,Tooltip } from '@material-ui/core';
import {DeleteRounded} from '@material-ui/icons'
const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  typography: {
    padding: theme.spacing(2)
  }
}));

function createData(day, from, to, open) {
  return { day, from, to, open };
}

export default function SimpleTable() {
  const classes = useStyles();
  let shedules = useSelector(selectShedules);
  let storeId = useSelector(state => state.user.uid);
  if (typeof shedules === 'undefined') {
    shedules = [];
  }
  const rows = shedules.map(shedule =>
    createData(shedule.day, shedule.from, shedule.to, shedule.open)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStore(storeId));
  }, [dispatch, storeId]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell align="right">from</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">open/close</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.day}
              </TableCell>
              <TableCell align="right">{row.from}</TableCell>
              <TableCell align="right">{row.to}</TableCell>
              <TableCell align="right">
                <OPEN_CLOSE_BUTTON row={row} shedules={shedules} />
              </TableCell>
              <TableCell align="right">
                <div>
                  <DELETE_BUTTON row={row}  shedules={shedules}/>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const OPEN_CLOSE_BUTTON = props => {
  const storeId = useSelector(state => state.user.uid);
  const open = props.row.open;
  return (
    <Button
      onClick={async () => {
        const { row, shedules } = props;
        console.log(row, shedules);
        let new_shedules = shedules.map(shedule =>
          shedule.day.localeCompare(row.day) === 0
            ? Object.assign({}, shedule, { open: !open })
            : shedule
        );
        await firebase
          .firestore()
          .doc(`stores/${storeId}`)
          .update({ shedules: new_shedules });
      }}>
      <Chip
        label={open ? 'open' : 'closed'}
        color={open ? 'primary' : ''}></Chip>
    </Button>
  );
};

const DELETE_BUTTON = (props) => {
  const storeId = useSelector(state=>state.user.uid);
  const handleDelete=async ()=>{
      const {row,shedules}=props;
      const new_shedules  = shedules.filter((shedule=>(shedule.day.localeCompare(row.day)!==0)))
      await firebase.firestore().doc(`stores/${storeId}`).update({shedules:new_shedules});
  }
  return (
  <Tooltip title='delete row'> 
  <IconButton onClick={handleDelete}>
    <DeleteRounded />
  </IconButton>
  </Tooltip>

  )
};

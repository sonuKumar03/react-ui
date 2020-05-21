import React, { useState } from 'react';
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
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme=>({
  table: {
    minWidth: 650
  },
  typography:{
      padding:theme.spacing(2)
  }
}));

function createData(day, from, to, open) {
  return { day, from, to, open };
}

const rows = [
  createData('monday','08:40','23:23',false),
  createData('tuessday','08:40','23:23',true),
  createData('friday', '08:40','23:23',false),
  createData('wedneday', '08:40','23:23',true),
  createData('thursday', '08:40','23:23',false)
];

export default function SimpleTable() {
  const classes = useStyles();
  const [anchorEl, setAchorE1] = useState(false);

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
            <TableCell>Day</TableCell>
            <TableCell align="right">from</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">open/close</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row ,i)=> (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.day}
              </TableCell>
              <TableCell align="right">{row.from}</TableCell>
              <TableCell align="right">{row.to}</TableCell>
              <TableCell align="right">{(row.open)?"OPEN":"CLOSE"}</TableCell>
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

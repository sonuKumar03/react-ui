import React, { useState ,useEffect} from 'react';
import {useDispatch,useSelector} from  'react-redux'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles,Card,CardHeader,CardContent,CardActions,Divider,Grid,Button,TextField} from '@material-ui/core';
import { addServices } from 'async/store/store';
import { selectUid } from 'app/Garage/user/userSlice';

const useStyles = makeStyles(() => ({
  root: {}
}));
const AddService = props => {
  const { className, setShow,show,...rest } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    name:'car wash',
    price:120,
    capacity:10,
    type:'two wheeler'
  });
const dispatch = useDispatch();
const storeId = useSelector(selectUid);  
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const  onSubmit = ()=>{
    console.log(values);
    setShow(!show);
    dispatch(addServices({storeId,service:values}));
  }
  const states = [
    {
      value: 'two wheeler',
      label: 'Two Wheeler'
    },
    {
      value: 'four wheeler',
      label: 'Four Wheeler'
    }
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate onSubmit={onSubmit}>
        <CardHeader subheader="add services to the store" title="Services" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="write the name  of the service"
                label="service name"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="price"
                margin="dense"
                name="price"
                onChange={handleChange}
                required
                value={values.price}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Type"
                margin="dense"
                name="type"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.type}
                variant="outlined">
                {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="service capacity"
                margin="dense"
                name="capacity"
                onChange={handleChange}
                required
                value={values.capacity}
                variant="outlined">
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" onClick={onSubmit}>
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AddService.propTypes = {
  className: PropTypes.string
};

export default AddService;

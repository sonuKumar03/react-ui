import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Button,
  IconButton,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Icon
} from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectService,setService } from 'app/Garage/services/services';
import { AddService } from 'views';
import { selectUid } from 'app/Garage/user/userSlice';
import {  alloteService, releaseService } from 'async/store/store';
import  firebase from 'firebase/app'
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
  field: {
    margin: 8
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
const Services = () => {
  const [services, setServices] = useState(useSelector(selectService));
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const storeId = useSelector(selectUid);
  const data = useSelector(selectService);
  // useEffect(() => {
  //   setServices(data);
  // }, [data]);
  // useEffect(() => {
  //   let callbakc = f=>f;

  // }, []);
  const db = firebase.firestore();
  const [loading,setLoading] = useState(false);
  useEffect( ()=>{
    let cb = f=>f
    setLoading(true);
    try{
      cb =  db.collection(`stores/${storeId}/services`).onSnapshot((snaps)=>{
          let services = [];
          services = snaps.docs.map(doc=>({serviceId:doc.id,...doc.data()}));
          dispatch(setService(services));
          setLoading(false);
      })
    }catch(err){
      console.log(err);
    }
    return cb;
  },[])
  useEffect(()=>{
    setServices(data);
  },[data])
  return (
    <div style={{ padding: 32 }}>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginBottom: 8 }}
        onClick={() => {
          setShow(!show);
        }}>
        Add Service
      </Button>
      <div>{show ? <AddService show={show} setShow={setShow} /> : null}</div>
      {!loading ? (
        <Grid container spacing={3} style={{ marginTop: 8 }}>
          {services.map(service => (
            <Grid key={service.serviceId} item md={4}>
              <Card className={clsx(classes.root)}>
                <CardContent>
                  <Grid container direction="row" justify="space-between">
                    <Grid item md={9}>
                      <Typography variant="h3">
                        {String(service.name).toUpperCase()}
                      </Typography>
                      <Divider />
                      <div className={classes.field}>
                        <Typography variant="h6">
                          <Icon
                            className="fas fa-rupee-sign"
                            component="span"
                            fontSize="small"></Icon>
                          {service.price}
                        </Typography>
                      </div>
                      <div className={classes.field}>
                        <Typography variant="h6">
                          Capacity : {service.capacity}
                        </Typography>
                      </div>
                      <div className={classes.field}>
                        <Typography variant="h6">
                          Availablity :{service.available}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item md={3} style={{ marginTop: 24 }}>
                      <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="flex-end"
                        spacing={1}>
                        <Grid item>
                          <IconButton
                            onClick={() => {
                              const url =  `stores/${storeId}/services/${service.serviceId}`
                              if (service.available > 0){
                              let t = service.available-1;
                                db.doc(url).update({available:t});
                              }
                            }}>
                            <AddBox />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton
                            onClick={() => {
                              const url =  `stores/${storeId}/services/${service.serviceId}`
                              if (service.available < service.capacity){
                                let t = service.available+1;
                                db.doc(url).update({available:t});
                              }
                            }}>
                            <Icon className="fas fa-minus-square"> </Icon>
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </div>
  );
};

Services.propTypes = {
  className: PropTypes.string
};

export default Services;

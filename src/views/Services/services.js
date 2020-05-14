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
import { AddCircle } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectService } from 'app/Garage/services/services';
import { AddService } from 'views';
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
  field:{
      margin:8
  }
  ,
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
  let data = useSelector(selectService);
  useEffect(() => {
    setServices(data);
  }, [data]);
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
      <Grid container spacing={3} style={{ marginTop: 8 }}>
        {services.map(service => (
          <Grid key={service.id} item md={4}>
            <Card className={clsx(classes.root)}>
              <CardContent>
                <Grid container direction="row" justify="space-between">
                  <Grid item md={9}>
                    <Typography variant="h3">{service.name}</Typography>
                    <Divider/>
                    <div  className={classes.field}>
                    <Typography variant="h6">
                    <Icon className="fas fa-rupee-sign"  component='span' fontSize="small"></Icon>
                    {service.price}
                    </Typography>
                    </div>
                    <div className={classes.field}>
                    <Typography variant="h6"> capacity : {service.capacity}</Typography>
                    </div>
                    <div className={classes.field}>
                    <Typography variant="h6">availablity :{service.available}</Typography>
                    </div>
                  </Grid>
                  <Grid item md={3} style={{marginTop:24}}>
                    <Grid
                      container
                      direction="column"
                      justify="space-between"
                      alignItems="flex-end" spacing={1}>
                      <Grid item>
                        <IconButton>
                          <AddCircle />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton>
                          <AddCircle />
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
    </div>
  );
};

Services.propTypes = {
  className: PropTypes.string
};

export default Services;

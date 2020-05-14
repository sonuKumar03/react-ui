import React  from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Map from  './Map';
import {
  Grid,
  IconButton,
  Typography,
  Paper,
  Divider,
  Button
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { addLocation } from 'app/Garage/store/storeSlice';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles(theme => ({
  button:{
    textAlign:'end',
    marginTop:theme.spacing(2),
    marginRight:theme.spacing(2)
  },
  root: {
    backgroundColor: theme.palette.background.default,
  },
  form: {
    paddingLeft: 50,
    paddingRight: 50,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
}));

const AddTiming = props => {
  const { history ,steps,activeStep,handleNext,handlePrev} = props;
  // const [location,setLocation]= useState({});
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleBack = () => {
    history.goBack();
  };

  const handleMap = ({lat,lng})=>{
    dispatch(addLocation({lat,lng}));
  }
  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid  item lg={7} xs={12}>
          <Paper style={{ paddingBottom: 16 }}>
            <div >
              <div >
                <IconButton onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.form}>
                <form>
                  <Typography className={classes.title} variant="h4">
                    Add Location
                  </Typography>
                  <Divider style={{ marginBottom: 16 }} />
                  <Map setLocation={handleMap}/>
                  <div className={classes.button}>
              <Button
                disabled={activeStep === 0}
                onClick={handlePrev}
                className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                style={{marginRight:32}}
                className={classes.button}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
                </form>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

AddTiming.propTypes = {
  history: PropTypes.object
};

export default withRouter(AddTiming);
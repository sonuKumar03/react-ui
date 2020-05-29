import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';
import {
  Grid,
  IconButton,
  TextField,
  Typography,
  Paper,
  Divider,
  FormControlLabel,
  FormGroup,
  Checkbox
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { addCharacteristic, selectCharacteristic } from 'app/Garage/store/storeSlice';
import { useDispatch ,useSelector} from 'react-redux';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  name: {
    marginTop: theme.spacing(1),
    color: theme.palette.white
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    flexBasis: 800,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },
  button: {
    textAlign: 'end',
    marginRight: theme.spacing(1)
  }
}));
const types = ['Two Wheeler', 'Four Wheeler'];
const features = ['Coloring', 'Wash', 'Replacement', 'Repair'];

const AddFeature = props => {
  const { history } = props;
  const { handleNext, steps, activeStep, handlePrev } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  //retrived from state
  let characteristic = useSelector(selectCharacteristic);
  if(typeof characteristic==='undefined'){
    characteristic={}
  }
  const help = (stored,names)=>{
    if(stored){
    const t =names.map(name=>{
        let x  = stored.find(s=>s.name.localeCompare(name)===0);
        if(x){
          return x;
        }
        return name;
        })
        return t;
    }
    return names.map(name=>({name,checked:false}));
  }

  

  const [formState, setFormState] = useState({
    types: help(characteristic.types,types),
    features:help(characteristic.features,features)
  });

  const handleBack = () => {
    history.goBack();
  };
  const handleTypes = event => {
    event.persist();
    const { name, checked } = event.currentTarget;
    setFormState(state => ({
      ...state,
      types: state.types.map(type =>
        type.name.localeCompare(name) === 0 ? { ...type, checked } : type
      )
    }));
  };
  const handleFeatures = event => {
    event.persist();
    const { name, checked } = event.currentTarget;
    setFormState(state => ({
      ...state,
      features: state.features.map(feature =>
        feature.name.localeCompare(name) === 0
          ? { ...feature, checked }
          : feature
      )
    }));
  };
  const [feature, setFeature] = useState('');
  const handlefeature = event => {
    const { value } = event.target;
    setFeature(value);
  }
  const addfeature = () => {
    if(feature.trim().length>3){
    setFormState((state)=>({
      ...state,
      features:[...state.features,{name:feature,checked:false}]
    }))
    setFeature('');
   }
  };
  const handleSubmit = () => {
    console.log(formState);
    // let types = formState.types.filter(type=>type.checked===true);
    // let features = formState.features.filter(feature=>feature.checked===true);
    dispatch(addCharacteristic(formState));
    handleNext();
  };
  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid className={classes.content} item lg={7} xs={12}>
          <Paper style={{ paddingBottom: 32 }}>
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography className={classes.title} variant="h4">
                    Add Features
                  </Typography>
                  <Divider style={{ marginBottom: 32 }} />
                  <div>
                    <Typography variant="caption" component="span">
                      vehicles types
                    </Typography>
                    <Divider />
                    <FormGroup row>
                      {formState.types.map(({ name, checked }, i) => (
                        <FormControlLabel
                          key={i}
                          control={
                            <Checkbox
                            checked={checked}
                              onChange={handleTypes}
                              name={name}
                            />
                          }
                          label={name}
                        />
                      ))}
                    </FormGroup>
                    <Typography variant="caption" component="span">
                      vehicles features
                    </Typography>
                    <Divider />
                    <FormGroup row>
                      {formState.features.map(({ name, checked }, i) => (
                        <FormControlLabel
                          key={i}
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={handleFeatures}
                              name={name}
                            />
                          }
                          label={name}
                        />
                      ))}
                    </FormGroup>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between'
                    }}>
                    <TextField
                      variant="outlined"
                      size="small"
                      name="feature"
                      label="Add more features"
                      value={feature}
                      style={{ marginTop: 16 }}
                      onChange={handlefeature}
                    />
                    <Button
                      onClick={addfeature}
                      size="small"
                      variant="contained"
                      color="secondary">
                      add feature
                    </Button>
                  </div>
                  <div className={classes.button}>
                    <Button
                      disabled={
                        typeof activeStep === 'undefined' || activeStep === 0
                      }
                      onClick={handlePrev}
                      className={classes.button}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      style={{ marginRight: 32 }}
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

AddFeature.propTypes = {
  history: PropTypes.object
};
export default withRouter(AddFeature);

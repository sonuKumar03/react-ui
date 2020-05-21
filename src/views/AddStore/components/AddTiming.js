import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import {
  Grid,
  IconButton,
  Typography,
  Paper,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  InputLabel,
  Select,
  FormControl,
  MenuItem
} from '@material-ui/core';
import 'date-fns';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Shedule from './Shedule'
import { useDispatch } from 'react-redux';
import { addShedule } from 'app/Garage/store/storeSlice';
const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

//  00 : 00  to 24:00
const time = [];
for (let i = 0; i <= 24; i++) {
  for (let j = 0; j < 60; j += 15) {
    let H = `${i}`;
    let M = `${j}`;
    if (H.length < 2) {
      H = `0${H}`;
    }
    if (M.length < 2) {
      M = `0${M}`;
    }
    time.push(`${H}:${M}`);
    if (i === 24) break;
  }
}

const useStyles = makeStyles(theme => ({
  button: {
    textAlign: 'end',
    marginRight: theme.spacing(2)
  },
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(1),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
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
  logoImage: {
    marginLeft: theme.spacing(4)
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
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(1)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const AddTiming = props => {
  const { history, steps, activeStep, handleNext, handlePrev } = props;
  const classes = useStyles();
  const [formState, setFormState] = useState({
    values: { days:days.map(day=>({day,checked:false})), time: { from: '09:30', to: '11:30' } }
  });
  
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const dispatch = useDispatch();
  const handleClose = e => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose1 = e => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleBack = () => {
    history.goBack();
  };


  const handleShedule = (e) => {
    let days  = formState.values.days.filter((day)=>day.checked===true);
    console.log(days);
    if(days.length>0){
    let time = formState.values.time;
    let shedules = days.map(t=>({day:t.day,...time}))
    dispatch(addShedule(shedules));
    }
    return 
  };

  const handleTime = e => {
    e.persist();
    const { name, value } = e.target;
    setFormState(state => ({
      ...state,
      values: {
        ...state.values,
        time: {
          ...state.values.time,
          [name]: value
        }
      }
    }));
  };
  const handleDays = e => {
    e.persist();
    const { name, checked } = e.target;
    if (checked) {
      setFormState(state => ({
        ...state,
        values: {
          ...state.values,
          days:state.values.days.map((day)=>(day.day.localeCompare(name)===0)?({...day,checked}):day)
        }
      }));
    }
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
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
                    Add Timing
                  </Typography>
                  <Divider style={{ marginBottom: 32 }} />
                  <FormGroup row>
                    {formState.values.days.map(({day,checked}, i) => (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            name={day}
                            color="primary"
                            value={checked}
                            onChange={handleDays}
                          />
                        }
                        label={`${day.substr(0, 1).toUpperCase()}${day.substr(
                          1
                        )}`}></FormControlLabel>
                    ))}
                  </FormGroup>
                  <Grid item>
                    <Divider />
                  </Grid>
                  <Grid
                    container
                    spacing={3}
                    justify="space-evenly"
                    style={{ marginBottom: 16, marginTop: 16 }}>
                    <Grid item md={5} sm={5} xs={5}>
                    <FormControl  fullWidth>
                        <InputLabel>
                          from
                        </InputLabel>
                        <Select
                        name="from"
                          open={open}
                          onClose={handleClose}
                          onOpen={handleOpen}
                          value={formState.values.time.from}
                          onChange={handleTime}>
                          <MenuItem value="None">
                            <em>None</em>
                          </MenuItem>
                          {
                            time.map((t,i)=>(<MenuItem key={i} value={t}>{t}</MenuItem>))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={5} sm={5} xs={5}>
                      <FormControl  fullWidth>
                        <InputLabel>
                          To
                        </InputLabel>
                        <Select
                        name="to"
                          open={open1}
                          onClose={handleClose1}
                          onOpen={handleOpen1}
                          value={formState.values.time.to}
                          onChange={handleTime}>
                          <MenuItem value="None">
                            <em>None</em>
                          </MenuItem>
                          {
                            time.map((t,i)=>(<MenuItem key={i} value={t}>{t}</MenuItem>))
                          }
                        </Select>
                      </FormControl>
                    </Grid>

                  </Grid>
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
                      style={{ marginRight: 32 }}
                      className={classes.button}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <Button onClick={handleShedule} variant="contained"  color="secondary">Preview Shedule</Button>
          </Paper>
        </Grid>
        <Grid item  lg={7} xs={12} style={{marginTop:16}}>
          <Shedule/>
        </Grid>
      </Grid>
    </div>
  );
};

AddTiming.propTypes = {
  history: PropTypes.object
};

export default withRouter(AddTiming);

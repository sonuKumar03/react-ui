import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles, Button } from '@material-ui/core';
import {
  MenuItem,
  Grid,
  IconButton,
  TextField,
  Typography,
  Paper,
  Divider
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { addBasicInfo, selectBasicInfo } from 'app/Garage/store/storeSlice';
import { useDispatch ,useSelector} from 'react-redux';

const schema = {
  mobile:{
    presence:{allowEmpty:false,message:'is required'},
    length:{
      is:10
    },
  },
  locality: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  owner: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  opening_status: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  ownership: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  }
};

const useStyles = makeStyles(theme => ({
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
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  button:{
    textAlign:'end',
    marginRight:theme.spacing(1)
  }
}));

const BasicInfo = props => {
  const { history } = props;
  const { handleNext ,steps,activeStep,handlePrev} = props;
  const dispatch = useDispatch();

  const classes = useStyles();
  const info = useSelector(selectBasicInfo);
  const [formState, setFormState] = useState({
    isValid: false,
    values: info,
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const handleSubmit = () => {
    console.log(formState.values);
    dispatch(addBasicInfo(formState.values));
    handleNext();
  };
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

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
                    Add Basic Info
                  </Typography>
                  <Divider style={{ marginBottom: 32 }} />
                  <TextField
                    size="small"
                    style={{ marginBottom: 16 }}
                    error={hasError('name')}
                    fullWidth
                    helperText={
                      hasError('name')
                        ? formState.errors.name
                        : null
                    }
                    label="Store Name"
                    name="name"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.name || ''}
                    variant="outlined"
                  />
                  <TextField
                    size="small"
                    style={{ marginBottom: 16 }}
                    error={hasError('owner')}
                    fullWidth
                    helperText={
                      hasError('owner')
                        ? formState.errors.owner
                        : null
                    }
                    label="Owner Name"
                    name="owner"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.owner || ''}
                    variant="outlined"
                  />
                  <TextField
                    size="small"
                    style={{ marginBottom: 16 }}
                    error={hasError('locality')}
                    fullWidth
                    helperText={
                      hasError('locality') ? formState.errors.locality : null
                    }
                    label="Locality"
                    name="locality"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.locality || ''}
                    variant="outlined"
                  />
                   <TextField
                    size="small"
                    style={{ marginBottom: 16 }}
                    error={hasError('mobile')}
                    fullWidth
                    helperText={
                      hasError('mobile') ? formState.errors.mobile: null
                    }
                    label="Phone"
                    name="mobile"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.mobile || ''}
                    variant="outlined"
                  />
                  <TextField
                    error={hasError('ownership')}
                    size="small"
                    style={{ marginBottom: 16 }}
                    fullWidth
                    helperText={
                      hasError('ownership') ? formState.errors.ownership : null
                    }
                    label="Are You Owner of this store"
                    name="ownership"
                    onChange={handleChange}
                    select
                    value={formState.values.ownership || ''}
                    variant="outlined">
                    <MenuItem value={'yes'}>Yes</MenuItem>
                    <MenuItem value={'no'}>No</MenuItem>
                  </TextField>
            <div className={classes.button}>
              <Button
                disabled={typeof activeStep==='undefined' ||activeStep ===0 }
                onClick={handlePrev}
                className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
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

BasicInfo.propTypes = {
  history: PropTypes.object
};

export default withRouter(BasicInfo);

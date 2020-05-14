import React from 'react';
import { makeStyles } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BasicInfo from './components/BasicInfo';
import AddTiming from './components/AddTiming';
import AddMap from './components/AddMap';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    textAlign: 'end'
  },
  marginButton: {
    marginRight: theme.spacing(3)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  }
}));
function getSteps() {
  return ['Add Basic Info', 'AddTiming','AddMap'];
}

export default function AddStore() {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);

  const [skipped, setSkipped] = React.useState(new Set());

  const steps = getSteps();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <BasicInfo
            handleNext={handleNext}
            steps={steps}
            handlePrev={handleBack}
            activeStep={activeStep}
          />
        );
      case 1:
        return (
          <AddTiming
            handleNext={handleNext}
            handlePrev={handleBack}
            steps={steps}
            activeStep={activeStep}
          />
        );
      case 2:
        return (
          <AddMap
            handleNext={handleNext}
            handlePrev={handleBack}
            steps={steps}
            activeStep={activeStep}
          />
        );
      default:
        return 'Unknown step';
    }
  }


  const isStepOptional = step => {
    return step === 1000; // mark the steps that aare optional
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  //   setSkipped(prevSkipped => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const history = useHistory();
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions} variant="h4">
              All steps completed Heading Back to Dashboard 
            </Typography>
            <Button variant="contained" color="default" onClick={()=>{  history.push('/dashboard')  }}>Go Back To Dashboard</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions} component="div">
              {getStepContent(activeStep)}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}

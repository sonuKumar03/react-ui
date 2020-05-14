import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Shedule from '../../AddStore/components/Shedule'
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Chip
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectStore } from 'app/Garage/store/storeSlice';
import Motor from '@material-ui/icons/Motorcycle'
import FourWheeler from  '@material-ui/icons/AirportShuttle'
import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const useStyles = makeStyles(theme => ({
  root: {margin:16},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const camelCase = str => {
    if(!str){
        return
    }
  let parts = str.split(' ');
  parts = parts.map(s => `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`);
  return parts.join(' ');
};

const getIcons = (name)=>{
    if(name.localeCompare('two wheeler')===0){
        return <Motor/>
    }
    if(name.localeCompare('four wheeler')===0){
        return <FourWheeler/>
    }
    if(name.localeCompare('wash')===0){
        return <LocalCarWashIcon/>
    }
    if(name.localeCompare('part replacement')===0){
        return <AutorenewIcon/>
    }
    if(name.localeCompare('color')||name.localeCompare('coloring')===0){
        return <ColorLensIcon />
    }
    if(name.localeCompare('wash')===0){
        return <LocalCarWashIcon/>
    }
}

const StoreDetails = props => {
  const { className} = props;
  const classes = useStyles();
  const { basicInfo, characteristic } = useSelector(
    selectStore
  );
  return (
    <div>
    <Card className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h3">
              {camelCase(basicInfo.name)}
            </Typography>
            <Typography  color="textSecondary" variant="h4">
              {basicInfo.owner}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1">
              {basicInfo.locality}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1">
              {basicInfo.mobile}
            </Typography>
          </div>
        </div>
        <div></div>
      </CardContent>
      <Divider />
      <div style={{ marginTop:8,marginLeft:8 }}>
        {characteristic.types.map((type,i) => (
          <Chip key={i} size="small" icon={getIcons(type)} label={type} style={{ marginRight: 8,marginBottom:8 }} />
        ))}
      </div>
      <div style={{ marginTop:8,marginLeft:8 }}>
        {characteristic.services.map((service,i) => (
          <Chip key={i}  icon={getIcons(service)} size="small" label={service} style={{ marginRight: 8 ,marginBottom:8}} />
        ))}
      </div>
    </Card>
    <Card style={{margin:8}}>
      <Shedule/>
    </Card>
    </div>

  );
};

StoreDetails.propTypes = {
  className: PropTypes.string
};

export default StoreDetails;

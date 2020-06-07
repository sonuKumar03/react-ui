import React ,{useEffect,useState}from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Shedule from './Shedules'
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,Button
} from '@material-ui/core';
import { useSelector ,useDispatch} from 'react-redux';
import { selectStore, setStore} from 'app/Garage/store/storeSlice';
import Motor from '@material-ui/icons/Motorcycle'
import FourWheeler from  '@material-ui/icons/AirportShuttle'
import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { toggleStore } from 'async/store/store';
import { selectUid } from 'app/Garage/user/userSlice';
import 'config'
import firebase from 'firebase/app'
const db = firebase.firestore();
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
  name=name.toLowerCase();
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
}

const StoreDetails = props => {
  const { className} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);
  const storeId = useSelector(selectUid);
  useEffect( ()=>{
    setLoading(true);
    let callback=f=>f;
    try{
        callback = db.doc(`stores/${storeId}`).onSnapshot((docs)=>{
          const store = docs.data();
          const {name,locality,open} = store;
          const _store = {        
            basicInfo:{
            owner:store.owner,
            mobile:store.mobile,
            name,
            locality,
            ownership:store.ownership,
            },
            open,
            location:store.location,
            shedules:store.shedules,
            characteristic:store.characteristic
          }
            dispatch(setStore(_store));
            setLoading(false);
        },(err)=>{ console.log(err);
         })
    }catch(err){
      console.log(err);
    }
    return callback;
  },[dispatch,storeId])

  let { basicInfo, characteristic,open } = useSelector(
    selectStore
  );

  if(typeof basicInfo==='undefined'){
    basicInfo={}
  }
  if(typeof characteristic==='undefined'){
    characteristic={}
  }
  if(typeof open ==='undefined'){
    open=false
  }

  const _toggleStore = (event)=>{
    console.log(open);
    dispatch(toggleStore({open,storeId}))
  }
  return (
    (!loading)?
    <div>
    <Card className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h3">
              {camelCase(basicInfo.name)} <STATUS open={open}/>
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
        {(characteristic.types)?characteristic.types.map(({name,checked},i) => {
        if(checked)
        return (
          <Chip key={i} size="small" icon={getIcons(name)} label={name} style={{ marginRight: 8,marginBottom:8 }} />
        )
        return null
      }):null
      }
      </div>
      <div style={{ marginTop:8,marginLeft:8 }}>
        {(characteristic.features)?characteristic.features.map(({name,checked},i)=>{
          if(checked)
          return <Chip key={i}  icon={getIcons(name)} size="small" label={name} style={{ marginRight: 8 ,marginBottom:8}} />
          return null
      }
        ):null}
      </div>
      <div style={{display:"flex" ,justifyContent:"flex-end",marginBottom:8,marginRight:8}}>
        <Button color="primary" variant="contained" onClick={_toggleStore}>{(open)?"CLOSE STORE":"OPEN STORE"}</Button>
      </div>
    </Card>
    <Card style={{margin:8}}>
      <Shedule/>
    </Card>
    </div>:null
  )
};
const STATUS = (props)=>{
  const {open} = props;
  return (
    (open)?<Chip  size="small" label="OPEN" color="primary"/>:<Chip size="small" label="CLOSED"/>
  )
}

StoreDetails.propTypes = {
  className: PropTypes.string
};

export default StoreDetails;

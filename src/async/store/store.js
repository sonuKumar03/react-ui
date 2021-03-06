import {
  setStore
} from 'app/Garage/store/storeSlice';
import 'config';
import {releaseService as release,alloteService as allote} from 'app/Garage/services/services'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { SET_LOADING, UNSET_LOADING } from 'app/Garage/ui/uiSlice';

import { setService } from 'app/Garage/services/services';
const db = firebase.firestore();

// add info
export const addStoreInfo = storeData => async dispatch => {
  dispatch(SET_LOADING());
  const { storeId } = storeData;
  const { store } = storeData;
  const data = {
    storeId:storeId,
    ownership:store.basicInfo.ownership,
    name:store.basicInfo.name,
    mobile:store.basicInfo.mobile,
    locality:store.basicInfo.locality,
    characteristic:store.characteristic,
    shedules:store.shedules,
    open:store.open,
    location:store.location,
  }
  await db.collection('stores').doc(`${storeId}`).set(data);
  dispatch(UNSET_LOADING());

};
export const addServices = serviceData => dispatch => {
  dispatch(SET_LOADING())
  const { storeId, service } = serviceData;
  service.available = service.capacity;
  db.collection(`stores/${storeId}/services`).add(service).then((doc)=>{
    console.log('added',doc.id);
    dispatch(UNSET_LOADING());
  }).catch(err=>console.log(err))
};

export const getStore = storeId => dispatch => {
  dispatch(SET_LOADING());
  db.doc(`/stores/${storeId}`).onSnapshot((doc)=>{
    // console.log(doc.data());
    const data  = doc.data();
    if(typeof data ==='undefined')
      return 
    let store ={
      basicInfo:{
        name:data.name,
        ownership:data.ownership,
        locality:data.locality,
        storeId:data.storeId,
        mobile:data.mobile
      },
      open:data.open,
      shedules:data.shedules,
      characteristic:data.characteristic,
      services:data.services,
      location:data.location

    }
    dispatch(setStore(store));
    dispatch(UNSET_LOADING());
  },(err)=>{console.log(err);
  })
}
export const getServices = (storeId)=>dispatch=>{
  dispatch(SET_LOADING());
  db.collection(`stores/${storeId}/services`).get().then(snaps=>{
    return snaps.docs.map((doc)=>({serviceId:doc.id,...doc.data()}));
  }).then(services=>{
    dispatch(setService(services));
    dispatch(UNSET_LOADING());
  }).catch(err=>{ console.log(err);
   })
}

export const alloteService = ({storeId,serviceId,available})=>dispatch=>{
  dispatch(SET_LOADING())
  available=available-1;
  db.doc(`stores/${storeId}/services/${serviceId}`).update({available}).then(()=>{
    dispatch(allote(available));
    dispatch(UNSET_LOADING());
    console.log('updated');
  })
}
export const releaseService = ({storeId,serviceId,available})=>dispatch=>{
  dispatch(SET_LOADING());
  available=available+1;
  db.doc(`stores/${storeId}/services/${serviceId}`).update({available}).then(()=>{
    dispatch(release(available))  ;
    console.log('updated');
    dispatch(UNSET_LOADING());
  })
}

export const toggleStore = ({ storeId, open }) => dispatch => {
  dispatch(SET_LOADING());
  open=!open
  db.doc(`stores/${storeId}`).update({open}).then(()=>{
    console.log('updated');
    dispatch(UNSET_LOADING());
    }).catch(err=>{
    console.log(err);
  })
};

export const setToken = (storeId,token)=>dispatch=>{
  dispatch(SET_LOADING());
  if(token &&storeId)
    db.doc(`tokens/${storeId}`).set({token}).then(()=>{
      console.log('written');
      dispatch(UNSET_LOADING());
  })
}

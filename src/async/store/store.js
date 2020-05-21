import {
  toggleStore as _toggleStore,
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
export const addStoreInfo = storeData => dispatch => {
  const { storeId } = storeData;
  const { store } = storeData;
  db.collection(`stores/${storeId}/info`).add(store).then(doc => {
    console.log('added', doc.id);
  })
  .catch(err => {
    console.log(err);
  });
};
export const addServices = serviceData => dispatch => {
  const { storeId, service } = serviceData;
  service.available = service.capacity;
  db.collection(`stores/${storeId}/services`).add(service).then((doc)=>{
    console.log('added',doc.id);
  }).catch(err=>console.log(err))
};

export const getStore = storeId => dispatch => {
  dispatch(SET_LOADING());
  db.doc(`/stores/${storeId}/data/info`).get()
        .then(doc => {
          console.log(doc.data());
          dispatch(setStore(doc.data()));
          dispatch(UNSET_LOADING());
        }).catch(err=>{ console.log(err);
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
  available=available-1;
  db.doc(`stores/${storeId}/services/${serviceId}`).update({available}).then(()=>{
    dispatch(allote(available));
    console.log('updated');
  })
}
export const releaseService = ({storeId,serviceId,available})=>dispatch=>{
  available=available+1;
  db.doc(`stores/${storeId}/services/${serviceId}`).update({available}).then(()=>{
    dispatch(release(available));
    console.log('updated');
  })
}

export const toggleStore = ({ storeId, open }) => dispatch => {
  open=!open
  db.doc(`stores/${storeId}/data/info`).update({open}).then(()=>{
    console.log('updated');
  }).catch(err=>{
    console.log(err);
  })
};

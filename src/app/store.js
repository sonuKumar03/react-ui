import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  store as s,
  notifications,
  history,
  user,
  services,
  ui,
  orders
} from './Garage';
const rootReducer = { store: s, user, notifications, history, services, ui ,orders};

const saver = store => next => action => {
  let result = next(action);
  localStorage['redux-store'] = JSON.stringify(store.getState().user);
  return result;
};
const getLoadState = () => {
  if (localStorage['redux-store']) {
    return JSON.parse(localStorage['redux-store']);
  }
};

const state = {
  store: {
    open: false,
    basicInfo: {},
    characteristic: {},
    services: [{}],
    location: {},
    shedule: [],
    orders:[],
  },
  user: getLoadState()
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({
    serializableCheck:false
  }), saver],
  preloadedState: state
});


export default store;

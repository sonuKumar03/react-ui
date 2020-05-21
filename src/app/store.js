import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  store as s,
  notifications,
  history,
  user,
  services,
  ui
} from './Garage';
const rootReducer = { store: s, user, notifications, history, services, ui };

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

console.log(getLoadState());

const state = {
  store: {
    open: false,
    basicInfo: {},
    characteristic: {},
    services: [{}],
    location: {},
    shedule: []
  },
  user: getLoadState()
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), saver],
  preloadedState: state
});

// store.subscribe(() => {
//   console.log(store.getState());
// });

export default store;

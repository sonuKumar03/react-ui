import { configureStore } from "@reduxjs/toolkit";
import {store as s,notifications,history,user,services} from './Garage'
const rootReducer = { store:s, user, notifications, history,services};
const store = configureStore({ reducer: rootReducer });
store.subscribe(() => {
  console.log(store.getState());
});

export default store;
import { createSlice } from "@reduxjs/toolkit";
import initialState from "./intialState";
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    toggleStore:(state,action)=>{
      state.open = action.payload
    },
    addStore: {
      reducer(state, action){
          state = {
            ...state,
            ...action.payload
          }
          return state;
      },
    },
    addBasicInfo:(state,action)=>{
      return Object.assign({},state,{
        basicInfo:action.payload
      })
    },
    addCharacteristic:(state,action)=>{
      return Object.assign({},state,{
        characteristic:action.payload
      })
    },
    addShedule:(state,action)=>{
      return  Object.assign({},state,{
      shedules:action.payload
      })
    },
    addLocation:(state,action)=>{
      return Object.assign({},state,{
        location:action.payload
      })
    },
    setStore:(state,action)=>{
      return action.payload;
    }
  },
});
export const selectCharacteristic = state=>state.store.characteristic
export const selectShedules =state=>state.store.shedules;
export const selectBasicInfo = state=>state.store.basicInfo;
export const selectStore = state=>state.store;
export const selectOpen = state=>state.store.open;
export const selectLocation = state=>state.store.location;
const {actions,reducer} = storeSlice;

export const { setStore, addStore ,addBasicInfo,addShedule,addLocation,addCharacteristic,toggleStore} =actions;
export default reducer;

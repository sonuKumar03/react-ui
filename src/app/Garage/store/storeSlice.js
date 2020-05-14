import { createSlice } from "@reduxjs/toolkit";
import initialState from "./intialState";
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: {
      reducer(state, action) {
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
    
    addShedule:(state,action)=>{
      return  Object.assign({},state,{
      shedule:action.payload
      })
    },
    addLocation:(state,action)=>{
      return Object.assign({},state,{
        location:action.payload
      })
    },
  },
});

export const selectShedule =state=>state.store.shedule;
export const selectBasicInfo = state=>state.store.basicInfo;
export const selectStore = state=>state.store;
const {actions,reducer} = storeSlice;
export const { addStore ,addBasicInfo,addShedule,addLocation} =actions;

export default reducer;

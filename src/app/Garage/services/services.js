import { createSlice } from '@reduxjs/toolkit';
// import state from './initiaiState';
import shortid from 'shortid';
const serviceSlice = createSlice({
  name: 'service',
  initialState: [],
  reducers: {
    addService:{
      reducer(state,action){
      state.push(action.payload);
      },
      prepare(state){
        return {payload: Object.assign({},state,{
          id:shortid.generate(),
          available:state.capacity
        })}
      }
    },
    setService:(state,action)=>{
        state = [...action.payload];
        return state;
    },
    removeService:(state, action)=>{
      state.filter(service => service.id !== action.id);
    },
    alloteService:(state,action)=>{
      return Object.assign({},state,{
        available:action.payload
      })
    },
    releaseService:(state,action)=>{
      return Object.assign({},state,{
        available:action.payload
      })
    },
    resetServices:(state,action)=>{
      return [];
    }
  }
});
export const selectService = state=>state.services;
const {actions,reducer} = serviceSlice
export const {resetServices,setService,alloteService,removeService,addService,releaseService} = actions;
export default reducer;

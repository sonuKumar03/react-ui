import { createSlice } from '@reduxjs/toolkit';
import state from './initiaiState';
import shortid from 'shortid';
const serviceSlice = createSlice({
  name: 'service',
  initialState: state,
  reducers: {
    addService:{
      reducer(state,action){
      console.log('called');
      // action.payload.id = shortId.generate();
      state.push(action.payload);
      },
      prepare(state){
        return {payload: Object.assign({},state,{
          id:shortid.generate(),
          available:state.capacity
        })}
      }
    },
    removeService:(state, action)=>{
      return state.filter(service => service.id !== action.id);
    },
    alloteService:(state,action)=>{
      state.forEach((service)=>{ if(service.id===action.payload){ service.available+=1 } })
    },
    releaseService:(state,action)=>{
      state.forEach((service)=>{ if(service.id===action.payload){ service.available-=1 } })
    }
  }
});
export const selectService = state=>state.services;
const { actions, reducer } = serviceSlice;
export const { addService ,removeService} = actions;
export default reducer;

import {createSlice} from '@reduxjs/toolkit'
// import state from './initialState'
const OrderSlice = createSlice({
  name:'orders',
  initialState:[],
  reducers:{
    setOrders:(state,action)=>{
      state=[...action.payload]
      return state;
    }
  }
});

const {reducer,actions} = OrderSlice;
export const {setOrders}= actions;
export const selectOrders = state=>state.orders;
export default reducer;
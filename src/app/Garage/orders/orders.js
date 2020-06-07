import {createSlice} from '@reduxjs/toolkit'
const orders = createSlice({
    name:'orders',
    initialState:[],
    reducers:{
        setOrders:(state,action)=>{
            state = [...action.payload];
            return state;
        },
        resetOrders:(state,action)=>{
            return [];
        }
    }
})
export const selectOrders = state=>state.orders
const {actions,reducer} = orders;
export const {setOrders,resetOrders} = actions
export default reducer;
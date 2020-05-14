import {createSlice} from '@reduxjs/toolkit'
import history from './initialstate'
const  historySlice = createSlice({
    name:'history',
    initialState:history,
    reducers:{
        addHistory:{
            reducer(state,action){
                state = [...state,action.payload]
            }
        },
        removeHistory:(state,action)=>{
            const index = state.findIndex((request)=>request.id===action.payload)
            state.splice(index);
        },
    }
})

export const{ addHistory,removeHistory } = historySlice.actions
export const selectHistory = state=>state.history
export default historySlice.reducer;
import {createSlice} from '@reduxjs/toolkit'
// import history from './initialstate'
const  historySlice = createSlice({
    name:'history',
    initialState:[],
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
        resetHistory:(state,action)=>{
            return [];
        }
    }
})

export const{ addHistory,removeHistory,resetHistory } = historySlice.actions
export const selectHistory = state=>state.history
export default historySlice.reducer;

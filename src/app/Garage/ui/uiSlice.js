import {createSlice} from '@reduxjs/toolkit'
const uiSlice = createSlice({
    name:'ui',
    initialState:{loading:true},
    reducers:{
        SET_LOADING:(state,action)=>{
            state.loading=true;
            return state;
        },
        UNSET_LOADING:(state,action)=>{
            state.loading=false
            return state;
        }
    }
})

const {  actions,reducer  } = uiSlice;
export const selectLoading = state=>state.ui.loading
export const {SET_LOADING,UNSET_LOADING} = actions
export default reducer;
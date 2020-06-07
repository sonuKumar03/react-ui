import {createSlice} from '@reduxjs/toolkit'
const uiSlice = createSlice({
    name:'ui',
    initialState:{loading:false},
    reducers:{
        SET_LOADING:(state,action)=>{
            state.loading=true;
            return state;
        },
        UNSET_LOADING:(state,action)=>{
            state.loading=false
            return state;
        },
        resetUI:(state,action)=>{
            return {loading:null};
        }
    }
})

const {  actions,reducer  } = uiSlice;
export const selectLoading = state=>state.ui.loading
export const {SET_LOADING,UNSET_LOADING,resetUI} = actions
export default reducer;
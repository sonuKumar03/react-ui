import {createSlice} from '@reduxjs/toolkit'
// import initialState  from './intialstate'
const userSlice = createSlice({
    name:'user',
    initialState:{},
    reducers:{
        login:(state,action)=>{
                state.isLoggedIn=true;
                state.uid=action.payload;
            },
        logout:(state,action)=>{
                state.isLoggedIn=false;
                state.uid=null
            }
        }
});

const {actions ,reducer}  = userSlice;

export const {login,logout} = actions;
export const selectIsLoggedIn = state=>state.user.isLoggedIn
export const selectUid = state=>state.user.uid
export default userSlice.reducer

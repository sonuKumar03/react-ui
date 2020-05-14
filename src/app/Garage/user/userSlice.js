import {createSlice} from '@reduxjs/toolkit'
import initialState  from './intialstate'
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:{
            reducer(state,action){
                state = Object.assign({},state,{ ...action.payload })
            }
        },
        logout:{
            reducer(state,action){
                state = Object.assign({},state,{ ...action.payload })
            }
        }
    }
})

export default userSlice.reducer
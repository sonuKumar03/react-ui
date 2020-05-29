import {createSlice} from '@reduxjs/toolkit'
// import notification from './initialstate'
const  notificationSlice = createSlice({
    name:'notification',
    initialState:[],
    reducers:{
        addNotification:(state,action)=>{
            state = [...state,action.payload]
        },
        markRead:(state,action)=>{
            const notification = state.find((request)=>request.id===action.payload);
            if(notification){
                notification.isRead=true
            }
        },
        markUnRead:(state,action)=>{
            const notification = state.find((request)=>request.id===action.payload);
            if(notification){
                notification.isRead=false
            }
        }
    }
})

export const { addNotification,markRead,markUnRead } = notificationSlice.actions
export const selectNotications = state=>state.notifications
export default notificationSlice.reducer;

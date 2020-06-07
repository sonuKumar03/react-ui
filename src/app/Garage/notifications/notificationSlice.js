import {createSlice} from '@reduxjs/toolkit'
// import notification from './initialstate'
const  notificationSlice = createSlice({
    name:'notifications',
    initialState:[],
    reducers:{
        setNotifications:(state,action)=>{
            state = action.payload;
            return state;
        },
        addNotification:(state,action)=>{
            state = [...state,action.payload]
            return state;
        },
        markRead:(state,action)=>{
            const notification = state.find((request)=>request.id===action.payload);
            if(notification){
                notification.isRead=true
            }
        },
        setNotifications:(state,action)=>{
            return [...action.payload]
        },
        clearNotifications:(state,action)=>{
            return [];
        }
    }
})

export const { clearNotifications, addNotification,markRead,setNotifications } = notificationSlice.actions
export const selectNotications = state=>state.notifications
export default notificationSlice.reducer;

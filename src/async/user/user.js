import { login, logout } from 'app/Garage/user/userSlice'
import firebase from '../../config'
import 'firebase/auth'
import { SET_LOADING, UNSET_LOADING } from 'app/Garage/ui/uiSlice'
const auth  = firebase.auth()

export const loginUser = (userData)=>dispatch=>{
    dispatch(SET_LOADING());
    const {email,password} = userData; 
    auth.signInWithEmailAndPassword(email,password).then((doc)=>{
            dispatch(login(doc.user.uid)) ;       
            dispatch(UNSET_LOADING());
    }).catch(err=>{
        console.log(err);
    })
}

export const logoutUser =()=>dispatch=>{
    auth.signOut();
    dispatch(logout());
}

export const signupUser = (userData)=> async dispatch=>{
    const {email,password} = userData;
    try{
        const user =await auth.createUserWithEmailAndPassword(email,password);
        dispatch(login(user.user.uid));
    }catch(err){
        console.log(err);
    }
}

export default {loginUser,logoutUser,signupUser}

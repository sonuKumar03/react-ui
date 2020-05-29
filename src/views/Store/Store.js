import StoreDetails from './components/StoreDetails'
import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import { getStore } from 'async/store/store'
import { connect } from 'react-redux'
import  'config'
import firebase  from  'firebase/app'
import { setService } from 'app/Garage/services/services'
const db = firebase.firestore();
export class Store extends Component {
    state={
        loading:true
    }
    async componentDidMount(){
        try{
            await db.collection(`stores/${this.props.storeId}/services`).onSnapshot((snaps)=>{
                const services  = snaps.docs.map(doc=>doc.data());
                this.props.setService(services);
                this.setState({loading:false});
            },err=>{ console.log(err);
             });
        }
        catch(err){
            console.log(err);
        }
    }
    render() {
        return (
            <Grid container justify='center' alignItems='center'>
            <Grid item sm={10} xs={10} md={10}>
                {
                    (!this.state.loading)?<StoreDetails/>:null
                }
            </Grid>
            </Grid>
            )
    }
}

const mapToProps= state=>({
    storeId:state.user.uid,
    loading:state.ui.loading
})
const mapToDispatch = dispatch=>({
        loadStore  :(storeId)=>{
            dispatch(getStore(storeId));
        },
        setService:(services)=>{
            dispatch(setService(services));
        }
})



export default Store = connect(mapToProps,mapToDispatch)(Store);

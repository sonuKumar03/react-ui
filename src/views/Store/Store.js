import React from 'react'
import StoreDetails from './components/StoreDetails'
import { Grid } from '@material-ui/core'
export default function Store() {
    return (
            <Grid container justify='center' alignItems='center'>
                <Grid item sm={10} xs={10} md={10}>
                    <StoreDetails/>
                </Grid>
            </Grid>
    )
}
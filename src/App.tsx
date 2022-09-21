import React, {FC, useEffect} from 'react';
import './App.module.scss';
import {AppThunkCreators} from "./store/reducers/app/action-creators";
import {useTypedDispatch} from "./hooks/useTypedDispatch";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {Spinner} from "./components/ui/spinner/Spinner";
import {Grid} from "@mui/material";
import {Router} from './router/Router';
import {Layout} from "./components/layout/Layout";

export const App: FC = () => {
    const dispatch = useTypedDispatch()
    const isInitialized = useTypedSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(AppThunkCreators.initializedApp())
    }, [])

    return <>{isInitialized
        ? <Layout>
            <Router/>
        </Layout>
        : <Grid
            container
            direction="row"
            height={'100vh'}
            justifyContent="center"
            alignItems="center"
        ><Spinner/> </Grid>}</>
}





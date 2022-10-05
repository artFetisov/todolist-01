import React, {FC, useEffect} from 'react';
import './App.module.scss';
import {useTypedSelector} from "./hooks/useTypedSelector";
import {Spinner} from "./components/ui/spinner/Spinner";
import {Grid} from "@mui/material";
import {Router} from './router/Router';
import {Layout} from "./components/layout/Layout";
import {AppThunkCreators} from "./store/app/app.actions";
import {useAppDispatch} from "./hooks/useAppDispatch";

export const App: FC = () => {
    const dispatch = useAppDispatch()
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





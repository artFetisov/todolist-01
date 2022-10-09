import React, {FC, useEffect} from 'react';
import './App.module.scss';
import {useTypedSelector} from "./hooks/useTypedSelector";
import {Spinner} from "./components/ui/spinner/Spinner";
import {Grid} from "@mui/material";
import {Router} from './router/Router';
import {Layout} from "./components/layout/Layout";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {initializeAppTC} from "./store/app/app.actions";

export const App: FC = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useTypedSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
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





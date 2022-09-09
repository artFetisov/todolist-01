import React, {FC} from 'react';
import './App.module.scss';
import {Home} from "./components/pages/home/Home";

export const App: FC = () => {
    console.log('app is render')

    return <Home/>
}





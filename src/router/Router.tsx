import React, {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "./router.data";
import {useTypedSelector} from "../hooks/useTypedSelector";

export const Router: FC = () => {
    const {isAuth, id} = useTypedSelector(state => state.auth)

    return <>
        {isAuth &&
            <Routes>
                {privateRoutes.map(r => <Route key={r.path} path={r.path} element={<r.element/>}/>)}
                <Route path="/" element={<Navigate to={`/`}/>}/>
                <Route path="*" element={<Navigate to={`/`}/>}/>
            </Routes>
        }
        {!isAuth &&
            <Routes>
                {publicRoutes.map(r => <Route key={r.path} path={r.path} element={<r.element/>}/>)}
                <Route path="*" element={<Navigate to={`/login`}/>}/>
            </Routes>
        }
    </>
}
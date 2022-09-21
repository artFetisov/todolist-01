import {FC} from "react";
import {LoginPage} from "../components/pages/login-page/LoginPage";
import {Home} from "../components/pages/home/Home";

export interface IRoute {
    path: string
    element: FC
}

export const publicRoutes: IRoute[] = [
    {path: '/login', element: LoginPage},
]

export const privateRoutes = [
    {path: '/', element: Home},
]
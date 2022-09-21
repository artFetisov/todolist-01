import React, {FC, ReactNode} from "react";
import {NavBar} from "../ui/navbar/NavBar";
import {CustomizedSnackBar} from "../ui/snack-bar/SnackBar";

export const Layout: FC<{ children: ReactNode }> = ({children}) => {
    return <>
        <NavBar/>
        <CustomizedSnackBar/>
        {children}
    </>
}
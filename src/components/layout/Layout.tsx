import React, {FC} from "react";
import {NavBar} from "./NavBar";
import {Container} from "@mui/material";

export const Layout: FC = ({children}) => {
    return <>
        <NavBar/>
        <Container>
            {children}
        </Container>
    </>
}

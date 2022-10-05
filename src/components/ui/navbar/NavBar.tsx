import React, {FC} from 'react'
import {AppBar, Box, Button, Container, IconButton, Toolbar} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import styles from './NavBar.module.scss';
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {AuthThunkCreators} from "../../../store/auth/auth.actions";

export const NavBar: FC = () => {
    const dispatch = useAppDispatch()
    const {isAuth} = useTypedSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(AuthThunkCreators.logout())
    }

    return <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Container fixed>
                <div className={styles.flex}>
                    <IconButton
                        size='large'
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    {isAuth && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
                </div>
            </Container>
        </AppBar>
    </Box>
}

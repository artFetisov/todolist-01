import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {FC} from "react";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {setAppError} from "../../../store/app/app.slice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomizedSnackBar: FC = () => {
    const error = useTypedSelector(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppError(null))
    };

    const isOpen = error !== null

    return (
        <Stack spacing={6} sx={{width: '100%'}}>
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

import React, {FC} from "react";
import styles from './LoginForm.module.scss';
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthData} from "../../../types/auth.types";
import {validEmail} from "../../../utils/regex";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {AuthThunkCreators} from "../../../store/auth/auth.actions";

export const LoginForm: FC = () => {
    const dispatch = useAppDispatch()
    const {register, formState: {errors}, reset, handleSubmit} = useForm<IAuthData>()

    const onSubmit: SubmitHandler<IAuthData> = (data) => {
        const {email, password, rememberMe} = data
        dispatch(AuthThunkCreators.login(email, password, rememberMe))

        if (!errors) reset()
    }

    return <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3 style={{textAlign: 'center'}}>Вход в приложение</h3>
            <TextField
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: validEmail,
                        message: 'Please enter a valid email',
                    },
                })}

                id="email"
                autoFocus
                error={!!errors.email}
                label={'email'}
                variant="outlined"
                helperText={errors.email?.message || ''}
                color={'primary'}
                style={{marginTop: '20px', width: '100%'}}
            />


            <TextField
                {...register(
                    'password', {
                        required: 'Password is required!',
                        minLength: {
                            value: 2,
                            message: 'Min length should more 2 symbols!',
                        }
                    })}
                id="password"
                type={'password'}
                error={!!errors.password}
                label={'password'}
                variant="outlined"
                helperText={errors.password?.message || ''}
                color={'primary'}
                style={{marginTop: '20px', width: '100%'}}
            />


            <FormControlLabel control={<Checkbox/>} label="Запомнить меня"  {...register('rememberMe')}
                              style={{marginTop: '10px'}} id={'rememberMe'}/>


            <Button
                type={'submit'}
                variant="contained"
                color='success'
                size={'large'}
                style={{width: '100%', marginTop: '10px'}}
            >
                Войти
            </Button>

        </form>
    </div>
}
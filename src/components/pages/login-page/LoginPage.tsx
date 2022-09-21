import React, {FC} from "react";
import styles from '../../ui/login-form/LoginForm.module.scss';
import {LoginForm} from "../../ui/login-form/LoginForm";

export const LoginPage: FC = () => {
    return <div className={styles.wrapper}>
        <LoginForm/>
    </div>
}
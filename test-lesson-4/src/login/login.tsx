import React from 'react';
import LoginForm, { CaptchaPropsType } from './loginForm';
import { reduxForm } from 'redux-form';
import styles from './login.module.css';

type PropsType = {
    ExitThunk: () => void,
    loginToThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void,
    isAuth: boolean,
    captchaUrl: string
}

const LoginReduxForm = reduxForm<LoginFromValuesType, CaptchaPropsType>({
    form: 'login'
})(LoginForm)

export type LoginFromValuesType = {
    login: string
    password: string
    rememberMe: boolean
    captchaUrl: string
}

const Login: React.FC<PropsType> = (props) => {

    const onSubmit = (formData: LoginFromValuesType) => {
        console.log(formData);
        props.loginToThunk(formData.login, formData.password, formData.rememberMe, formData.captchaUrl);
    }

    const ExitAccount = () => {
        props.ExitThunk();
    }

    return (
        <div>

                {props.isAuth ?
                    (<h1 className={styles.exit} onClick={ExitAccount}>
                        Log Out
                    </h1>)
                    :
                    (
                        <div>
                            <h1>
                                Login
                            </h1>
                            <LoginReduxForm 
                                captchaUrl={props.captchaUrl} 
                                onSubmit={onSubmit} />
                        </div>
                    )
                }
        </div>
    );
}

export default Login;
import React from 'react';
import LoginForm, { CaptchaPropsType } from './loginForm';
import { reduxForm } from 'redux-form';
import styles from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../Redux/Redux-store';
import { ExitThunkCreator, loginToThunkCreator } from '../Redux/auth-reducer';

type PropsType = {
    
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

    const isAuth = useSelector((state: AppStateType )=> state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    
    const dispatch = useDispatch()
    const onSubmit = (formData: LoginFromValuesType) => {
        console.log(formData);
        dispatch(loginToThunkCreator(formData.login, formData.password, formData.rememberMe, formData.captchaUrl));
    }

    const ExitAccount = () => {
        dispatch(ExitThunkCreator())
    }

    return (
        <div>
            {isAuth ?
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
                            captchaUrl={captchaUrl}
                            onSubmit={onSubmit} />
                    </div>
                )
            }
        </div>
    );
}

export default Login;
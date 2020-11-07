import React from 'react';
import LoginForm from './loginForm';
import { reduxForm } from 'redux-form';
import styles from './login.module.css';


const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData);
        props.loginToThunk(formData.login, formData.password, formData.rememberMe);
    }

    const ExitAccount = () => {
        props.ExitThunk();
    }

    return (
        <div>

                {props.isAuth ?
                    (<h1 className={styles.exit} onClick={ExitAccount}>
                        Exit
                    </h1>)
                    :
                    (
                        <div>
                            <h1>
                                Login
                            </h1>
                            <LoginReduxForm onSubmit={onSubmit} />
                        </div>
                    )
                }
        </div>
    );
}

export default Login;
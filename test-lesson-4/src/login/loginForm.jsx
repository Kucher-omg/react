import React from 'react';
import { Field } from 'redux-form';


const LoginForm = (props) => {
    return (
        <div>
            <form onSubmit = {props.handleSubmit}>
                <div>
                    <Field type="text" name={'login'} component='input' placeholder={'Login'} />
                    {/* <input type="text" placeholder={'Login'}/> */}
                </div>
                <div>
                    <Field type="text" name={'password'} component='input' placeholder={'Password'} />
                    {/* <input type="text" placeholder={'password'}/> */}
                </div>
                <div>
                    <Field type="checkbox" name={'rememberMe'} component='input' />
                        Remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
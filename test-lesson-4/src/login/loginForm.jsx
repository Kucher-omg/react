import React from 'react';
import { Field } from 'redux-form';
import { InputText } from '../components/common/FormControls/FormControls';
import { requiredField } from '../Utils/Validators/validstors';


const LoginForm = (props) => {
    return (
        <div>
            <form onSubmit = {props.handleSubmit}>
                <div>
                    <Field type="text" validate={[requiredField]} name={'login'} component={InputText} placeholder={'Login'} />
                </div>
                <div>
                    <Field type="text" validate={[requiredField]} name={'password'} component={InputText} placeholder={'Password'} />
                </div>
                <div>
                    <Field type="checkbox" name={'rememberMe'} component={InputText} />
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
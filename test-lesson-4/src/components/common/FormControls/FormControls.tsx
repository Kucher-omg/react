import React from 'react';
import classes from './FormControls.module.css';

type MetaType = {
    touched: boolean,
    error: any
}

type FormControlType = {
    meta: MetaType,
    children: any
}

const FormControl: React.FC<FormControlType> =  (props)  => {
    const isError = props.meta.touched && props.meta.error;
    return (
        <div className={classes.form_control + ' ' + (isError ? classes.error : '')}>
            {props.children}
            <div>
                { isError &&
                    <span>
                        {props.meta.error}
                    </span>
                }
            </div>
        </div>
    );
}
 
type TextAreaType = {
    input: any,
    meta: any
}
export const TextArea: React.FC<TextAreaType> = (props) => {
    const { input, meta, ...restProps } = props;
    return (<FormControl {...props}><textarea {...input} {...restProps} /></FormControl>)
}

type InputTextType = {
    input: any,
    meta: any
}
export const InputText: React.FC<InputTextType> = (props) => {
    const { input, meta, ...restProps } = props;
    return (<FormControl {...props}><input {...input} {...restProps} /></FormControl>)
}
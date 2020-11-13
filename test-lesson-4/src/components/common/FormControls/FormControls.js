import React from 'react';
import classes from './FormControls.module.css';

const FormControl =  ({ input, meta, child, ...props })  => {
    const isError = meta.touched && meta.error;
    return (
        <div className={classes.form_control + ' ' + (isError ? classes.error : '')}>
            {props.children}
            <div>
                { isError &&
                    <span>
                        {meta.error}
                    </span>
                }
            </div>
        </div>
    );
}
 
export const TextArea = (props) => {
    const { input, meta, ...restProps } = props;
    return (<FormControl {...props}><textarea {...input} {...restProps} /></FormControl>)
}

export const InputText = (props) => {
    const { input, meta, ...restProps } = props;
    return (<FormControl {...props}><input {...input} {...restProps} /></FormControl>)
}
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Message.module.css';

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props) =>{
    return (
        <div>
            <div className={classes.message}>{props.message}</div>
        </div>
    );
}

export default Message;
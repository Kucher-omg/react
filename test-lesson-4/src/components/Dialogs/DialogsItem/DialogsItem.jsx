import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.css';

const DialogItem = (props) => {
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink className={classes.dialog + ' ' + classes.active} to={"/dialogs/" + props.id}>
                {props.name}
            </NavLink>
 
        </div>
    );
}

export default DialogItem;
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.css';

type PropsType = {
    name: string,
    id: number
}

const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink className={classes.dialog + ' ' + classes.active} to={"/dialogs/" + props.id}>
                {props.name}
            </NavLink>
 
        </div>
    );
}

export default DialogItem;
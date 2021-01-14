import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { MessagesDataType } from '../../../api/api';
import classes from './Message.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../Redux/Redux-store';
import { deleteMessageThunk } from '../../../Redux/dialogs-reducer';



const Message: React.FC<{message: MessagesDataType}> = ({message}) =>{

    const authUserId = useSelector<AppStateType, number>((state: AppStateType) => state.auth.id)
    const dispatch = useDispatch()

    const chooseMessage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
        if(e.button === 0){
            // alert(`Hello darling ${id}`)
             dispatch(deleteMessageThunk(id))
        }
    }

    return (
        <div className={
            cn({[classes.messageFromUser]: message.recipientId === authUserId,
                [classes.yourMessage]: message.recipientId !== authUserId})
            }
            onMouseUp={(e) => chooseMessage(e, message.id)}
            >
            {message.body}
        </div>
    );
}

export default Message;
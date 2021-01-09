import React from 'react';
import classes from './Dialog.module.css';
import DialogItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';
import {  reduxForm , reset } from 'redux-form'
import MessageSendForm from './MessageSend';
import { DialogsType, MessageType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../Redux/Redux-store';
import { actions } from '../../Redux/dialogs-reducer';
import { AuthRedirect } from '../../hoc/AuthRedirect';
import { compose } from 'redux';

let MessageSend = reduxForm<MessageValuesType>({
    form: 'messagesend'
})(MessageSendForm)

export type MessageValuesType = {
    message: string
}

const Dialogs: React.FC = (props) => {

    const state = useSelector((state: AppStateType) => state.messagesPage)
    const dispatch = useDispatch()

    let dialogsElement = state.dialogsData
    .map((dialog: DialogsType) => (<DialogItem name={dialog.name} id={dialog.id} />));
    
    let messagesElement = state.messageData
    .map((message: MessageType) => (<Message message={message.message} />));

    const onSubmit = (formData: MessageValuesType, dispatch: any) => {
        dispatch( actions.AddMessageActionCreator(formData.message));
        dispatch(reset('messagesend'));
    }
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs_item}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                {messagesElement}
                <MessageSend onSubmit={onSubmit}/>
            </div>
        </div>
    );
}
export default compose<React.ComponentType>(
    AuthRedirect
)
(Dialogs);

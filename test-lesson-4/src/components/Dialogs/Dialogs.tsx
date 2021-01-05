import React from 'react';
import classes from './Dialog.module.css';
import DialogItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';
import {  reduxForm , reset } from 'redux-form'
import MessageSendForm from './MessageSend';
import { DialogsType, MessageType } from '../../types/types';

let MessageSend = reduxForm<MessageValuesType>({
    form: 'messagesend'
    
})(MessageSendForm)

type GialodsStateType = {
    dialogsData: Array<DialogsType>,
    messageData: Array<MessageType>
}

type PropsType = {
    state: GialodsStateType,
    AddMessage: (text: string) => void
}

export type MessageValuesType = {
    message: string
}

const Dialogs: React.FC<PropsType> = (props) => {
    let dialogsElement = props.state.dialogsData
    .map(dialog => (<DialogItem name={dialog.name} id={dialog.id} />));
    
    let messagesElement = props.state.messageData
    .map(message => (<Message message={message.message} />));

    const onSubmit = (formData: MessageValuesType, dispatch: any) => {
        props.AddMessage(formData.message);
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
export default Dialogs;
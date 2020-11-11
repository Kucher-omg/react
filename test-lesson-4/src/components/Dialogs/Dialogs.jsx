import React from 'react';
import classes from './Dialog.module.css';
import DialogItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';
import {  reduxForm , reset } from 'redux-form'
import MessageSendForm from './MessageSend';

let MessageSend = reduxForm({
    // a unique name for the form
    form: 'messagesend'
    
  })(MessageSendForm)


const Dialogs = (props) => {



    let dialogsElement = props.state.dialogsData.map(dialog => (<DialogItem name={dialog.name} id={dialog.id} />));
    let messagesElement = props.state.messageData.map(message => (<Message message={message.message} />));


    const onSubmit = (formData) => {
        console.log(formData.message);
        props.AddMessage(formData.message);
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
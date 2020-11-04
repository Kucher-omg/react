import React from 'react';
import { Redirect } from 'react-router-dom';
import { AddMessageActionCreator, OnTextChangeActionCreator } from './../../Redux/dialogs-reducer';
import classes from './Dialog.module.css';
import DialogItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';





const Dialogs = (props) => {



    let dialogsElement = props.state.dialogsData.map(dialog => (<DialogItem name={dialog.name} id={dialog.id} />));
    let messagesElement = props.state.messageData.map(message => (<Message message={message.message} />));

    let  RefMessage = React.createRef();
    
    let onAddMessage = () => {
        props.AddMessage();
    }   
    
    
    let onTextChange = () => {
        let text = RefMessage.current.value; 
        props.OnTextChangeAction(text);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs_item}>

                {dialogsElement}

            </div>
            <div className={classes.messages}>

                {messagesElement}

                <div>
                    <textarea onChange={onTextChange} ref={RefMessage} value={props.state.newMessText} />
                </div>

                <div>
                    <button onClick={onAddMessage}>Add</button>
                </div>
            </div>

        </div>
    );
}

export default Dialogs;
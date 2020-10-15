import React from 'react';
import { AddMessageActionCreator, OnTextChangeActionCreator } from './../../Redux/State';
import classes from './Dialog.module.css';
import DialogItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';





const Dialogs = (props) => {



    let dialogsElement = props.state.dialogsData.map(dialog => (<DialogItem name={dialog.name} id={dialog.id} />));
    let messagesElement = props.state.messageData.map(message => (<Message message={message.message} />));

    let  RefMessage = React.createRef();
    
    let AddMessage = () => {
        let action = AddMessageActionCreator();
        props.dispatch(action);
    }   
    // fakeAction();
    
    let onTextChange = () => {
        fake
        let text = RefMessage.current.value; 
        let action = OnTextChangeActionCreator(text);
        props.dispatch(action);
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
                    <button onClick={AddMessage}>Add</button>
                </div>
            </div>

        </div>
    );
}

export default Dialogs;
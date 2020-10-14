import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Dialog.module.css';
import DialogItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';




const Dialogs = (props) => {



    let dialogsElement = props.state.dialogsData.map(dialog => (<DialogItem name={dialog.name} id={dialog.id} />));
    let messagesElement = props.state.messageData.map(message => (<Message message={message.message} />));

    let  RefMessage = React.createRef();

    let AddMessage = () => {
        let action = {type: 'ADD-MESSAGES'};
        props.dispatch(action);
    }

    let onTextChange = () => {
        let text = RefMessage.current.value; 
        let action = {type: 'UPDATE-NEW-MESS-TEXT', newText: text};
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
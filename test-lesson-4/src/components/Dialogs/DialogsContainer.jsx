import React from 'react';
import { AddMessageActionCreator, OnTextChangeActionCreator } from '../../Redux/dialogs-reducer';
import Dialogs from './Dialogs';



const DialogsContainer = (props) => {

    let state = props.store.getState();

    let onAddMessage = () => {
        let action = AddMessageActionCreator();
        props.store.dispatch(action);
    }   
    
    
    let onTextChange = (text) => {
        let action = OnTextChangeActionCreator(text);
        props.store.dispatch(action);
    }

    return ( <Dialogs state={state.messagesPage}  AddMessage={onAddMessage} OnTextChangeAction={onTextChange}/> );
}

export default DialogsContainer;
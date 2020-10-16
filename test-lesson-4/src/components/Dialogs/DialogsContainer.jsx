import React from 'react';
import { AddMessageActionCreator, OnTextChangeActionCreator } from '../../Redux/dialogs-reducer';
import Dialogs from './Dialogs';
import StoreContext from './../../Redux/StoreContext';


const DialogsContainer = () => {

    


    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();

                    let onAddMessage = () => {
                        let action = AddMessageActionCreator();
                        store.dispatch(action);
                    }


                    let onTextChange = (text) => {
                        let action = OnTextChangeActionCreator(text);
                        store.dispatch(action);
                    }
                    return (<Dialogs state={state.messagesPage} AddMessage={onAddMessage} OnTextChangeAction={onTextChange} />);
                }
            }

        </StoreContext.Consumer>
    )

}

export default DialogsContainer;
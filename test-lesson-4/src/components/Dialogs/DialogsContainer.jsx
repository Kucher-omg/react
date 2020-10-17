import React from 'react';
import { connect } from 'react-redux';
import { AddMessageActionCreator, OnTextChangeActionCreator } from '../../Redux/dialogs-reducer';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
    return {
        state: state.messagesPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        AddMessage: () => {
            let action = AddMessageActionCreator();
            dispatch(action);
        },
        OnTextChangeAction: (text) => {
            let action = OnTextChangeActionCreator(text);
            dispatch(action);
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AuthRedirect } from '../../hoc/AuthRedirect';
import { AddMessageActionCreator, OnTextChangeActionCreator } from '../../Redux/dialogs-reducer';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
    return {
        state: state.messagesPage
    }
}

let authRedirectComponent = AuthRedirect(Dialogs);


const DialogsContainer = connect(mapStateToProps, {
    AddMessage: AddMessageActionCreator,
    OnTextChangeAction: OnTextChangeActionCreator
})(authRedirectComponent);

export default DialogsContainer;
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AuthRedirect } from '../../hoc/AuthRedirect';
import { AddMessageActionCreator } from '../../Redux/dialogs-reducer';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
    return {
        state: state.messagesPage
    }
}

export default compose(
    connect(mapStateToProps, {
        AddMessage: AddMessageActionCreator
    }),
    AuthRedirect
)
(Dialogs);

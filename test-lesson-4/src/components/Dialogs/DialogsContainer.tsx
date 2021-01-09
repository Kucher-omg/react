import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AuthRedirect } from '../../hoc/AuthRedirect';
import { actions } from '../../Redux/dialogs-reducer';
import { AppStateType } from '../../Redux/Redux-store';
import Dialogs from './Dialogs';

type MapStateToPropsType = {
    state: object
}
 
type MapDispatchToPropsType = {
    AddMessage: (text: string) => void
}

type OwnType = {

}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnType;

let mapStateToProps = (state: AppStateType) => {
    return {
        state: state.messagesPage
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnType, AppStateType>(
        mapStateToProps, 
    {
        AddMessage: actions.AddMessageActionCreator
    }),
    AuthRedirect
)
(Dialogs);

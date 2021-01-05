import { AppStateType } from '../Redux/Redux-store';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

type PropsType = {
    isAuth: boolean
}

let mapStateToPropsRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function AuthRedirect<WCP>(Component: React.ComponentType<WCP>) {

    let RedirectComponent: React.FC<PropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (props.isAuth === false) {
            return <Redirect to='/login' />
        }
        return <Component {...restProps as WCP} />
    }

    let ConnectedRedirectComponent =
        connect<PropsType, {}, WCP, AppStateType>(
            mapStateToPropsRedirect
        )(RedirectComponent);
    return ConnectedRedirectComponent;
}
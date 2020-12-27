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

export const AuthRedirect = (Component: any) => {
    
    let RedirectComponent: React.FC<PropsType> = (props) => {
        if (props.isAuth === false) {
            return <Redirect to='/login' />
        }
        return <Component {...props} />
    }

    let ConnectedRedirectComponent = connect<PropsType>(mapStateToPropsRedirect)(RedirectComponent);
    return ConnectedRedirectComponent;
}
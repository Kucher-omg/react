import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

let mapStateToPropsRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const AuthRedirect = (Component) => {
    
    let RedirectComponent = (props) => {
        if (props.isAuth === false) {
            return <Redirect to='/login' />
            
        }
        return <Component {...props} />
    }

    let ConnectedRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent);
    

    return ConnectedRedirectComponent;
}
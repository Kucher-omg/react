import React from 'react';
import { connect } from 'react-redux';
import { FolloweAC, UnFolloweAC, SetUsersAC } from '../../Redux/users-reducer';
import Users from './Users';

let mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData
    }
}
 
let mapDispatchToProps = (dispatch) => {
    return{
        follow: (UserId) => {
            
            dispatch(FolloweAC(UserId));
        },
        unfollow: (UserId) => {
            dispatch(UnFolloweAC(UserId));
        },
        SetUsers: (usersData) => {
            dispatch(SetUsersAC(usersData));
        }
        
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Users);
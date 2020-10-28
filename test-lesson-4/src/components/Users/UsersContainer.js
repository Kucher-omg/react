import React from 'react';
import { connect } from 'react-redux';
import { FolloweAC, UnFolloweAC, SetUsersAC, setCurrentPageAC, SetUsersSizeAC } from '../../Redux/users-reducer';
import Users from './Users';

let mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
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
        },
        
        setCurrentPage: (page) => {
            dispatch(setCurrentPageAC(page));
        },
        SetUsersSize: (count) => {
            dispatch(SetUsersSizeAC(count));
        }
        
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Users);
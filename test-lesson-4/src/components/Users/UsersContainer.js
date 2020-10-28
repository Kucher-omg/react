import React from 'react';
import { connect } from 'react-redux';
import { FolloweAC, UnFolloweAC, SetUsersAC, setCurrentPageAC, SetUsersSizeAC } from '../../Redux/users-reducer';
import Users from './Users';
import * as axios from 'axios';


class UsersApiComponent extends React.Component {

    componentDidMount() {
        
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.SetUsers(response.data.items);
                debugger;
                this.props.SetUsersSize(response.data.totalCount);
            });
    }

    onPageChanged = (p) => {
        this.props.setCurrentPage(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.SetUsers(response.data.items);
            });
    }

    render() {
        return (<Users 
            totalUsersCount = {this.props.totalUsersCount}
            pageSize = {this.props.pageSize}
            currentPage = {this.props.currentPage}
            onPageChanged = {this.onPageChanged}
            usersData = {this.props.usersData}
            unfollow = {this.props.unfollow}
            follow = {this.props.follow}/>);
    }
}


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

export default connect (mapStateToProps, mapDispatchToProps)(UsersApiComponent);
import React from 'react';
import { connect } from 'react-redux';
import { FolloweAC, UnFolloweAC, SetUsersAC, isFetchingAC, setCurrentPageAC, SetUsersSizeAC, isFollowingInProgressAC } from '../../Redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {usersAPI} from '../../api/api';


class UsersApiComponent extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
        .then(promise => {
                this.props.toggleIsFetching(false);
                this.props.SetUsers(promise.items);
                });
    }
    

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        usersAPI.getUsers(pageNumber, this.props.pageSize)
        .then(promise => {
                this.props.toggleIsFetching(false);
                this.props.SetUsers(promise.items);
            });
    }

    render() {

        return (
            <>
            
                {this.props.isFetching ? < Preloader /> : null}
                
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    usersData={this.props.usersData}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow} 
                    isfollowingInProgress = {this.props.isfollowingInProgress}
                    followingInProgress= {this.props.followingInProgress}/>
            </>);
    }
}

 
let mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export default connect(mapStateToProps, {
    follow: FolloweAC,
    unfollow: UnFolloweAC,
    SetUsers: SetUsersAC,
    setCurrentPage: setCurrentPageAC,
    SetUsersSize: SetUsersSizeAC,
    toggleIsFetching: isFetchingAC,
    isfollowingInProgress: isFollowingInProgressAC
})(UsersApiComponent);
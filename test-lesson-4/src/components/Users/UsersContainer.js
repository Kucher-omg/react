import React from 'react';
import { connect } from 'react-redux';
import { FolloweAC, UnFolloweAC, setCurrentPageAC, isFollowingInProgressAC, getUsersThunkCreator, followThunkCreator, unfollowThunkCreator } from '../../Redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { AuthRedirect } from '../../hoc/AuthRedirect';


class UsersApiComponent extends React.Component {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }
    

    onPageChanged = (pageNumber) => {
        this.props.getUsersThunk(pageNumber, this.props.pageSize);
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
                    followThunk={this.props.followThunk}
                    unfollowThunk={this.props.unfollowThunk}
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

let UsersApiComponentRedirect = AuthRedirect(UsersApiComponent);

export default connect(mapStateToProps, {
    setCurrentPage: setCurrentPageAC,
    isfollowingInProgress: isFollowingInProgressAC,
    getUsersThunk: getUsersThunkCreator,
    followThunk: followThunkCreator,
    unfollowThunk: unfollowThunkCreator
})(UsersApiComponentRedirect);
import { UsersDataType } from '../../types/types';
import React from 'react';
import { connect } from 'react-redux';
import { getUsersThunkCreator, followThunkCreator, unfollowThunkCreator, FilterType } from '../../Redux/users-reducer';
import Users from './Users';
import { compose } from 'redux';
import { getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getCurrentPage, getFilter } from '../../Redux/users-selectors';
import Preloader from '../common/Preloader/Preloader';
import { AppStateType } from '../../Redux/Redux-store';
import { getPositionOfLineAndCharacter } from 'typescript';

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    usersData: Array<UsersDataType>,
    followingInProgress: Array<number>,
    filter: FilterType
}

type MapDispatchPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number, filter: FilterType) => void,
    followThunk: (id: number) => void,
    unfollowThunk: (id: number) => void
}

type OwnPropsType = {
    
}

type PropsType = OwnPropsType & MapDispatchPropsType & MapStatePropsType;

class UsersApiComponent extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize, this.props.filter);
    }
    

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props;
        this.props.getUsersThunk(pageNumber, pageSize, filter);
    }

    onFilterChange = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.getUsersThunk(1, pageSize, filter);
    }

    render() {
        return (
            <div>
                {this.props.isFetching ? < Preloader /> : null}
                
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    usersData={this.props.usersData}
                    onFilterChange={this.onFilterChange}
                    followThunk={this.props.followThunk}
                    unfollowThunk={this.props.unfollowThunk}
                    followingInProgress= {this.props.followingInProgress}/>
            </div>);
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        usersData: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getFilter(state)
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
    {
        getUsersThunk: getUsersThunkCreator,
        followThunk: followThunkCreator,
        unfollowThunk: unfollowThunkCreator
    })
)
(UsersApiComponent);

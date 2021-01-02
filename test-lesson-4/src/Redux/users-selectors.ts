import { AppStateType } from './Redux-store';
import { createSelector } from "reselect";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage;
}

export const getUsers = createSelector( getUsersSelector, 
    (data) => {
        return data.usersData;
})
 

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}


export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}


import { UsersDataType, followingInProgressType } from './../types/types';


import { usersAPI } from "../api/api";
import { userMapHelper } from "../Utils/objects-helper";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENTPAGE = 'SET_CURRENTPAGE';
const SET_USERS_SIZE = 'SET_USERS_SIZE';
const IS_FETCHING = 'IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';



let initialState = {
    usersData: [] as Array<UsersDataType>,
    pageSize: 5,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<followingInProgressType>
};

type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): initialStateType => {

    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                usersData: userMapHelper(state.usersData, action.UserId, 'id', { followed: true })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                usersData: userMapHelper(state.usersData, action.UserId, 'id', { followed: false })
            }
        }
        case SET_USERS: {
            return { ...state, usersData: action.usersData }
        }
        case SET_CURRENTPAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_USERS_SIZE: {
            return { ...state, totalUsersCount: action.UsersSize }
        }
        case IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id != action.id)
            }
        }
        default:
            return state;
    }

}
type FolloweACType = {
    type: typeof FOLLOW,
    UserId: number
}
export const FolloweAC = (UserId: number): FolloweACType => {
    return {
        type: FOLLOW, UserId
    }
}

type setCurrentPageACType = {
    type: typeof SET_CURRENTPAGE,
    currentPage: number
}
export const setCurrentPageAC = (currentPage: number): setCurrentPageACType => {
    return {
        type: SET_CURRENTPAGE, currentPage
    }
}

type UnFolloweACType = {
    type: typeof UNFOLLOW,
    UserId: number
}
export const UnFolloweAC = (UserId: number): UnFolloweACType => {
    return {
        type: UNFOLLOW, UserId
    }
}

type SetUsersACType = {
    type: typeof SET_USERS,
    usersData: UsersDataType
}
export const SetUsersAC = (usersData: UsersDataType): SetUsersACType => {
    return {
        type: SET_USERS, usersData
    }
}

type SetUsersSizeACType = {
    type: typeof SET_USERS_SIZE,
    UsersSize: number
}
export const SetUsersSizeAC = (UsersSize: number): SetUsersSizeACType => {
    return {
        type: SET_USERS_SIZE, UsersSize
    }
}

type isFetchingACType = {
    type: typeof IS_FETCHING,
    isFetching: boolean
}
export const isFetchingAC = (isFetching: boolean): isFetchingACType => {
    return {
        type: IS_FETCHING, isFetching
    }
}

type isFollowingInProgressACType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress: boolean,
    id: number
}
export const isFollowingInProgressAC = (followingInProgress: boolean, id: number): isFollowingInProgressACType => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, id
    }
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {

    return async (dispatch: any) => {
        dispatch(isFetchingAC(true));
        dispatch(setCurrentPageAC(currentPage));

        let promise = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(isFetchingAC(false));
        dispatch(SetUsersSizeAC(promise.totalCount));
        dispatch(SetUsersAC(promise.items));
    }
}

const followUnfollowFlow = async (dispatch: any, id: number, method: any, action: any) => {

    dispatch(isFollowingInProgressAC(true, id));
    let promise = await method(id);
    if (promise.resultCode === 0) {
        dispatch(action(id));
    }
    dispatch(isFollowingInProgressAC(false, id));
}

export const followThunkCreator = (id: number) => async (dispatch: any) => {
    const method = usersAPI.setFollow.bind(usersAPI);
    const action = FolloweAC;

    followUnfollowFlow(dispatch, id, method, action);

}


export const unfollowThunkCreator = (id: number) => async (dispatch: any) => {
    const method = usersAPI.setUnfollow.bind(usersAPI);
    const action = UnFolloweAC;

    followUnfollowFlow(dispatch, id, method, action);
}


export default usersReducer;
import { AppStateType } from './Redux-store';
import { UsersDataType, followingInProgressType } from './../types/types';


import { ResultCodesEnum, usersAPI } from "../api/api";
import { userMapHelper } from "../Utils/objects-helper";
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENTPAGE = 'SET_CURRENTPAGE';
const SET_USERS_SIZE = 'SET_USERS_SIZE';
const IS_FETCHING = 'IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

type ActionsTypes = FolloweACType |
    setCurrentPageACType | UnFolloweACType |
    SetUsersACType | SetUsersSizeACType |
    isFetchingACType | isFollowingInProgressACType;

let initialState = {
    usersData: [] as Array<UsersDataType>,
    pageSize: 5,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {

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
            return {
                ...state,
                usersData: [...action.usersData]
            }
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
    usersData: Array<UsersDataType>
}

export const SetUsersAC = (usersData: Array<UsersDataType>): SetUsersACType => {
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

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsersThunkCreator = (currentPage: number,
    pageSize: number): ThunkType => {

    return async (dispatch, getState) => {
        dispatch(isFetchingAC(true));
        dispatch(setCurrentPageAC(currentPage));

        let promise = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(isFetchingAC(false));
        dispatch(SetUsersSizeAC(promise.totalCount));
        dispatch(SetUsersAC(promise.items));
    }
}

const followUnfollowFlow = async (dispatch: DispatchType, id: number, method: any, action: any) => {

    dispatch(isFollowingInProgressAC(true, id));
    let promise = await method(id);
    if (promise.resultCode === ResultCodesEnum.Success) {
        dispatch(action(id));
    }
    dispatch(isFollowingInProgressAC(false, id));
}

export const followThunkCreator = (id: number): ThunkType =>
    async (dispatch) => {
        const method = usersAPI.setFollow.bind(usersAPI);
        const action = FolloweAC;

        followUnfollowFlow(dispatch, id, method, action);

    }


export const unfollowThunkCreator = (id: number): ThunkType =>
    async (dispatch) => {
        const method = usersAPI.setUnfollow.bind(usersAPI);
        const action = UnFolloweAC;

        followUnfollowFlow(dispatch, id, method, action);
    }


export default usersReducer;
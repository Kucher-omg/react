import { AppStateType, InferActionsTypes } from './Redux-store';
import { UsersDataType, followingInProgressType } from './../types/types';
import { ResultCodesEnum, usersAPI } from "../api/api";
import { userMapHelper } from "../Utils/objects-helper";
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

type ActionsTypes = InferActionsTypes<typeof actions>

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
        case 'FOLLOW': {
            return {
                ...state,
                usersData: userMapHelper(state.usersData, action.UserId, 'id', { followed: true })
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                usersData: userMapHelper(state.usersData, action.UserId, 'id', { followed: false })
            }
        }
        case 'SET_USERS': {
            return {
                ...state,
                usersData: [...action.usersData]
            }
        }
        case 'SET_CURRENTPAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'SET_USERS_SIZE': {
            return { ...state, totalUsersCount: action.UsersSize }
        }
        case 'IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

export const actions = {
    FolloweAC: (UserId: number) => {
        return {
            type: 'FOLLOW', UserId
        }as const
    },
    setCurrentPageAC: (currentPage: number) => {
        return {
            type: 'SET_CURRENTPAGE', currentPage 
        } as const
    },
    UnFolloweAC: (UserId: number) => {
        return {
            type: 'UNFOLLOW', UserId
        }as const
    },
    SetUsersAC: (usersData: Array<UsersDataType>) => {
        return {
            type: 'SET_USERS', usersData
        }as const
    },
    SetUsersSizeAC: (UsersSize: number) => {
        return {
            type: 'SET_USERS_SIZE', UsersSize
        }as const
    },
    isFetchingAC: (isFetching: boolean) => {
        return {
            type: 'IS_FETCHING', isFetching
        }as const
    },
    isFollowingInProgressAC: (followingInProgress: boolean, id: number) => {
        return {
            type: 'TOGGLE_IS_FOLLOWING_PROGRESS', followingInProgress, id
        }as const
    }
}

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsersThunkCreator = (currentPage: number,
    pageSize: number): ThunkType => {

    return async (dispatch, getState) => {
        dispatch(actions.isFetchingAC(true));
        dispatch(actions.setCurrentPageAC(currentPage));

        let promise = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(actions.isFetchingAC(false));
        dispatch(actions.SetUsersSizeAC(promise.totalCount));
        dispatch(actions.SetUsersAC(promise.items));
    }
}

const followUnfollowFlow = async (dispatch: DispatchType, id: number, method: any, action: any) => {

    dispatch(actions.isFollowingInProgressAC(true, id));
    let promise = await method(id);
    if (promise.resultCode === ResultCodesEnum.Success) {
        dispatch(action(id));
    }
    dispatch(actions.isFollowingInProgressAC(false, id));
}

export const followThunkCreator = (id: number): ThunkType =>
    async (dispatch) => {
        const method = usersAPI.setFollow.bind(usersAPI);
        const action = actions.FolloweAC;

        followUnfollowFlow(dispatch, id, method, action);

    }


export const unfollowThunkCreator = (id: number): ThunkType =>
    async (dispatch) => {
        const method = usersAPI.setUnfollow.bind(usersAPI);
        const action = actions.UnFolloweAC;

        followUnfollowFlow(dispatch, id, method, action);
    }


export default usersReducer;
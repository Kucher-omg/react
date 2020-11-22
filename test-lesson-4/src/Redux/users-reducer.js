import { usersAPI } from "../api/api";
import { userMapHelper } from "../Utils/objects-helper";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENTPAGE = 'SET_CURRENTPAGE';
const SET_USERS_SIZE = 'SET_USERS_SIZE';
const IS_FETCHING = 'IS_FETCHING';//preloader
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                usersData: userMapHelper(state.usersData, action.UserId, 'id', {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                usersData: userMapHelper(state.usersData, action.UserId, 'id', {followed: false})
            }
        }
        case SET_USERS: {
            // debugger;
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

export const FolloweAC = (UserId) => {
    return {
        type: FOLLOW, UserId
    }
}

export const setCurrentPageAC = (currentPage) => {
    return {
        type: SET_CURRENTPAGE, currentPage
    }
}

export const UnFolloweAC = (UserId) => {
    return {
        type: UNFOLLOW, UserId
    }
}

export const SetUsersAC = (usersData) => {
    return {
        type: SET_USERS, usersData
    }
}

export const SetUsersSizeAC = (UsersSize) => {
    return {
        type: SET_USERS_SIZE, UsersSize
    }
}

export const isFetchingAC = (isFetching) => {
    return {
        type: IS_FETCHING, isFetching
    }
}

export const isFollowingInProgressAC = (followingInProgress, id) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, id
    }
}

export const getUsersThunkCreator = (currentPage, pageSize) => {

    return async (dispatch) => {
        dispatch(isFetchingAC(true));
        dispatch(setCurrentPageAC(currentPage));

        let promise = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(isFetchingAC(false));
        dispatch(SetUsersAC(promise.items));
    }
}

const followUnfollowFlow = async (dispatch, id, method, action) => {

    dispatch(isFollowingInProgressAC(true, id));
    let promise = await method(id);
    if (promise.resultCode === 0) {
        dispatch(action(id));
    }
    dispatch(isFollowingInProgressAC(false, id));
}

export const followThunkCreator = (id) => {

    return async (dispatch) => {
        const method = usersAPI.setFollow.bind(usersAPI);
        const action = FolloweAC;

        followUnfollowFlow(dispatch, id, method, action);

    }
}

export const unfollowThunkCreator = (id) => {

    return async (dispatch) => {
        const method = usersAPI.setUnfollow.bind(usersAPI);
        const action = UnFolloweAC;

        followUnfollowFlow(dispatch, id, method, action);
    }
}

export default usersReducer;
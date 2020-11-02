const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENTPAGE = 'SET_CURRENTPAGE';
const SET_USERS_SIZE = 'SET_USERS_SIZE';
const IS_FETCHING = 'IS_FETCHING';
 

let initialState = {
    usersData : [ ],
    pageSize: 5,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: false
};
 
const usersReducer = (state = initialState, action) => {

    switch(action.type){
        case FOLLOW:{
            return {
                ...state,
                // usersData: [...state.usersData]
                usersData: state.usersData.map( u => {
                    if(u.id === action.UserId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        }
        case UNFOLLOW:{
            return {
                ...state,
                // usersData: [...state.usersData]
                usersData: state.usersData.map( u => {
                    if(u.id === action.UserId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        }
        case SET_USERS:{
            // debugger;
            return { ...state, usersData: action.usersData }
        }
        case SET_CURRENTPAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_USERS_SIZE: {
            return {...state, totalUsersCount: action.UsersSize}
        }
        case IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
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
    return{
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
    return{
        type: SET_USERS_SIZE, UsersSize
    }
}

export const isFetchingAC = (isFetching) => {
    return{
        type: IS_FETCHING, isFetching
    }
}

export default usersReducer;
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';


let initialState = {
    usersData : [ ]
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
            return { ...state, usersData: [ ...state.usersData, ...action.usersData ]}
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

export default usersReducer;
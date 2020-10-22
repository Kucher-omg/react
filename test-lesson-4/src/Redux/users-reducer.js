const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';


let initialState = {
    usersData : [
        { id: 1, photoUrl:'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg', FullName: 'Vlad', status: 'I`m boss', location: {city: 'Kiev', country: 'Ukraine'}, followed: true},
        { id: 2, photoUrl:'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg', FullName: 'Denis', status: 'I`m boss', location: {city: 'Kiev', country: 'Ukraine'}, followed: true },
        { id: 3, photoUrl:'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg', FullName: 'Diana', status: 'I`m noirkoyara', location: {city: 'Kiev', country: 'Ukraine'}, followed: false }
    ]
};

const usersReducer = (state = initialState, action) =>{

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
            return{
                ...state, usersData: [...state.usersData, ...action.usersData]
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
 

export const UnFolloweAC = (UserId) => {
    return {
        type: UNFOLLOW, UserId
    }
}

export const SetUsersAC = (Users) => {
    return {
        type: SET_USERS, Users
    }
}

export default usersReducer;
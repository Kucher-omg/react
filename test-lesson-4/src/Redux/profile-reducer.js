import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const UPDATE_STATUS_TEXT = 'UPDATE_STATUS_TEXT';
const SET_STATUS_TEXT = 'SET_STATUS_TEXT';

let initialState = {
    postsData: [
        { id: 1, message: 'Hello it me', like: 15 },
        { id: 2, message: 'Hi it me', like: 20 }
    ],
    newPostText: "",
    profile: null,
    statusText: ''
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            state.newPostText = action.newText;
            return {
                ...state,
                postsData: [...state.postsData, { id: 3, message: state.newPostText, like: 0 }]
            }
        }
        // case UPDATE_NEW_POST_TEXT: {
        //     return {
        //         ...state,
        //         newPostText: action.newText
        //     }
        // }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case UPDATE_STATUS_TEXT: {
            return{
                ...state,
                statusText: action.newText
            }
        }
        default:
            return state;
    }
}

export const SetStatusTextAC = (newText) => {
    return{
        type: UPDATE_STATUS_TEXT, newText
    }
}

export const getStatusThunk = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
        .then(response => {
            dispatch(SetStatusTextAC(response.data))
        })
    }
}
export const updateStatusThunk = (Status) => (dispatch) => {
    profileAPI.updateStatus(Status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(SetStatusTextAC(Status));
            }

        })
}


export const AddPostActionCreator = (newText) => {
    // debugger
    return {
        type: ADD_POST, 
        newText
    }
}

// export const OnPostChangeActionCreator = (text) => {
//     return {
//         type: UPDATE_NEW_POST_TEXT,
//         newText: text
//     }
// }

export const SetUserProfileAC = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export const userProfileThunkCreator = (userId) => {
    return (dispatch) => {
        profileAPI.profilesData(userId)
            .then(promise => {
                dispatch(SetUserProfileAC(promise));
            });
    }
}

export default profileReducer;
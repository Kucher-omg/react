import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';


let initialState = {
    postsData: [
        { id: 1, message: 'Hello it me', like: 15 },
        { id: 2, message: 'Hi it me', like: 20 }
    ],
    newPostText: "",
    profile: null
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                newPostText: "",
                postsData: [...state.postsData, { id: 3, message: state.newPostText, like: 0 }]
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state;
    }

}

export const AddPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}


export const OnPostChangeActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}

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
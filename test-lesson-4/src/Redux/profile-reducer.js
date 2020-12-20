import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const UPDATE_STATUS_TEXT = 'UPDATE_STATUS_TEXT';
const SET_PHOTOS = 'SET_PHOTOS';
const SET_PROFILE = 'SET_PROFILE';

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
            return {
                ...state,
                statusText: action.newText
            }
        }
        case SET_PHOTOS:{
            return{
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        case SET_PROFILE:{
            return{
                ...state,
                profile: action.profile
            }
        }
        default:
            return state;
    }
}

const savePhotoSuccess = (photos) => {return{type: SET_PHOTOS, photos}}
const saveProfileSuccess = (profile) => {return{type: SET_PROFILE, profile}}

export const SetStatusTextAC = (newText) => {
    return {
        type: UPDATE_STATUS_TEXT, newText
    }
}

export const getStatusThunk = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId);

        dispatch(SetStatusTextAC(response.data))
    }
}

export const updateStatusThunk = (Status) => async (dispatch) => {
    try{
        let response = await profileAPI.updateStatus(Status);

        if (response.data.resultCode === 0) {
            dispatch(SetStatusTextAC(Status));
        }
    }
    catch (error){
        debugger
    }
    

}


export const AddPostActionCreator = (newText) => {
    return {
        type: ADD_POST,
        newText
    }
}

export const SetUserProfileAC = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export const userProfileThunkCreator = (userId) => {
    return async (dispatch) => {
        let promise = await profileAPI.profilesData(userId)

        dispatch(SetUserProfileAC(promise));

    }
}

export const savePhotoThunkCreator = (file) => {
    return async (dispatch) => {
        let promise = await profileAPI.savePhoto(file)

        promise.resultCode === 0 &&
        dispatch(savePhotoSuccess(promise.data.photos));

    }
}

export const saveProfileThunkCreator = (profile) => {
    return async (dispatch, getState) => {
        let promise = await profileAPI.saveProfile(profile)
        debugger
        let id = getState().auth.id;
        if(promise.resultCode === 0){
            dispatch(userProfileThunkCreator(id));
        }
        else{
            let message = promise.messages.length > 0 ? promise.messages[0] : 'Some ERROR'
            dispatch(stopSubmit('editProfile', { _error: message }));
            return Promise.reject(message);
        }

    }
}

export default profileReducer;
import { PostDataType, ProfileType, PhotosType } from './../types/types';
import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './Redux-store';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const UPDATE_STATUS_TEXT = 'UPDATE_STATUS_TEXT';
const SET_PHOTOS = 'SET_PHOTOS';

type ActionsType = SetStatusTextACType | AddPostActionCreatorType | SetUserProfileACType | savePhotoSuccessType

let initialState = {
    postsData: [
        { id: 1, message: 'Hello it me', like: 15 },
        { id: 2, message: 'Hi it me', like: 20 }
    ] as Array<PostDataType>,
    newPostText: "",
    profile: null as ProfileType | null,
    statusText: ''
};

type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case ADD_POST: {
            state.newPostText = action.newText;
            return {
                ...state,
                postsData: [...state.postsData, { id: 3, message: state.newPostText, like: 0 }]
            }
        }
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
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
}

type savePhotoSuccessType = {
    type: typeof SET_PHOTOS, 
    photos: PhotosType
}
const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessType => {return{type: SET_PHOTOS, photos}}

type SetStatusTextACType = {
    type: typeof UPDATE_STATUS_TEXT, 
    newText: string
}
export const SetStatusTextAC = (newText: string): SetStatusTextACType => {
    return {
        type: UPDATE_STATUS_TEXT, newText
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newText: string
}
export const AddPostActionCreator = (newText: string): AddPostActionCreatorType => {
    return {
        type: ADD_POST,
        newText
    }
}

type SetUserProfileACType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const SetUserProfileAC = (profile: ProfileType): SetUserProfileACType => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getStatusThunk = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(SetStatusTextAC(response.data))
}


export const updateStatusThunk = (Status: string): ThunkType => async (dispatch) => {
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

export const userProfileThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    let promise = await profileAPI.profilesData(userId)

    dispatch(SetUserProfileAC(promise));

}

export const savePhotoThunkCreator = (file: any): ThunkType => async (dispatch) => {
    let promise = await profileAPI.savePhoto(file)

    promise.resultCode === 0 &&
        dispatch(savePhotoSuccess(promise.data.photos));

}


export const saveProfileThunkCreator = (profile: ProfileType): ThunkType => async (dispatch: any, getState) => {
    let promise = await profileAPI.saveProfile(profile)
    let id = getState().auth.id;
    if (promise.resultCode === 0) {
        dispatch(userProfileThunkCreator(id));
    }
    else {
        let message = promise.messages.length > 0 ? promise.messages[0] : 'Some ERROR'
        dispatch(stopSubmit('editProfile', { _error: message }));
        return Promise.reject(message);
    }

}


export default profileReducer;
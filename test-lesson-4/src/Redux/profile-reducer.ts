import { PostDataType, ProfileType, PhotosType } from './../types/types';
import { profileAPI, ResultCodesEnum } from "../api/api";
import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './Redux-store';



type ActionsType = InferActionsTypes<typeof actions>

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
        case 'ADD_POST': {
            state.newPostText = action.newText;
            return {
                ...state,
                postsData: [...state.postsData, { id: 3, message: state.newPostText, like: 0 }]
            }
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'UPDATE_STATUS_TEXT': {
            return {
                ...state,
                statusText: action.newText
            }
        }
        case 'SET_PHOTOS':{
            return{
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
}

export const actions = {
    savePhotoSuccess: (photos: PhotosType) => {return{type: 'SET_PHOTOS', photos} as const},
    SetStatusTextAC: (newText: string) => {
        return {
            type: 'UPDATE_STATUS_TEXT', newText
        } as const
    },
    AddPostActionCreator: (newText: string) => {
        return {
            type: 'ADD_POST',
            newText
        } as const
    },
    SetUserProfileAC: (profile: ProfileType) => {
        return {
            type: 'SET_USER_PROFILE',
            profile
        } as const
    }
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType | FormAction>

export const getStatusThunk = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.SetStatusTextAC(response.data))
}


export const updateStatusThunk = (Status: string): ThunkType => async (dispatch) => {
    try{
        let response = await profileAPI.updateStatus(Status);

        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.SetStatusTextAC(Status));
        }
    }
    catch (error){
        
    }
}

export const userProfileThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    let promise = await profileAPI.profilesData(userId)

    dispatch(actions.SetUserProfileAC(promise));

}

export const savePhotoThunkCreator = (file: string): ThunkType => async (dispatch) => {
    let promise = await profileAPI.savePhoto(file)
    if(promise.data.resultCode === 0){
        dispatch(actions.savePhotoSuccess(promise.data.photos));
    }
}


export const saveProfileThunkCreator = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    let promise = await profileAPI.saveProfile(profile)
    let id = getState().auth.id;
    if (promise.resultCode === ResultCodesEnum.Success) {
        dispatch(userProfileThunkCreator(id));
    }
    else {
        let message = promise.messages.length > 0 ? promise.messages[0] : 'Some ERROR'
        dispatch(stopSubmit('editProfile', { _error: message }));
        return Promise.reject(message);
    }

}


export default profileReducer;
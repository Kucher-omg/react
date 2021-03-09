import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { ChatAPI, SubscriberType } from '../api/chat-api';
import { ChatMessageType } from "../components/pages/Chat/ChatPage";
import { AppStateType, InferActionsTypes } from "./Redux-store";


type ActionsType =  InferActionsTypes<typeof actions>


const SET_MESSAGES = 'SET-MESSAGES';

let initialState = {
    messages: [] as Array<ChatMessageType>
};

export type initialStateType = typeof initialState;

let chatReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, ...action.messages]
            }


        default:
            return state;
    }
}

export const actions = {
    setMessage: (messages: Array<ChatMessageType>) => ({ type: SET_MESSAGES, messages } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
let _newMessagesHandler: SubscriberType | null = null;

let newMessagesHandlerCreator = (dispatch: Dispatch<ActionsType>) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages: Array<ChatMessageType>) => {
            dispatch(actions.setMessage(messages))
        }
    }
    return _newMessagesHandler;
}

export const startMessagesListening = (): ThunkType => async dispatch => {
    ChatAPI.start()
    ChatAPI.subscribe(newMessagesHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch, getState) => {
    // getState().chat.messages = []
    ChatAPI.unsubscribe(newMessagesHandlerCreator(dispatch))
    ChatAPI.stop()
}

export const sendMessageThunk = (message: string): ThunkType => async dispatch => {
    ChatAPI.sendMessage(message)
}


export default chatReducer;
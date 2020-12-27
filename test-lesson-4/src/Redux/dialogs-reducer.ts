import { MessageType, DialogsType } from './../types/types';
const ADD_MESSAGE = 'ADD-MESSAGES';
const UPDATE_NEW_MESS_TEXT = 'UPDATE-NEW-MESS-TEXT';

type ActionsType = AddMessageActionCreatorType | OnTextChangeActionCreatorType

let initialState = {
    messageData : [
        { id: 1, message: 'Hello it`s me' },
        { id: 2, message: 'hi' },
        { id: 3, message: 'lol' },
        { id: 4, message: 'alooo' }
    ] as Array<MessageType>,
    newMessText: "",
    dialogsData : [
        { id: 1, name: 'Vlad' },
        { id: 2, name: 'Diana' },
        { id: 3, name: 'Denis' },
        { id: 4, name: 'Roma' }
    ]as Array<DialogsType>
};

export type initialStateType = typeof initialState;


const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch(action.type){
        case ADD_MESSAGE: {
            state.newMessText = action.newText;
            return{
                ...state,
                newMessText: "",
                messageData: [...state.messageData, {id: 5, message: state.newMessText}]
            }
        }
        case UPDATE_NEW_MESS_TEXT:{
            return {
                ...state,
                newMessText: action.newText
            }
        }
        default:
            return state;
    }


}
type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE,
    newText: string
}
export const AddMessageActionCreator = (newText: string): AddMessageActionCreatorType => {
    return{
        type: ADD_MESSAGE, newText
    }
}


type OnTextChangeActionCreatorType = {
    type: typeof UPDATE_NEW_MESS_TEXT, 
    newText: string
}
export const OnTextChangeActionCreator = (text: string): OnTextChangeActionCreatorType => {

    return{
        type: UPDATE_NEW_MESS_TEXT, 
        newText: text
    }
    
}

export default dialogsReducer;
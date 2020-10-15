const ADD_MESSAGE = 'ADD-MESSAGES';
const UPDATE_NEW_MESS_TEXT = 'UPDATE-NEW-MESS-TEXT';


const dialogsReducer = (state, action) =>{

    switch(action.type){
        case ADD_MESSAGE: {
            let newMessages ={
                id: 5,
                message: state.newMessText
            };
            state.messageData.push(newMessages);
            state.newMessText = "";
            return state;
        }
        case UPDATE_NEW_MESS_TEXT:{
            state.newMessText = action.newText;
            return state;
        }
        default:
            return state;
    }


}

export const AddMessageActionCreator = () => {
    return{
        type: ADD_MESSAGE
    }
}

export const OnTextChangeActionCreator = (text) => {
    return{
        type: UPDATE_NEW_MESS_TEXT, 
        newText: text
    }
}

export default dialogsReducer;
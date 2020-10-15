const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    postsData : [
        { id: 1, message: 'Hello it me', like: 15 },
        { id: 2, message: 'Hi it me', like: 20 }
    ],
    newPostText: "" 
};

const profileReducer = (state = initialState, action) =>{

    switch(action.type){
        case ADD_POST:{
            let newPost ={
                id: 3,
                message: state.newPostText,
                like: 0
            };
            state.postsData.push(newPost);
            state.newPostText = "";
            return state;
        }
        case UPDATE_NEW_POST_TEXT:{
            state.newPostText = action.newText;
            return state;
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

export default profileReducer;
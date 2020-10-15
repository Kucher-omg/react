const ADD_POST = 'ADD-POST';
const ADD_MESSAGE = 'ADD-MESSAGES';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESS_TEXT = 'UPDATE-NEW-MESS-TEXT';

let store ={
    
    _state: {
        profilePage: {
            postsData : [
                { id: 1, message: 'Hello it me', like: 15 },
                { id: 2, message: 'Hi it me', like: 20 }
            ],
            newPostText: ""       
        },
        messagesPage: {
            messageData : [
                { id: 1, message: 'Hello it`s me' },
                { id: 2, message: 'hi' },
                { id: 3, message: 'lol' },
                { id: 4, message: 'alooo' }
            ],
            newMessText: "",
            dialogsData : [
                { id: 1, name: 'Vlad' },
                { id: 2, name: 'Diana' },
                { id: 3, name: 'Denis' },
                { id: 4, name: 'Roma' }
            ]
        },
    
        sidebar: {
            sidebarData:[
                { id: 1, name: 'Vlad' },
                { id: 2, name: 'Diana' },
                { id: 3, name: 'Denis' },
                { id: 4, name: 'Roma' }
            ]
        }
    
    },
    getState(){
        return this._state;
    },
    subscribe(observer){
        this.rerenderEntireTree = observer;
    },


    dispatch(action){
        if(action.type ==='ADD-POST' ){
            let newPost ={
                id: 3,
                message: this._state.profilePage.newPostText,
                like: 0
            };
            this._state.profilePage.postsData.push(newPost);
            this._state.profilePage.newPostText = "";
            this.rerenderEntireTree(this._state);
        }
        else if (action.type === 'UPDATE-NEW-POST-TEXT'){
            this._state.profilePage.newPostText = action.newText;
            this.rerenderEntireTree(this._state);
        }
        else if(action.type === 'ADD-MESSAGES'){
            let newMessages ={
                id: 5,
                message: this._state.messagesPage.newMessText
            };
            this._state.messagesPage.messageData.push(newMessages);
            this.rerenderEntireTree(this._state);
            this._state.messagesPage.newMessText = "";
        }
        else if(action.type === 'UPDATE-NEW-MESS-TEXT'){
            this._state.messagesPage.newMessText = action.newText;
            this.rerenderEntireTree(this._state);
        }
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

export const fakeAction = (text) => {
    return{
        type: UPDATE_NEW_MESS_TEXT, 
        newText: text
    }
}

export const fakeAction2 = (text) => {
    return{
        type: UPDATE_NEW_MESS_TEXT, 
        newText: text
    }
}

export default store;
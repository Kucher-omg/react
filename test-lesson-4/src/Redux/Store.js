import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

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
    _callSubscriber (){

    },
    getState(){
        return this._state;
    },
    subscribe(observer){
        this._callSubscriber = observer;
    },
    

    dispatch(action){

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
  
}

export default store;
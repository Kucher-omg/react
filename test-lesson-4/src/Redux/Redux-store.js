import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from 'redux-thunk';
const { createStore, combineReducers, applyMiddleware } = require("redux");



let reducersBatch = combineReducers({
    profilePage: profileReducer,
    messagesPage : dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer
});

let store = createStore(reducersBatch, applyMiddleware(thunkMiddleware));

window.store = store; 

export default store;
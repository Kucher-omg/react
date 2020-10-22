import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
const { createStore, combineReducers } = require("redux");



let reducersBatch = combineReducers({
    profilePage: profileReducer,
    messagesPage : dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer
});

let store = createStore(reducersBatch);

window.store = store; 

export default store;
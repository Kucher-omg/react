import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
const { createStore, combineReducers } = require("redux");



let reducersBatch = combineReducers({
    profilePage: profileReducer,
    messagesPage : dialogsReducer,
    sidebar: sidebarReducer
});

let store = createStore(reducersBatch);

export default store;
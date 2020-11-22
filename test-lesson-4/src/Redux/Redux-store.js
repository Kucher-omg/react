import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";



const { createStore, combineReducers, applyMiddleware, compose } = require("redux");



let reducersBatch = combineReducers({
    profilePage: profileReducer,
    messagesPage : dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducersBatch, composeEnhancers(applyMiddleware(thunkMiddleware)));


window.store = store; 

export default store;
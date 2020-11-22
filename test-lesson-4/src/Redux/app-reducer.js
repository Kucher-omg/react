import { loginThunkCreator} from "./auth-reducer";

const SET_INITIALIZE = 'SET_INITIALIZE';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_INITIALIZE: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }

}

export const SetInitialized = () => {
    return {
        type: SET_INITIALIZE
    }
}

export const initializedApp = () => async (dispatch) => {
    let promise = await dispatch(loginThunkCreator());

    dispatch(SetInitialized());

}



export default appReducer;
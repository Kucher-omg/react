import { loginThunkCreator} from "./auth-reducer";

const SET_INITIALIZE = 'SET_INITIALIZE';

export type InitialStateType = {
    initialized: boolean 
}

let initialState: InitialStateType = {
    initialized: false 
};



const appReducer = (state = initialState, action: any): InitialStateType => {

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
export type SetInitializedType = {
    type: typeof SET_INITIALIZE
}
export const SetInitialized = (): SetInitializedType => {
    return {
        type: SET_INITIALIZE
    }
}

export const initializedApp = () => async (dispatch: Function) => {
    
    let promise = await dispatch(loginThunkCreator());
    dispatch(SetInitialized());
}



export default appReducer;
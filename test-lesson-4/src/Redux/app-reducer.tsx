import { ThunkAction } from "redux-thunk";
import { loginThunkCreator} from "./auth-reducer";
import { AppStateType } from "./Redux-store";

const SET_INITIALIZE = 'SET_INITIALIZE';

type ActionsType = SetInitializedType

export type InitialStateType = {
    initialized: boolean 
}

let initialState: InitialStateType = {
    initialized: false 
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

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
 
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const initializedApp = (): ThunkType => async (dispatch) => {
    let promise = await dispatch(loginThunkCreator());
    dispatch(SetInitialized());
}



export default appReducer;
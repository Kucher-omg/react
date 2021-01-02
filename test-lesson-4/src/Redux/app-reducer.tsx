import { ThunkAction } from "redux-thunk";
import { loginThunkCreator} from "./auth-reducer";
import { AppStateType, InferActionsTypes } from "./Redux-store";

type ActionsType = InferActionsTypes<typeof actions>

export type InitialStateType = {
    initialized: boolean 
}

let initialState: InitialStateType = {
    initialized: false 
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SET_INITIALIZE': {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }

}

export const actions = {
    SetInitialized: () => {
        return {
            type: 'SET_INITIALIZE'
        } as const
    }
}
 
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const initializedApp = (): ThunkType => async (dispatch) => {
    let promise = await dispatch(loginThunkCreator());
    dispatch(actions.SetInitialized());
}



export default appReducer;
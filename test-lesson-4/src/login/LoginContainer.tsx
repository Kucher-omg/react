import { connect } from 'react-redux';
import { compose } from 'redux';
import { loginToThunkCreator, ExitThunkCreator } from '../Redux/auth-reducer';
import { AppStateType } from '../Redux/Redux-store';
import Login from './login';

type MapStatePropsType = {
    isAuth: boolean,
    captchaUrl: string
}

type MapDispatchPropsType = {
    ExitThunk: () => void
    loginToThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type OwnPropsType = {
    
}

type PropsType = OwnPropsType & MapDispatchPropsType & MapStatePropsType;

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}
 
export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
    {
        loginToThunk: loginToThunkCreator,
        ExitThunk: ExitThunkCreator
    })
)
(Login);

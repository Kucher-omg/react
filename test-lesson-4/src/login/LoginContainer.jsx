import { connect } from 'react-redux';
import { compose } from 'redux';
import { loginToThunkCreator, ExitThunkCreator } from '../Redux/auth-reducer';
import Login from './login';

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}
 
export default compose(
    connect(mapStateToProps, {
        loginToThunk: loginToThunkCreator,
        ExitThunk: ExitThunkCreator
    })
)
(Login);

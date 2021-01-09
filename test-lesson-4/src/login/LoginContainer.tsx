import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../Redux/Redux-store';
import Login from './login';

type MapStatePropsType = {
    
}

type MapDispatchPropsType = {
   
}

type OwnPropsType = {
    
}
 
type PropsType = OwnPropsType & MapDispatchPropsType & MapStatePropsType;

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}
 
export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
    {
        
    })
)
(Login);

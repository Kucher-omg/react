import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loginThunkCreator } from '../../Redux/auth-reducer';
import { AppStateType } from '../../Redux/Redux-store';
// import Header from './Header';

type PropsType = {
  isAuth: boolean,
  login: string
}

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return (
      <div>
        
      </div>
      // <Header {...this.props} />
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})


export default compose(
  connect<PropsType>(mapStateToProps, 
    {
    })
)(HeaderContainer);

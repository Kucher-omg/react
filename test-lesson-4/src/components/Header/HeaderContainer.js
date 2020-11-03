import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { headerAPI } from '../../api/api';
import { SetAuthUserDataAC } from '../../Redux/auth-reducer';
import Header from './Header';


class HeaderContainer extends React.Component {

  componentDidMount() {
    headerAPI.login()
    .then(promise => {
        if(promise.resultCode === 0) {
          this.props.SetAuthUserData(promise.data.id, promise.data.login, promise.data.email);
        }
      });
  }
 
  render() {
    return (
      <Header {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})


export default connect(mapStateToProps, {SetAuthUserData: SetAuthUserDataAC})(HeaderContainer);
import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { SetAuthUserDataAC } from '../../Redux/auth-reducer';
import Header from './Header';


class HeaderContainer extends React.Component {

  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
      withCredentials: true
    }).then(response => {
        if(response.data.resultCode === 0) {
          this.props.SetAuthUserData(response.data.data.id, response.data.data.login, response.data.data.email);
        }
        debugger;
        // this.props.SetUsersSize(response.data.totalCount);
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
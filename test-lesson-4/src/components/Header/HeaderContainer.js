import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loginThunkCreator } from '../../Redux/auth-reducer';
import Header from './Header';


class HeaderContainer extends React.Component {

  componentDidMount() {
    this.props.loginThunk();
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


export default compose(
  connect(mapStateToProps, 
    {
      loginThunk: loginThunkCreator
    })
)(HeaderContainer);

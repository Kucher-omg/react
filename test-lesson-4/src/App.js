import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter } from 'react-router-dom';
import store from './Redux/Redux-store';

// import DialogsContainer from './components/Dialogs/DialogsContainer';

// import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
// const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './login/LoginContainer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializedApp } from './Redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';

const DialogsContainer = React.lazy(() => import( './components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import( './components/Users/UsersContainer'));


class App extends React.Component {

  componentDidMount() {
    this.props.initializedApp();
  }


  render() {
    console.log(this.props);
    if (!this.props.initialized) {
      return <Preloader />
    }
    else {
      return (


        <div className="app-wrapper">

          <HeaderContainer />

          <Navbar store={store} />


          <div className="app-wrapper-content">
          
            <Route path="/dialogs" render={() => {
              return <Suspense fallback={<div><Preloader /></div>}>
              <DialogsContainer />
            </Suspense> 
            }} />

            <Route path="/profile/:userId?" render={() =>
              <ProfileContainer />} />

            <Route path="/users" render={() =>{
              return <Suspense fallback={<div><Preloader /></div>}>
              <UsersContainer />
            </Suspense> 
            }} />

            <Route path="/login"
              render={() => <LoginContainer />} />


          </div>

        </div>

      );
    }
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})


export default compose(
  withRouter,
  connect(mapStateToProps,
    {
      initializedApp
    })
)(App);

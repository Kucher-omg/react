import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import { Header } from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import ChatPage from './components/pages/Chat/ChatPage';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './login/login';
import { initializedApp } from './Redux/app-reducer';
import store, { AppStateType } from './Redux/Redux-store';
const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
const UsersPage = React.lazy(() => import('./components/Users/Users'));



const App: React.FC = (props) => {

  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const dispatch = useDispatch()

  let catchAllUnhandleErrors = (promiseRejectonEvent: PromiseRejectionEvent) => {
    alert("Error");
  }
  
  useEffect(()=> {
    dispatch(initializedApp());
    window.addEventListener('unhandledrejection', catchAllUnhandleErrors);
    return () => {
      window.removeEventListener('unhandledrejection', catchAllUnhandleErrors);
    }
  }, [])

  if (!initialized) {
    return <Preloader />
  }
  else {
    return (
      <div className="app-wrapper">
        <Header />
        <Navbar store={store} />
        <div className="app-wrapper-content">
          <Switch>
            <Route path="/dialogs" render={() => {
              return <Suspense fallback={<div><Preloader /></div>}>
                <Dialogs />
              </Suspense>
            }} />
            <Route exact path="/" render={() =>
              <Redirect to='/profile' />} />
            <Route path="/profile/:userId?" render={() =>
              <ProfileContainer />} />
            <Route path="/users" render={() => {
              return <Suspense fallback={<div><Preloader /></div>}>
                <UsersPage />
              </Suspense>
            }} />
            <Route path="/login"
              render={() => <Login />} />
            <Route path="/chat"
              render={() => <ChatPage />} />

            <Route path='/*'
              render={() => <div>404 Page not found</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default compose<React.ComponentType>(
  withRouter
)(App);

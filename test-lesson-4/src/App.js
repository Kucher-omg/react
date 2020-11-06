import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route } from 'react-router-dom';
import store from './Redux/Redux-store';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './login/login';



const App = (props) => {

  return (
    
      <div className="app-wrapper">

        <HeaderContainer />

        <Navbar store={store}/>


        <div className="app-wrapper-content">
          
        <Route path="/dialogs" render={() =>
          <DialogsContainer />} />

        <Route path="/profile/:userId?" render={() =>
          <ProfileContainer />} />

        <Route path="/users" render={() =>
          <UsersContainer />} />

        <Route path="/login" 
        render={() => <Login />} />


      </div>

    </div>

  );
}


export default App;

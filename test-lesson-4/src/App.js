import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route } from 'react-router-dom';
import store from './Redux/Redux-store';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Users from './components/Users/Users';
import UsersContainer from './components/Users/UsersContainer';



const App = (props) => {

  return (
    
      <div className="app-wrapper">

        <Header />

        <Navbar store={store}/>


        <div className="app-wrapper-content">
          
        <Route path="/dialogs" render={() =>
          <DialogsContainer />} />

        <Route path="/profile" render={() =>
          <Profile />} />

        <Route path="/users" render={() =>
          <UsersContainer />} />
      </div>

    </div>

  );
}


export default App;

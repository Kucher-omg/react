import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route } from 'react-router-dom';
import store from './Redux/Redux-store';
import DialogsContainer from './components/Dialogs/DialogsContainer';




const App = (props) => {

  return (
    
      <div className="app-wrapper">

        <Header />

        <Navbar store={store}/>


        <div className="app-wrapper-content">
          
          <Route path="/dialogs" render={ () => 
          <DialogsContainer store = {store} /> } />
         
          <Route path="/profile" render={ () => 
          <Profile store = {store}/>} />

        </div>

      </div>

  );
}


export default App;

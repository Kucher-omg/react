import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Route } from 'react-router-dom';
import { addPost } from './Redux/State';



const App = (props) => {

  
  return (
    
      <div className="app-wrapper">

        <Header />

        <Navbar state={props.state.sidebar}/>


        <div className="app-wrapper-content">
          
          <Route path="/dialogs" render={ () => <Dialogs 
          updateNewMessText={props.updateNewMessText}  
          AddMessages={props.AddMessages} 
          state={props.state.messagesPage}/> } />
         
          <Route path="/profile" render={ () => <Profile updateNewPostText={props.updateNewPostText}  profilePage={props.state.profilePage} addPost={props.addPost}/>} />

        </div>

      </div>

  );
}


export default App;

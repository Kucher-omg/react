import React from 'react';
import { AddPostActionCreator, OnPostChangeActionCreator } from '../../../Redux/profile-reducer';
import MyPost from './MyPost';




const MyPostContainer = (props) => {

  let state = props.store.getState();

  let AddPosts = () => {
    props.store.dispatch(AddPostActionCreator());
  } 
  
  let updateOnPostChange = (text) =>{
    
    let action = OnPostChangeActionCreator(text);
    props.store.dispatch(action);
  }


  return (<MyPost newPostText={state.profilePage.newPostText} postsData={state.profilePage.postsData} onAddPosts={AddPosts} onPostChange={updateOnPostChange}/>);
}

export default MyPostContainer;
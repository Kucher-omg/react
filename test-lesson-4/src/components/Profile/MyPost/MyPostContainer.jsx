import React from 'react';
import { AddPostActionCreator, OnPostChangeActionCreator } from '../../../Redux/profile-reducer';
import MyPost from './MyPost';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
    postsData: state.profilePage.postsData
  }
}

let mapDispatchToProps = (dispatch) => {
  return{
    onAddPosts: () =>{
      let action = AddPostActionCreator();
      dispatch(action);
    },
      onPostChange: (text) => {
      let action = OnPostChangeActionCreator(text);
      dispatch(action);
    }
  }
}

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);

export default MyPostContainer;
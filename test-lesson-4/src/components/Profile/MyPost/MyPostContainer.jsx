import React from 'react';
import { AddPostActionCreator, OnPostChangeActionCreator } from '../../../Redux/profile-reducer';
import MyPost from './MyPost';
import StoreContext from './../../../Redux/StoreContext';



const MyPostContainer = () => {

  // let state = props.store.getState();

  return (
    <StoreContext.Consumer>
      {
        (store) => {
          let state = store.getState();

          let AddPosts = () => {
            store.dispatch(AddPostActionCreator());
          }

          let updateOnPostChange = (text) => {

            let action = OnPostChangeActionCreator(text);
            store.dispatch(action);
          }

          return <MyPost
            newPostText={state.profilePage.newPostText}
            postsData={state.profilePage.postsData}
            onAddPosts={AddPosts}
            onPostChange={updateOnPostChange} />
        }
      }
    </StoreContext.Consumer>


  );
}

export default MyPostContainer;
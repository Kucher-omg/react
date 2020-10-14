import React from 'react';
import classes from './Profile.module.css';
import MyPost from './MyPost/MyPost';
import ProfileInfo from './ProfileInfo/ProfileInfo';



const Profile = (props) => {

  return (
    <div >

      <ProfileInfo />

      <MyPost updateNewPostText={props.updateNewPostText} newPostText={props.profilePage.newPostText} postsData={props.profilePage.postsData} addPost={props.addPost}/>

    </div>
  );
}

export default Profile;
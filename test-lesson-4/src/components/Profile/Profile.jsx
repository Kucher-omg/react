import React from 'react';
import classes from './Profile.module.css';
import MyPost from './MyPost/MyPost';
import ProfileInfo from './ProfileInfo/ProfileInfo';



const Profile = (props) => {
  // debugger;
  return (
    <div >

      <ProfileInfo />

      <MyPost 
      newPostText={props.profilePage.newPostText} 
      postsData={props.profilePage.postsData} 
      dispatch={props.dispatch}/>

    </div>
  );
}

export default Profile;
import React from 'react';
import classes from './Profile.module.css';
import MyPost from './MyPost/MyPost';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPost/MyPostContainer';
import store from '../../Redux/Redux-store';



const Profile = (props) => {
  // debugger;
  return (
    <div >

      <ProfileInfo />
      <MyPostContainer />

    </div>
  );
}

export default Profile;
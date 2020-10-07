import React from 'react';
import classes from './Profile.module.css';
import MyPost from './MyPost/MyPost';
const Profile = () => {
  return (
    <div className={classes.content}>
      <div>
        <img src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"></img>
      </div>
      <div>
        ava
      </div>
      <MyPost />
    </div>
  );
}

export default Profile;
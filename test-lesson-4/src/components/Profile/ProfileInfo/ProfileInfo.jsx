import React from 'react';
import classes from './ProfileInfo.module.css';
import MyPost from '../MyPost/MyPost';



const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"></img>
      </div>

      <div className={classes.description_block}>
        ava
      </div>
    </div>
  );
}

export default ProfileInfo;
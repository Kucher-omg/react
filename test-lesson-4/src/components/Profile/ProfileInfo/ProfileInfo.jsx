import React from 'react';
import classes from './ProfileInfo.module.css';
import MyPost from '../MyPost/MyPost';



const ProfileInfo = (props) => {
  return (
    <div>
      <div>
        <img src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"></img>
      </div>

      <div className={classes.description_block}>
        <img src={props.profile.photos.small} alt="" />
        <span>{props.profile.lookingForAJobDescription}</span>
      </div>
    </div>
  );
}

export default ProfileInfo;
import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import styles from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return (
      <Preloader />
    );
  }


  return (
    <div>
      {/* <div>
        <img src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"></img>
      </div> */}

      <div className={classes.description_block}>
        <img className={styles.photo}
          src={props.profile.photos.small != null
            ? props.profile.photos.small
            : 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg'} />
        {/* <img src={props.profile.photos.small} alt="" /> */}
        <span>{props.profile.fullName}</span>
        <div>{props.profile.lookingForAJobDescription}</div>
        <ProfileStatus 
        status={props.status} 
        updateStatus ={props.updateStatus}/>
      </div>
    </div>
  );
}

export default ProfileInfo;
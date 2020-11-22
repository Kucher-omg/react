import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import styles from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return (
      <Preloader />
    );
  }
  debugger

  return (
    <div>
      <div className={classes.description_block}>
        <img className={styles.photo}
          src={props.profile.photos.small != null
            ? props.profile.photos.small
            : 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg'} />
        <span>{props.profile.fullName}</span>
        <div>{props.profile.lookingForAJobDescription}</div>
        {props.id === props.userIdInURL
          ? <ProfileStatusWithHooks
            status={props.status}
            updateStatus={props.updateStatus} />
          : <div title='Only read' className={styles.status + ' ' + styles.statusText}>
            Status : {props.userStatus ? props.userStatus : 'No status'
            }
          </div>
        }
      </div>
    </div>
  );
}

export default ProfileInfo;
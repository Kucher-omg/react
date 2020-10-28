import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPost/MyPostContainer';
import Preloader from '../common/Preloader/Preloader';



const Profile = (props) => {
  if (!props.profile) {
    return (
      <Preloader />
    );
  }
  return (
    <div >

      <ProfileInfo profile={props.profile}/>
      <MyPostContainer />

    </div>
  );
}

export default Profile;
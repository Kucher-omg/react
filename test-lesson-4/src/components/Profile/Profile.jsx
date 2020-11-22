import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPost/MyPostContainer';



const Profile = (props) => {

  return (
    <div >

      <ProfileInfo 
      profile={props.profile}
      updateStatus={props.updateStatus} 
      status = {props.status} 
      UpdateStatusText = {props.UpdateStatusText}
      userIdInURL={props.userIdInURL}
      {...props} />
      <MyPostContainer />

    </div>
  );
}

export default Profile;
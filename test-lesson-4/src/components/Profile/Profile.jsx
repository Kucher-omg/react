import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPost/MyPostContainer';



const Profile = (props) => {

  return (
    <div >

      <ProfileInfo 
      savePhoto={props.savePhoto}
      isOwner={props.isOwner}
      profile={props.profile}
      updateStatus={props.updateStatus} 
      status = {props.status}
      saveProfile={props.saveProfile}
      UpdateStatusText = {props.UpdateStatusText}
      userIdInURL={props.userIdInURL}
      {...props} />
      <MyPostContainer />

    </div>
  );
}

export default Profile;
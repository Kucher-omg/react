import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPost/MyPostContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
  updateStatus: (text: string) => void,
  savePhoto: (file: string) => void,
  saveProfile: (profile: ProfileType) => void,
  isOwner: boolean,
  status: string,
  profile: ProfileType,
  id: number
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div >
      <ProfileInfo 
      savePhoto={props.savePhoto}
      isOwner={props.isOwner}
      profile={props.profile}
      updateStatus={props.updateStatus} 
      status = {props.status}
      saveProfile={props.saveProfile}
      id={props.id}
      // UpdateStatusText = {props.UpdateStatusText}
      // userIdInURL={props.userIdInURL}
      // {...props} 
      />
      <MyPostContainer />
    </div>
  );
}

export default Profile;
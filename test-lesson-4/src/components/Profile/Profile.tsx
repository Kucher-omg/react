import React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../Redux/Redux-store';
import MyPostContainer from './MyPost/MyPostContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
  isOwner: boolean
}
 
const Profile: React.FC<PropsType> = (props) => {
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  const status = useSelector((state: AppStateType) => state.profilePage.statusText)
  const id = useSelector((state: AppStateType) => state.auth.id)
  

  return (
    <div >
      <ProfileInfo 
      isOwner={props.isOwner}
      profile={profile} 
      status = {status}
      id={id}
      />
      <MyPostContainer />
    </div>
  );
}

export default Profile;
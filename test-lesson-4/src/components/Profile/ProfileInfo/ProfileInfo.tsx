import React, { useState, useEffect, ChangeEvent } from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import styles from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataReduxForm from './ProfileDataFrom';
// import { ProfileType } from '../../../types/types';

export type ContactsType = {
  [github: string]: string,
  vk: string,
  facebook: string,
  instagram: string,
  twitter: string,
  website: string,
  youtube: string,
  mainLink: string
}
export type PhotosType = {
  small: string |null,
  large: string |null
}
export type ProfileType = {
  userId: number,
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  fullName: string,
  contacts: ContactsType,
  photos: PhotosType,
  aboutMe: string
}
type PropsType = {
  updateStatus: (text: string) => void,
  savePhoto: (file: any) => void,
  saveProfile: (profile: ProfileType) => void,
  isOwner: boolean,
  status: string,
  id: number,
  profile: ProfileType
}

const ProfileInfo: React.FC<PropsType> = (props) => {

  let [editMode, changeEditMode] = useState(false);

  let [editContactsMode, changeContactsEditMode] = useState(false);

  let activateEditMode = () =>{
    changeEditMode(true);
  }

  if (!props.profile) {
    return (
      <Preloader />
    );
  }
  let onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    let fileName;
    if(e.target.files){
      fileName = e.target.files[0].name;
    }
    props.savePhoto(fileName);
    changeEditMode(false);
  }
  let deActivateEditMode = () => {
    changeEditMode(false);
  }

  const onSubmit = (value: any) => {
    // props.saveProfile(value).then(() => {
      
    // })
    changeContactsEditMode(false);  
  }

  const onActivateEditMode = () => {
    changeContactsEditMode(true);
  }
  let profile = props.profile;
  // debugger
  return (
    <div>
      <div className={classes.description_block}>
        <img onBlur={deActivateEditMode} onDoubleClick={activateEditMode} className={styles.photo}
          src={props.profile.photos.small != null
            ? props.profile.photos.small
            : 'data:image/png;base64,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'} />
        {editMode && props.isOwner && <input type='file' onChange={onMainPhotoSelected}/>}
        <span className={styles.name}>{props.profile.fullName}</span>
        
        {editContactsMode 
        ? <ProfileDataReduxForm initialValues={props.profile} onSubmit={onSubmit} {...props}/> 
        : <ProfileData {...props} goToEditMode={onActivateEditMode}/>}

        
        {props.id === 12341
          ? <ProfileStatusWithHooks
            status={props.status}
            updateStatus={props.updateStatus} />
          : <div title='Only read' className={styles.status + ' ' + styles.statusText}>
            Статус : {props.status ? props.status : 'No status'
            }
          </div>
        }
      </div>
    </div>
  );
}

type PropsType2 = {
  isOwner: boolean,
  profile: ProfileType,
  goToEditMode: () => void
}
const ProfileData: React.FC<PropsType2> = (props) => {
  return <div>
    <div>
      {props.isOwner && <input type="button" value='Change' onClick={props.goToEditMode}/>}
    </div>
  <div>
    Looking for a job: 
    {props.profile.lookingForAJob 
    ? 
    <span> 
      Yes 
      <div>
      Job description: {props.profile.lookingForAJobDescription}
      </div>
    </span> 
    : 'No'}
  </div>
  <div>
    About me: {props.profile.aboutMe}
  </div>
  <div>
    Contacts: 
      {Object.keys(props.profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
      })}           
  </div>
</div>
}

type ContactType = {
  contactTitle: string,
  contactValue: string
}

const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
  return <div className={styles.contact}>
    {contactTitle}: {contactValue}
  </div>
}

export default ProfileInfo;
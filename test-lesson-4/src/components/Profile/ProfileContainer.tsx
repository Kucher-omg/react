import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
  getStatusThunk, savePhotoThunkCreator,
  updateStatusThunk, userProfileThunkCreator, saveProfileThunkCreator
} from '../../Redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { AuthRedirect } from '../../hoc/AuthRedirect';
import { AppStateType } from '../../Redux/Redux-store';
import { ProfileType } from '../../types/types';

type MapStatePropsType = {
  status: string,
  id: number,
  profile: ProfileType,
  isAuth: boolean
}

type MapDispatchPropsType = {
  getStatus: (id: number) => void,
  updateStatus: (text: string) => void,
  savePhoto: (file: string) => void,
  userProfileThunk: (id: number) => void,
  saveProfile: (profile: ProfileType) => void
}

type ParamsType = {
  params: {
    userId: number
  }
}
type OwnPropsType = {
  match: ParamsType
}

type PropsType = MapStatePropsType & OwnPropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType> {
  updateProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.id;
      if (!userId) {
        userId = 12341;
      }
    }
    this.props.userProfileThunk(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.updateProfile();
  }

  componentDidUpdate(prevProps: OwnPropsType) {
    if ((this.props.match.params.userId) != prevProps.match.params.userId) {
      this.updateProfile();
    }
  }
  render() {
    return (
      <div >
        <Profile 
          // userIdInURL={this.userId}
          savePhoto={this.props.savePhoto}
          isOwner={!this.props.match.params.userId}
          updateStatus={this.props.updateStatus}
          status={this.props.status}
          saveProfile={this.props.saveProfile}
          id={this.props.id}
          // {...this.props}
          profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.statusText,
  id: state.auth.id,
  isAuth: state.auth.isAuth
});

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
  (mapStateToProps,
    {
      userProfileThunk: userProfileThunkCreator,
      getStatus: getStatusThunk,
      updateStatus: updateStatusThunk,
      savePhoto: savePhotoThunkCreator,
      saveProfile: saveProfileThunkCreator
    }),
  withRouter,
  AuthRedirect
)
  (ProfileContainer);

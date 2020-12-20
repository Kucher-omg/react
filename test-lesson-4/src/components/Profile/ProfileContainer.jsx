import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatusThunk, savePhotoThunkCreator, 
  updateStatusThunk, userProfileThunkCreator, saveProfileThunkCreator } from '../../Redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { AuthRedirect } from '../../hoc/AuthRedirect';


class ProfileContainer extends React.Component {
  

  updateProfile() {
    let userId = this.props.match.params.userId;
    debugger
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

  componentDidUpdate (prevProps, prevState) {
    
    if((this.props.match.params.userId) != prevProps.match.params.userId){
      debugger
      this.updateProfile();
    }
    
  }


  render() {

    return (
      <div >

        <Profile userIdInURL={this.userId}
          savePhoto={this.props.savePhoto}
          isOwner={!this.props.match.params.userId}
          updateStatus={this.props.updateStatus}
          status={this.props.status}
          saveProfile={this.props.saveProfile}
          {...this.props}
          profile={this.props.profile} />

      </div>
    );
  }
}



let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.statusText,
  id: state.auth.id,
  isAuth: state.auth.isAuth
});

export default compose(
  connect(mapStateToProps,
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

import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatusThunk, UpdateStatusTextAC, updateStatusThunk, userProfileThunkCreator } from '../../Redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { AuthRedirect } from '../../hoc/AuthRedirect';


class ProfileContainer extends React.Component {
userId = this.props.match.params.userId;
  componentDidMount() {
    
    if(!this.userId){
      this.userId = this.props.id;
      if(!this.userId){
          this.userId = 12341;
      }
  } 

    this.props.userProfileThunk(this.userId);
    this.props.getStatus(this.userId);
  }


  render() {

    return (
      <div >

        <Profile userIdInURL={this.userId}
        updateStatus={this.props.updateStatus} 
        status={this.props.status} 
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
      updateStatus: updateStatusThunk
    }),
  withRouter,
  AuthRedirect
)
(ProfileContainer);

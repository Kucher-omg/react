import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { UpdateStatusTextAC, userProfileThunkCreator } from '../../Redux/profile-reducer';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.userProfileThunk(userId);
  }


  render() {

    

    return (
      <div >

        <Profile {...this.props} profile={this.props.profile} />

      </div>
    );
  }
}



let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  statusText: state.profilePage.statusText
});

export default compose(
  connect(mapStateToProps,
    {
      userProfileThunk: userProfileThunkCreator,
      UpdateStatusText: UpdateStatusTextAC
    }),
  withRouter
  // AuthRedirect
)
(ProfileContainer);

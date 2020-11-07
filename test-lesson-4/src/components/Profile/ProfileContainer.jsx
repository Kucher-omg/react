import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatusThunk, UpdateStatusTextAC, updateStatusThunk, userProfileThunkCreator } from '../../Redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 12341;
    }
    this.props.userProfileThunk(userId);
    this.props.getStatus(userId);
  }


  render() {

    

    return (
      <div >

        <Profile updateStatus={this.props.updateStatus} status={this.props.status} {...this.props} profile={this.props.profile} />

      </div>
    );
  }
}



let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.statusText
});

export default compose(
  connect(mapStateToProps,
    {
      userProfileThunk: userProfileThunkCreator,
      getStatus: getStatusThunk,
      updateStatus: updateStatusThunk
    }),
  withRouter
  // AuthRedirect
)
(ProfileContainer);

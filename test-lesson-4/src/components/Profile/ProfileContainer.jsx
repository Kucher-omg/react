import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { userProfileThunkCreator } from '../../Redux/profile-reducer';
import { Redirect, withRouter } from 'react-router-dom';
import { AuthRedirect } from '../../hoc/AuthRedirect';


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
  profile: state.profilePage.profile
});

let authRedirectComponent = AuthRedirect(ProfileContainer);

let withUrlDataContainerComponent = withRouter(authRedirectComponent);




export default connect(mapStateToProps,
  {
    userProfileThunk: userProfileThunkCreator
  })(withUrlDataContainerComponent);
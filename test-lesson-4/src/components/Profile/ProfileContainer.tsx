import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { AuthRedirect } from '../../hoc/AuthRedirect';
import {
  getStatusThunk,
  userProfileThunkCreator
} from '../../Redux/profile-reducer';
import Profile from './Profile';



type ParamsType = {
  params: {
    userId: number
  }
}
type OwnPropsType = {
  match: ParamsType,
  id: number
}

const ProfilePage: React.FC<OwnPropsType> = (props) => {

  useEffect(() => {
    updateProfile()
  }, [])

  const dispatch = useDispatch()

  let [paramsId, changeParamsId] = useState(1)

  let updateProfile = () => {
    let userId = props.match.params.userId;
    if (!userId) {
      userId = props.id;
      if (!userId) {
        userId = 12341;
      }
    }
    dispatch(userProfileThunkCreator(userId));
    dispatch(getStatusThunk(userId));
    changeParamsId(userId)
  }

  useEffect(() => {
    if ((props.match.params.userId) != paramsId) {
      updateProfile();
    }
  }, [props.match.params.userId])


  // componentDidUpdate(prevProps: OwnPropsType) {
  //     if ((this.props.match.params.userId) != prevProps.match.params.userId) {
  //       // this.updateProfile();
  //     }
  //   }

  return (
    <div>
      <Profile
        isOwner={!props.match.params.userId}
      />
    </div>
  );
}

export default compose<React.ComponentType>(
  withRouter,
  AuthRedirect
)
  (ProfilePage);

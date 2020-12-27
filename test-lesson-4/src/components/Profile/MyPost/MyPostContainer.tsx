import { AddPostActionCreator } from '../../../Redux/profile-reducer';
import MyPost from './MyPost';
import { connect } from 'react-redux';
import { AppStateType } from '../../../Redux/Redux-store';
import { PostDataType } from '../../../types/types';

type PropsType = {
  newPostText: string,
  postsData: Array<PostDataType>,
  onAddPosts: (text: string) => void
}

let mapStateToProps = (state: AppStateType) => {
  return {
    newPostText: state.profilePage.newPostText,
    postsData: state.profilePage.postsData
  }
}

const MyPostContainer = connect
(mapStateToProps, {
  onAddPosts: AddPostActionCreator
})(MyPost);

export default MyPostContainer;
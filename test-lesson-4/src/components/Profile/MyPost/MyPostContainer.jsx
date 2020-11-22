import { AddPostActionCreator } from '../../../Redux/profile-reducer';
import MyPost from './MyPost';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
    postsData: state.profilePage.postsData
  }
}

let mapDispatchToProps = (dispatch) => {
  return{
    onAddPosts: (data) =>{
      let action = AddPostActionCreator(data);
      dispatch(action);
    }
  }
}

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);

export default MyPostContainer;
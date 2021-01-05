import React from 'react';
import classes from './MyPost.module.css';
import Post from './Post/Post';
import { reduxForm } from 'redux-form';
import MyPostForm from './MyPostForm';
import { PostDataType } from '../../../types/types';
import {reset} from 'redux-form';

let MyNewPost = reduxForm<MyPostValuesType>({
  form: 'newpost'
})(MyPostForm)

type PropsType = {
  postsData: Array<PostDataType>,
  onAddPosts: (text: string) => void
}

export type MyPostValuesType = {
  newPost: string
}

const MyPost: React.FC<PropsType> = React.memo(props => {
  console.log("RENDER");

  let Posts = props.postsData
    .map(posts => (<Post key={posts.message} message={posts.message} like={posts.like} />));

  let onSubmit = (formData: MyPostValuesType, dispatch: any) => {
    props.onAddPosts(formData.newPost);
    dispatch(reset('newpost'))
  }

  return (
    <div className={classes.discription_block}>
      <h3>
        My posts
        </h3>
      <div className={classes.discription_block}>
        <MyNewPost onSubmit={onSubmit} />
      </div>
      <div className={classes.posts}>

        {Posts}

      </div>

    </div>
  );

});


export default MyPost;
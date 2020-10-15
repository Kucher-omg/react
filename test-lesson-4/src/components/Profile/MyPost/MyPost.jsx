import React from 'react';
import { AddPostActionCreator, OnPostChangeActionCreator } from '../../../Redux/profile-reducer';
import classes from './MyPost.module.css';
import Post from './Post/Post';




const MyPost = (props) => {

  let Posts = props.postsData.map(posts => (<Post message={posts.message} like={posts.like}/>));

  let nemPostElement = React.createRef();

  let AddPosts = () => {
    props.dispatch(AddPostActionCreator());
  } 
  
  let onPostChange = () =>{
    let text = nemPostElement.current.value; 
    let action = OnPostChangeActionCreator(text);
    props.dispatch(action);
  }


  return (
    <div className={classes.discription_block}>
      <h3>
       My posts
      </h3>
      
      <div>
        <textarea onChange={onPostChange} ref={nemPostElement} value={props.newPostText}/>
      </div>
      <div>
        <button onClick={AddPosts}>Add</button>
      </div>

      <div className={classes.posts}>
        
        {Posts}

      </div>

    </div>
  );
}

export default MyPost;
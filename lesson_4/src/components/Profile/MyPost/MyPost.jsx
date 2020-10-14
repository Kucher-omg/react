import React from 'react';
import classes from './MyPost.module.css';
import Post from './Post/Post';
const MyPost = () => {
  return (
    <div>
      My posts
      <div>
        <textarea></textarea>
        <button>Add</button>
      </div>

      <div className={classes.posts}>
        <Post message="Hello it me" like='15'/>
        <Post message="Hi it me" like='20'/>
      </div>

    </div>
  );
}

export default MyPost;
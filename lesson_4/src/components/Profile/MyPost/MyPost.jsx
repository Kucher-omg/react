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

      <Post />
    </div>
  );
}

export default MyPost;
import React from 'react';
import classes from './Post.module.css';

const Post = () => {
  return (

    <div className={classes.posts}>
      <div className={classes.item}>
        post 1
        <div>
          <span>
            Like
          </span>
        </div>
      </div>
    </div>

  );
}

export default Post;
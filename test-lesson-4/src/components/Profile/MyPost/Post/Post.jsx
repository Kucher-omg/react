import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
  return (

      <div className={classes.item}>

        <img src="https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg"></img>
        
        <span>{props.message}</span>
          <div>
            {props.like} Likes
          </div>
      </div>
       
  );
}

export default Post;
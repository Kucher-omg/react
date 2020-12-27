import React from 'react';
import classes from './Post.module.css';

type PropsType = {
  message: string,
  like: number
}

const Post: React.FC<PropsType> = (props) => {
  return (

      <div className={classes.item}>

        <img src="https://www.pinclipart.com/picdir/middle/165-1653686_female-user-icon-png-download-user-colorful-icon.png"></img>
        
        <span>{props.message}</span>
          <div>
            {props.like} Likes
          </div>
      </div>
       
  );
}

export default Post;
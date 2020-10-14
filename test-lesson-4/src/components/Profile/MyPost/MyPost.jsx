import React from 'react';
import classes from './MyPost.module.css';
import Post from './Post/Post';



const MyPost = (props) => {

  let Posts = props.postsData.map(posts => (<Post message={posts.message} like={posts.like}/>));

  let nemPostElement = React.createRef();

  let AddPosts = () => {
    let action = {type: 'ADD-POST'};
    props.dispatch(action);
  }

  let onPostChange = () =>{
    let text = nemPostElement.current.value; 
    let action = {type: 'UPDATE-NEW-POST-TEXT', newText: text};
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
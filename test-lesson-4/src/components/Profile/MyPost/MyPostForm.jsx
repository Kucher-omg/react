import React from 'react';
import { Field } from 'redux-form';

const MyPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {/* <Field name="finetext" component="input" type="text"/> */}
        <Field name='newPost' component="input" type="text" />
      </div>

      <div>
        <button type="submit" >Add</button>
      </div>
    </form>
  );
}


export default MyPostForm;
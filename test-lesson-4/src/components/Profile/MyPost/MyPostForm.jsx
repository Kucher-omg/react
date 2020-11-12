import React from 'react';
import { Field } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../../Utils/Validators/validstors';
import { TextArea } from '../../common/FormControls/FormControls';

let maxLength30 = maxLengthCreator(30);

const MyPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {/* <Field name="finetext" component="input" type="text"/> */}
        <Field validate={[requiredField, maxLength30]} name='newPost' placeholder='New post' component={TextArea} type="text" />
      </div>

      <div>
        <button type="submit" >Add</button>
      </div>
    </form>
  );
}


export default MyPostForm;
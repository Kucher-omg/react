import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../../Utils/Validators/validstors';
import { TextArea } from '../../common/FormControls/FormControls';
import { MyPostValuesType } from './MyPost';

let maxLength30 = maxLengthCreator(30);


const MyPostForm: React.FC<InjectedFormProps<MyPostValuesType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        
        <Field validate={[requiredField, maxLength30]} name='newPost' placeholder='New post' component={TextArea} type="text" />
      </div>

      <div>
        <button type="submit" >Add</button>
      </div>
    </form>
  );
}


export default MyPostForm;
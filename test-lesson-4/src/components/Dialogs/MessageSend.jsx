import React from 'react';
import { Field } from 'redux-form'
import { requiredField, maxLengthCreator } from '../../Utils/Validators/validstors';
import { TextArea } from '../common/FormControls/FormControls';

let maxLength50 = maxLengthCreator(50);


const MessageSendForm = (props) => {

    return (

        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="message" placeholder='Your message' component={TextArea} validate={[requiredField, maxLength50]} type="text" />
            </div>

            <button type="submit">Add</button>
        </form>
    )
}

export default MessageSendForm;
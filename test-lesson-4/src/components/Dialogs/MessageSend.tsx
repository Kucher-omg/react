import React from 'react';
import { Field, InjectedFormProps } from 'redux-form'
import { requiredField, maxLengthCreator } from '../../Utils/Validators/validstors';
import { TextArea } from '../common/FormControls/FormControls';
import { MessageValuesType } from './Dialogs';

let maxLength50 = maxLengthCreator(50);

const MessageSendForm: React.FC<InjectedFormProps<MessageValuesType>> = (props) => {

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
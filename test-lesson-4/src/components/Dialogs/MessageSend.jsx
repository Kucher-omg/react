import React from 'react';
import { Field } from 'redux-form'


const MessageSendForm = (props) => {

    return (

        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="message" component="input" type="text" />
            </div>

            <button type="submit">Add</button>
        </form>
    )
}

export default MessageSendForm;
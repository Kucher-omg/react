import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react'
import { FilterType } from '../../Redux/users-reducer';

const userSerchFormValidators = (value: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChange: (filter: FilterType) => void
}

const UsersSurchForm: React.FC<PropsType> = React.memo((props) => {

    const Submit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setSubmitting(false);
        props.onFilterChange(values);
    }

    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: null }}
                validate={userSerchFormValidators}
                onSubmit={Submit}
            >

                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
})

export default UsersSurchForm
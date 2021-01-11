import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react'
import { useSelector } from 'react-redux';
import { FilterType } from '../../Redux/users-reducer';
import { getFilter } from '../../Redux/users-selectors';
import Friends from '../Friends/Friends';

const userSerchFormValidators = (value: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChange: (filter: FilterType) => void
}

const UsersSurchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getFilter)


    const Submit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setSubmitting(false);
        props.onFilterChange(values);
    } 
    // debugger
    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={{ term: filter.term, friend: String(filter.friend) }}
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
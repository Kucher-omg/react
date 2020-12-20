import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputText, TextArea } from '../../common/FormControls/FormControls';
import classes from './../../common/FormControls/FormControls.module.css';

const ProfileDataForm = (props) => {
    
    return (
        <form onSubmit={props.handleSubmit}>
            
            <div>
                Full name:
                <div>
                    <Field type="text" name='fullName' component={InputText} placeholder={'Full name'} />
                </div> 
                <div>
                    Looking for a job: 
                    <Field type="checkbox" name='lookingForAJob' component={InputText} placeholder={'Full name'} />                    
                </div>
                <div>
                    My skills: 
                    <div>
                        <Field type="text" name='lookingForAJobDescription' component={TextArea} placeholder={'My skills'} />
                    </div> 
                </div>
                <div>
                    About me: 
                    <div>
                        <Field type="text" name='aboutMe' component={TextArea} placeholder={'About me'} />
                    </div> 
                </div>
            </div>
            <div>
                About me: {props.profile.aboutMe}
            </div>
            <div>
                Contacts:
                {Object.keys(props.profile.contacts).map(key => {
                    return <div key={key}>
                        {key}: 
                        <div>
                            <Field type="text" name={'contacts.' + key} component={InputText} placeholder={key}/>
                        </div> 
                        {/* <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} /> */}
                    </div>
                })}  
            </div>
            {
                props.error 
                && <div className={classes.form_summary_error}> 
                    {props.error}
                </div>
            }
            <button>Submit</button>
        </form>
    );
}

const ProfileDataReduxForm = reduxForm({
    form: 'editProfile'
})(ProfileDataForm);

export default ProfileDataReduxForm;
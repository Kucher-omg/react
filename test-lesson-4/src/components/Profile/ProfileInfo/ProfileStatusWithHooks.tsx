import React, { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './ProfileInfo.module.css';

type PropsType = {
    updateStatus: (text: string) => void,
    status: string,

}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    const [Sizing, SetSize ] = useState({width: 0, height: 0});

    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const UnActiveEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
        SetSize({width: 10, height: 10});
        console.log("Size " + Sizing);
    }

    const OnStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            <div className={styles.inblock}>
                Статус: &nbsp;
                </div>
            {!editMode ?
                <div className={styles.inblock}>
                    <span className={styles.status} title='Click to change' onClick={activateEditMode}>
                        {props.status ? props.status : "No Status"}
                    </span>
                </div>
                :
                <div className={styles.inblock}>

                    <input onChange={OnStatusChange}
                        onBlur={UnActiveEditMode}
                        autoFocus={true} 
                        value={status}/>
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks;
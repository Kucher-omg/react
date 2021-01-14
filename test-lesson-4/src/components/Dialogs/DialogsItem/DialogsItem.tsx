import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DataType } from '../../../api/api';
import { getSelectedChatThunk } from '../../../Redux/dialogs-reducer';
import classes from './DialogItem.module.css';


const DialogItem: React.FC<{ key: number, user: DataType }> = ({ user }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const selectDialog = (userId: number) => {
        dispatch(getSelectedChatThunk(userId))
        history.push({
            pathname: `/dialogs/${userId}/messages`
        })
    }
    
    return (
        <div onClick={() => selectDialog(user.id)} className={classes.dialog}>
            <span>
                <img className={classes.avatar} src={user.photos.small ? user.photos.small : 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png'} alt='ava' />
            </span>
            <div>
                {user.userName}
            </div>
        </div>);
}

export default DialogItem;
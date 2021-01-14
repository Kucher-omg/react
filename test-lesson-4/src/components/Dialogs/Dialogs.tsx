import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { FormAction, reduxForm, reset } from 'redux-form';
import { DataType, MessagesDataType } from '../../api/api';
import { AuthRedirect } from '../../hoc/AuthRedirect';
import { getDialogsThunk, loadMoreMessagesThunk, sendMessageThunk } from '../../Redux/dialogs-reducer';
import { AppStateType } from '../../Redux/Redux-store';
import { MessageType } from '../../types/types';
import Preloader from '../common/Preloader/Preloader';
import classes from './Dialog.module.css';
import DialogItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';
import MessageSendForm from './MessageSend';

let MessageSend = reduxForm<MessageValuesType>({
    form: 'messagesend'
})(MessageSendForm)

export type MessageValuesType = {
    newMessageText: string
}

const Dialogs: React.FC = (props) => {

    useEffect(() => {
        dispatchR(getDialogsThunk())
    },[])
    
    const state = useSelector((state: AppStateType) => state.messagesPage)
    const dispatchR = useDispatch()

    let messagesGenerateLength = state.messagesData.length
    let [currentPage, setCurrentPage] = useState(1)
    let [prevCountMessages, setprevCountMessages] = useState(messagesGenerateLength)     
    let dialogsElement = state.dialogsUsersData
    .map((d: DataType) => (<DialogItem key={d.id} user={d} />));
    
    let messagesElement = state.messagesData
    .map((message: MessagesDataType) => (<Message message={message} />));

    const onSubmit = (formData: MessageValuesType, dispatch: Dispatch<FormAction>) => {
        debugger
        dispatchR(sendMessageThunk(state.selectedUserId, formData.newMessageText))
        dispatch(reset('sendMessage'))
    }
    const loadMoreMessages = () => {
        setprevCountMessages(messagesGenerateLength)
        
        dispatchR(loadMoreMessagesThunk(state.selectedUserId, currentPage + 1))
        setCurrentPage(currentPage+1)
    }
    if (state.isFetching) {
        // debugger
        return <Preloader />
    }
    return (
        <div className={classes.dialogs}>
            {state.isFetching && <Preloader/>}
            <div className={classes.dialogs_item}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
            {(state.selectedUserId !== 0 && state.messagesData.length !== 0) && <button onClick={loadMoreMessages}>Load more</button>}
               { (state.selectedUserId !== 0 && state.messagesData.length !== 0 && state.messagesData.length === prevCountMessages) && <div>You don`t have more messages</div> } 
                {messagesElement}
                <MessageSend onSubmit={onSubmit}/>
            </div>
        </div>
    );
}
export default compose<React.ComponentType>(
    AuthRedirect
)
(Dialogs);

import { close } from "inspector";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk, startMessagesListening, stopMessagesListening } from "../../../Redux/chat-reducer";
import { AppStateType } from "../../../Redux/Redux-store";


 
export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    );
}

const Chat: React.FC = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
    
    
    return (
        <div>
            <Messages/>
            <AddMessageForm />
        </div>
    );
}

const Messages: React.FC= () => {
    let messages = useSelector((state: AppStateType) => state.chat.messages)
   
    
    return (
        <div style={{ height: '400px', overflow: 'auto' }}>
            {messages.map((m: any, index: number) => <Message key={index} message={m}/>)}
        </div>
    );
}
   
const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    debugger
    return (
        <div >
            <img src={message.photo} alt="" />
            <b>{message.userName}</b>
            <br />
            {message.message}
        </div>
    );
}

const AddMessageForm: React.FC = () => {
    const [MessageText, ChangeMessageText] = useState('')
    const [isReady, changeIsReady] = useState<'pending' | 'ready'>('pending')
    
    const dispatch = useDispatch();
    
    const sendMessage = () => {
        if(!MessageText) return
        
        dispatch(sendMessageThunk(MessageText));
        
        ChangeMessageText('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => ChangeMessageText(e.currentTarget.value)} value={MessageText}>

                </textarea>
            </div>
            <div>
                <button onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatPage
import React, { useEffect, useState } from "react";



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
    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    );
}

const Messages: React.FC = (props) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    useEffect(() => {
        debugger
        ws.addEventListener('message', (e: MessageEvent) => {
            let newMessage = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessage])
        })
    }, [])
    
    return (
        <div style={{ height: '400px', overflow: 'auto' }}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
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

const AddMessageForm: React.FC = (props) => {
    const [MessageText, ChangeMessageText] = useState('')
    const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    const sendMessage = () => {
        // wsChannel.s
        if(!MessageText) return
        ws.send(MessageText);
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
import { close } from "inspector";
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
    const [ws, setWs] = useState<WebSocket | null>(null)
    
    useEffect(()=> {
        let wsChannel: WebSocket;
        const closeHandler = () => {
            setTimeout(connect, 1000);
        }
        function connect () {
            if(wsChannel !== null && wsChannel !== undefined){
                wsChannel.removeEventListener('close', closeHandler)
                wsChannel.close()
            }
            wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            
            wsChannel.addEventListener('close', closeHandler)
            setWs(wsChannel);
        }
        connect();
        return () => {
            wsChannel.removeEventListener('close', closeHandler)
            wsChannel.close()
        }
    }, [])
    useEffect(() => {
        if(ws !== null) {
            ws.addEventListener('close', () => {
                // alert('ddddd')
            })
        }
        
    }, [ws])
    return (
        <div>
            <Messages ws={ws}/>
            <AddMessageForm ws={ws}/>
        </div>
    );
}

const Messages: React.FC<{ws: WebSocket | null}> = ({ws}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    
    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            let newMessage = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessage])
        }
        if(ws !== null){
            ws.addEventListener('message', messageHandler)
        }
        return () => {
            if(ws !== null){
                ws.removeEventListener('message', messageHandler)
            }
            
        }
    }, [ws])
    
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

const AddMessageForm: React.FC<{ws: WebSocket | null}> = ({ws}) => {
    const [MessageText, ChangeMessageText] = useState('')
    const [isReady, changeIsReady] = useState<'pending' | 'ready'>('pending')
    
    useEffect(() => {
        const openEventhandler = () => {
            changeIsReady('ready')
        }
        if(ws !== null){
            ws.addEventListener('open', openEventhandler)
        }
        
        return () =>{
            if(ws !== null) {
                ws.removeEventListener('open', openEventhandler)
            }
            
        }
    }, [ws])

    // const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    const sendMessage = () => {
        // wsChannel.s
        if(!MessageText) return
        if(ws !== null) {
            ws.send(MessageText);
        }
        ChangeMessageText('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => ChangeMessageText(e.currentTarget.value)} value={MessageText}>

                </textarea>
            </div>
            <div>
                <button disabled={ws == null || isReady !== 'ready'} onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatPage
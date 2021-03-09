import { ChatMessageType } from './../components/pages/Chat/ChatPage';

let subscribers = [] as SubscriberType[]
let wsChannel: WebSocket;

const closeHandler = () => {
    setTimeout(connect, 1000);
}

const messageHandler = (e: MessageEvent) => {
    let newMessage = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessage))
    // setMessages((prevMessages) => [...prevMessages, ...newMessage])
}

function connect () {
    if(wsChannel !== null && wsChannel !== undefined){
        wsChannel.removeEventListener('close', closeHandler)
        wsChannel.close()
    }
    wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    
    wsChannel.addEventListener('close', closeHandler)
    wsChannel.addEventListener('message', messageHandler);
    // setWs(wsChannel);
}


export const ChatAPI = {
    start() {
        connect()
    },
    stop() {
        if(wsChannel !== null){
            subscribers = []
            wsChannel.removeEventListener('close', closeHandler)
            wsChannel.removeEventListener('message', messageHandler)
            wsChannel.close()
        }
    },
    subscribe(message: SubscriberType){
        subscribers.push(message)
        return () => {
            subscribers = subscribers.filter(s => s !== message)
        }
    },
    unsubscribe(message: SubscriberType){
        subscribers = subscribers.filter(s => s !== message)
    },
    sendMessage(message: string){
        if(wsChannel !== null){
            wsChannel.send(message)
        }
        
    }
}

export type SubscriberType = (messages: ChatMessageType[]) => void
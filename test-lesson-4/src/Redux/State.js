let rerenderEntireTree = () =>{
}


let state = {
    profilePage: {
        postsData : [
            { id: 1, message: 'Hello it me', like: 15 },
            { id: 2, message: 'Hi it me', like: 20 }
        ],
        newPostText: ""       
    },
    messagesPage: {
        messageData : [
            { id: 1, message: 'Hello it`s me' },
            { id: 2, message: 'hi' },
            { id: 3, message: 'lol' },
            { id: 4, message: 'alooo' }
        ],
        newMessText: "",
        dialogsData : [
            { id: 1, name: 'Vlad' },
            { id: 2, name: 'Diana' },
            { id: 3, name: 'Denis' },
            { id: 4, name: 'Roma' }
        ]
    },

    sidebar: {
        sidebarData:[
            { id: 1, name: 'Vlad' },
            { id: 2, name: 'Diana' },
            { id: 3, name: 'Denis' },
            { id: 4, name: 'Roma' }
        ]
    }

}

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export const addPost = () => {
    let newPost ={
        id: 3,
        message: state.profilePage.newPostText,
        like: 0
    };
    state.profilePage.postsData.push(newPost);
    state.profilePage.newPostText = "";
    rerenderEntireTree(state);
}

export const AddMessages = (newMessageText) =>{
    let newMessages ={
        id: 5,
        message: newMessageText
    };
    state.messagesPage.messageData.push(newMessages);
    rerenderEntireTree(state);
    state.messagesPage.newMessText = "";
}
 
export const updateNewMessText = (newText) => {
    state.messagesPage.newMessText = newText;
    rerenderEntireTree(state);
    
}

export const subscribe = (observer) =>{
    rerenderEntireTree = observer;
}

export default state;
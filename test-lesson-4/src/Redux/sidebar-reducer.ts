
type SideBarType = {
    id: number,
    name: string 
}
let initialState = {
    sidebarData:[
        { id: 1, name: 'Vlad' },
        { id: 2, name: 'Diana' },
        { id: 3, name: 'Denis' },
        { id: 4, name: 'Roma' }
    ] as Array<SideBarType>
};

type initialStateType = typeof initialState;

const sidebarReducer = (state = initialState, action: any): initialStateType =>{
    return state;
}


export default sidebarReducer;
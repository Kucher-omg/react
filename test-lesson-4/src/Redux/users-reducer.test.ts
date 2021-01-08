import usersReducer, { actions, initialStateType } from "./users-reducer"

let state: initialStateType;

beforeEach(() => {
    state = {
        usersData: [
            {
                id: 0,
                name: 'Vlad 0',
                photos: {
                    small: '',
                    large: ''
                },
                status: 'status 0',
                followed: false
            },
            {
                id: 1,
                name: 'Vlad 1',
                photos: {
                    small: '',
                    large: ''
                },
                status: 'status 0',
                followed: false
            },
            {
                id: 2,
                name: 'Vlad 2 ',
                photos: {
                    small: '',
                    large: ''
                },
                status: 'status 0',
                followed: true
            },
            {
                id: 3,
                name: 'Vlad 3',
                photos: {
                    small: '',
                    large: ''
                },
                status: 'status 0',
                followed: true
            }
        ],
        pageSize: 5,
        totalUsersCount: 50,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('Test follow success', () => {
    const newState = usersReducer(state, actions.FolloweAC(0));
    expect(newState.usersData[0].followed).toBeTruthy();
})

test('Test unfollow success', () => {
    const newState = usersReducer(state, actions.UnFolloweAC(3));

    expect(newState.usersData[3].followed).toBeFalsy();

})
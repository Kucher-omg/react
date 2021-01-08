import { FollowOrUnfollowType, ResultCodesEnum, usersAPI } from './../api/api';
import { followThunkCreator, unfollowThunkCreator } from "./users-reducer";
jest.mock('./../api/api');

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: FollowOrUnfollowType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

usersAPIMock.setFollow.mockReturnValue(Promise.resolve(result));
usersAPIMock.setUnfollow.mockReturnValue(Promise.resolve(result));
const dispatchMock = jest.fn()
const getStateMock = jest.fn() 

beforeEach(()=>{
    dispatchMock.mockClear();
    getStateMock.mockClear();
    usersAPIMock.setFollow.mockClear();
    usersAPIMock.setUnfollow.mockClear();
})

test('Test follow thunk', async () => {
    const thunk = followThunkCreator(1);
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3);
})



test('Test unfollow thunk', async () => {
    const thunk = unfollowThunkCreator(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
})
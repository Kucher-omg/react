import { GetCaptchaType, securityAPI } from "../api/api";
import { getCaptchaUrlThunkCreator } from "./auth-reducer";

jest.mock('../api/api');

const securityAPIMock = securityAPI as jest.Mocked<typeof securityAPI>

const result: any = {
    url: 'String'
}

securityAPIMock.getCapchaUrl.mockReturnValue(Promise.resolve(result))

const dispatchMock = jest.fn()
const getState = jest.fn()

test('', async () => {
    const Thunk = getCaptchaUrlThunkCreator();
    await Thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(1)
})
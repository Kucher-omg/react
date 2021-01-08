import { UsersDataType } from "../types/types";

export const userMapHelper = (array: Array<UsersDataType>, itemId: number, objectId: string, newObject: {followed: boolean}) => {
    return array.map((u: any) => {
        if (u[`${objectId}`] === itemId) {
            return { ...u, ...newObject }
        }
        return u;
    })
}
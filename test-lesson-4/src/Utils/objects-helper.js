
export const userMapHelper = (array, itemId, objectId, newObject) => {
    return array.map(u => {
        if (u[objectId] === itemId) {
            return { ...u, ...newObject }
        }
        return u;
    })
}
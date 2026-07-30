
interface Store {
    msg: string
}

interface Action {
    type: string
    payload?: any
}
export const initialStore = () => {
    return {
        msg: 'Hola'
    }
}

export const storeReducer = (store: Store, action: Action): Store => {
    switch (action.type) {
        case 'set_msg':
            return {
                ...store,
                msg: action.payload
            }
        default:
            throw Error('Unknow action.')
    }
}
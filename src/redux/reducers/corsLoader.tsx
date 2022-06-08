
export const enum ActionTypes {
    CHANGE_CORS = 'CHANGE_CORS',
}

const initialState= {
    isCorsActive: false,
}

export default function (state = initialState, action: { type: ActionTypes; payload: boolean }){
    switch (action.type){
        case ActionTypes.CHANGE_CORS:
            return { ...state, isCorsActive:action.payload}
        default:
            return state
    }
}
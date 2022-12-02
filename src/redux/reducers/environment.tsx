export const enum Environments {
    LOC ='LOCAL',
    DEV = 'DEV',
    QA = 'QA',
    PR = 'PR'
}
export const enum ActionTypes {
    CHANGE_ENV = 'CHANGE_ENV',
}

const initialState= {
    environment: Environments.DEV,
}

export default function (state = initialState, action: { type: ActionTypes; payload: Environments }){
    switch (action.type){
        case ActionTypes.CHANGE_ENV:
            return { ...state, environment:action.payload}
        default:
            return state
    }
}
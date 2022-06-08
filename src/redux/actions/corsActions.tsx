import {ActionTypes} from "../reducers/corsLoader";

export const setCorsLoader = (input:boolean) => {
    return {type:ActionTypes.CHANGE_CORS,payload:input}
}

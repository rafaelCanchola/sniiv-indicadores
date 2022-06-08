import {ActionTypes, Environments} from "../reducers/environment";

export const setEnvironment = (input:Environments) => {
    return {type:ActionTypes.CHANGE_ENV,payload:input}
}

import {createStore,applyMiddleware} from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from 'redux-thunk'

const middleware = applyMiddleware(thunkMiddleware)
export default createStore(rootReducer,middleware);
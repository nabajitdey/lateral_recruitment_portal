import loggedReducer from './isLogged';
import userInfoReducer from './userReducer';
import {combineReducers} from 'redux';

const allUserReducers =combineReducers({
    loggedReducer,userInfoReducer
});

export default allUserReducers;
import { combineReducers } from 'redux';
import apiReducer from './api.reducer';
import stateReducer from './state.reducer';
import userReducer from './user.reducer';


const rootReducer = combineReducers({
    api: apiReducer,
    state: stateReducer,
    user: userReducer
});


export default rootReducer;

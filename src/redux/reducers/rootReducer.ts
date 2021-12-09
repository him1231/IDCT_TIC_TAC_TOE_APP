import {combineReducers} from 'redux';
import generalReducer from './general';

const rootReducer = combineReducers({
  general: generalReducer,
});

export default rootReducer;

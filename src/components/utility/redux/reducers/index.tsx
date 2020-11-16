import { combineReducers } from 'redux';
import form from './form';
import common from './common';
import map from './map';

const rootReducer = combineReducers({
    form,
    common,
    map
});

export default rootReducer;
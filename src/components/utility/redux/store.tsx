import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from '../redux/reducers';
import promiseMiddleware  from './middleware';

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(promiseMiddleware);
    } else {
        // Enable additional logging in non-production environments.
        return applyMiddleware(promiseMiddleware,createLogger());
    }
};

const store = createStore(rootReducer, composeWithDevTools(getMiddleware()));

export default store;


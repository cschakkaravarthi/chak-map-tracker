import {
    ASYNC_START,
    ASYNC_END
} from '../../../constants/actionTypes';

const promiseMiddleware = (store: any) => (next: any) => (action: any) => {
    if (isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        const currentView = store.getState().viewChangeCounter;
        const skipTracking = action.skipTracking;

        action.payload.then(
            (res: any) => {
                const currentState = store.getState()
                if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                    return
                }
                action.payload = res;
                store.dispatch({ type: ASYNC_END, promise: action.payload, subtype: action.type });
                store.dispatch(action);
            },
            (error: any) => {
                const currentState = store.getState()
                if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                    return
                }
                action.error = true;
                action.payload = error.message;
                if (!action.skipTracking) {
                    store.dispatch({ type: ASYNC_END, promise: action.payload, subtype: action.type });
                }
                store.dispatch(action);
            }
        );
        return;
    }
    next(action);
};

function isPromise(payload: any) {
    return payload && typeof payload.then === 'function';
}

export default promiseMiddleware;
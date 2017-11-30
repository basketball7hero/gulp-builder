import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../redusers';


function configureStore() {
    if (process.env.NODE_ENV === 'development') {
        const middlewares = [
            thunk,
            createLogger({ collapsed: true })
        ].filter(Boolean);


        const store = createStore(
            rootReducer,
            composeWithDevTools(applyMiddleware(...middlewares))
        );


        return store;
    }


    if (process.env.NODE_ENV === 'production') {
        const middlewares = [
            thunk,
        ].filter(Boolean);


        const store = createStore(
            rootReducer,
            applyMiddleware(...middlewares)
        );


        return store;
    }


    return null;
}


export default configureStore;

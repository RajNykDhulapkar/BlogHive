import { combineReducers, compose, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import themeReducer from "./features/theme/theme.slice";
import { apiSlice } from "./features/api/api.slice";
import { composeWithDevTools } from 'remote-redux-devtools'

import { createWrapper, HYDRATE } from 'next-redux-wrapper';


const combinedReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});


const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        // console.log('HYDRATE', nextState);
        // if (state.count) nextState.count = state.count; // preserve count value on client side navigation
        if (state.theme.darkMode) nextState.theme = state.theme;
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const makeStore = (context) => createStore(reducer, composeEnhancers());
const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 })

const customMiddleWare = store => next => action => {
    // console.log("Middleware triggered:", "action");
    next(action);
}

export function makeStore(initialState) {
    return configureStore({
        reducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(apiSlice.middleware, customMiddleWare)
        },
        // devTools: false,
        // enhancers: composeWithDevTools({ realtime: true, port: 8000 })
    });
}

const store = makeStore();

export const wrapper = createWrapper(makeStore, { debug: true });


export default store;
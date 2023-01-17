import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";

export function makeStore(initialState) {
    return configureStore({
        reducer: {
            // Add your reducers here
            auth: authReducer,
        },
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
}

const store = makeStore();

export default store;
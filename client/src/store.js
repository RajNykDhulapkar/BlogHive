import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import themeReducer from "./features/theme/theme.slice";

export function makeStore(initialState) {
    return configureStore({
        reducer: {
            // Add your reducers here
            auth: authReducer,
            theme: themeReducer,
        },
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
}

const store = makeStore();

export default store;
import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./auth.api";

const initialState = {
    user: null,
    status: "idle",
    error: null,
    loading: false,
    success: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.loading = true;
                state.success = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                state.loading = false;
                state.success = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                state.loading = false;
                state.success = false;
            });
    },
});

export const { login } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
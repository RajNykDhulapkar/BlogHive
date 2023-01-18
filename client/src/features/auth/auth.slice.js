import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./auth.api";

const initialState = {
    user: null,
    status: "idle",
    error: null,
    loading: false,
    success: false,

    registerStatus: "idle",
    registerError: null,
    registerLoading: false,
    registerSuccess: false,
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
            })
            .addCase(registerUser.pending, (state) => {
                state.registerStatus = "loading";
                state.registerLoading = true;
                state.registerSuccess = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerStatus = "succeeded";
                state.registerLoading = false;
                state.registerSuccess = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerStatus = "failed";
                state.registerError = action.error.message;
                state.registerLoading = false;
                state.registerSuccess = false;
            });
    },
});

export const { login } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export const selectAuthRegisterStatus = (state) => ({
    status: state.auth.registerStatus,
    error: state.auth.registerError,
    loading: state.auth.registerLoading,
    success: state.auth.registerSuccess,
});

export default authSlice.reducer;
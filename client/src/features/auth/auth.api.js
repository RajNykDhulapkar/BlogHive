import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials) => {
        try {
            const response = await axiosInstance.post("/api/auth/login", credentials);
            return response.data;
        } catch (error) {
            // throw new Error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (credentials) => {
        try {
            const response = await axiosInstance.post(
                "/api/auth/register",
                credentials
            );
            return response.data;
        } catch (error) {
            // throw new Error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
);
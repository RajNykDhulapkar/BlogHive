import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios"

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials) => {
        try {
            const response = await axiosInstance.post("/api/auth/login", credentials);
            console.log(response.data);
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

export const getUser = createAsyncThunk(
    "auth/getUser",
    async () => {
        try {
            console.log("getUser called");
            const response = await axiosInstance.get("/api/user/me", {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // throw new Error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
);
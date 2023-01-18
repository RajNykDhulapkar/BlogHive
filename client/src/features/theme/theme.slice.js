import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // darkMode: localStorage.getItem("darkMode") === "true" ? true : false,
    darkMode: false,
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleDarkTheme: (state) => {
            state.darkMode = !state.darkMode;
            // localStorage.setItem("darkMode", state.darkMode);
        }
    },
});

export const { toggleDarkTheme } = themeSlice.actions;

export const selectDarkMode = (state) => state.theme.darkMode;

export default themeSlice.reducer;
import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import { selectDarkMode } from "../features/theme/theme.slice";

const BlogLayout = ({ children }) => {
    const darkMode = useSelector(selectDarkMode);
    return (
        <div className={darkMode ? "dark" : ""}>
            <Header />
            {children}
        </div>
    );
};

export default BlogLayout;

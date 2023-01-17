import React from "react";
import Header from "../components/Header/Header";

const BlogLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default BlogLayout;

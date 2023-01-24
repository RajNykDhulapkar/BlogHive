import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import { selectDarkMode } from "../features/theme/theme.slice";

const BlogLayout = ({ children }) => {
    const darkMode = useSelector(selectDarkMode);
    return (
        <div className={(darkMode ? "dark" : "") + " flex flex-col min-h-screen"}>
            <Header />
            <div className='flex-grow'>{children}</div>
            <div className='w-full flex-grow h-fit flex flex-col gap-2 justify-end p-2'>
                {/* footer  */}
                <div className='flex justify-center items-center '>
                    <p className='text-sm text-gray-500'>© 2021 - All Rights Reserved</p>
                </div>
                {/* attribution  */}
                <div className='flex justify-center items-center'>
                    <p className='text-sm text-gray-500'>
                        Made with ❤️ by
                        <a
                            className='text-blue-500'
                            href='https://github.com/RajNykDhulapkar'
                            target='_blank'
                            rel='noreferrer'
                        >
                            @rajnykdhulapkar
                        </a>
                        {"  "}
                        using{" "}
                        <a
                            className='text-blue-500'
                            href='https://nextjs.org/'
                            target='_blank'
                            rel='noreferrer'
                        >
                            Next.js
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogLayout;

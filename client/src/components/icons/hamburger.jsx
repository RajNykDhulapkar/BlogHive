import React from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/theme/theme.slice";

const HamburgerIcon = ({ ...props }) => {
    const darkMode = useSelector(selectDarkMode);
    return (
        <svg
            {...props}
            aria-hidden='true'
            fill={darkMode ? "white" : "black"}
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
            />
        </svg>
    );
};

export default HamburgerIcon;

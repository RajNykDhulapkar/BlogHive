import Link from "next/link";
import React from "react";
import ProfileIcon from "../icons/profile";
import HamburgerIcon from "../icons/hamburger";
import CancelIcon from "../icons/cancel";

const navLinks = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "New",
        path: "/new",
    },
    {
        title: "Popular",
        path: "/popular",
    },
    {
        title: "Trending",
        path: "/trending",
    },
    {
        title: "Categories",
        path: "/categories",
    },
];

const Header = () => {
    const [showMenu, setShowMenu] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(false);
    return (
        <header className='font-inconsolata p-2 shadow-md'>
            {/* container */}
            <div className='container flex flex-row justify-between'>
                {/* logo with name */}
                <Link className='flex flex-row justify-start items-center gap-2' href='/'>
                    <img className='w-10 h-10' src='/logo.svg' alt='logo' />
                    <h1 className='font-extrabold text-3xl'>Blog Hive</h1>
                </Link>
                <div className='flex flex-row gap-1'>
                    {/* profile toggle */}
                    <button onClick={() => setShowProfile((prev) => !prev)}>
                        <ProfileIcon className='w-10 h-10' />
                    </button>

                    {/* nav links toggle menu*/}
                    <button onClick={() => setShowMenu((prev) => !prev)}>
                        {showMenu ? (
                            <HamburgerIcon className='w-10 h-10' />
                        ) : (
                            <CancelIcon className='w-10 h-10' />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

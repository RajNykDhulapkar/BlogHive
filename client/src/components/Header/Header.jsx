import Link from "next/link";
import React, { useEffect } from "react";
import ProfileIcon from "../icons/profile";
import HamburgerIcon from "../icons/hamburger";
import CancelIcon from "../icons/cancel";
import { useRouter } from "next/router";
import SearchIcon from "../icons/search";
import authSlice, { selectUser } from "../../features/auth/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../features/auth/auth.api";
import { selectDarkMode, toggleDarkTheme } from "../../features/theme/theme.slice";
import SunIcon from "../icons/sun";
import MoonIcon from "../icons/moon";

const navLinks = [
    {
        index: 0,
        title: "Home",
        path: "/",
    },
    {
        index: 1,
        title: "New",
        path: "/new",
    },
    {
        index: 2,
        title: "Popular",
        path: "/popular",
    },
    {
        index: 3,
        title: "Trending",
        path: "/trending",
    },
    {
        index: 4,
        title: "Categories",
        path: "/categories",
    },
    {
        index: 5,
        title: "Community",
        path: "/community",
    },
];

const profileNavLinks = {
    loggedIn: [
        {
            index: 0,
            title: "Dashboard",
            path: "/profile",
        },
        {
            index: 1,
            title: "Settings",
            path: "/settings",
        },
        {
            index: 2,
            title: "Logout",
            path: "/auth/logout",
        },
    ],
    loggedOut: [
        {
            index: 0,
            title: "Login",
            path: "/auth/login",
        },
        {
            index: 1,
            title: "Register",
            path: "/auth/register",
        },
    ],
};

const Header = () => {
    const router = useRouter();
    const [showMenu, setShowMenu] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(false);

    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const darkMode = useSelector(selectDarkMode);

    useEffect(() => {
        // if user is null but cookie is set to a valid token
        // then fetch user data and set to user in state
        // else do nothing
        if (!user) {
            try {
                dispatch(getUser());
            } catch (error) {
                console.log("no user found logged in");
                console.log(error.message);
            }
        }
    }, [user]);

    const [navIndex, setNavIndex] = React.useState(() => {
        const path = router.asPath;
        const index = navLinks.findIndex((link) => link.path === path);
        return index === -1 ? 0 : index;
    });
    const [profileNavIndex, setProfileNavIndex] = React.useState(() => {
        const path = router.asPath;
        const index = user
            ? profileNavLinks.loggedIn.findIndex((link) => link.path === path)
            : profileNavLinks.loggedOut.findIndex((link) => link.path === path);
        return index === -1 ? -1 : index;
    });

    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        const path = router.asPath;
        let index = navLinks.findIndex((link) => link.path === path);
        setNavIndex(index === -1 ? 0 : index);
        index = user
            ? profileNavLinks.loggedIn.findIndex((link) => link.path === path)
            : profileNavLinks.loggedOut.findIndex((link) => link.path === path);
        setProfileNavIndex(index === -1 ? -1 : index);
        setTimeout(() => {
            setShowMenu(false);
            setShowProfile(false);
        }, 100);
    }, [router.asPath, user]);

    const handleSearchInputChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <header className='font-inconsolata p-2 bg-gray-100 shadow-md dark:shadow-md dark:shadow-white dark:bg-ph-black dark:text-white fixed z-10  top-0 w-full'>
            {/* container */}
            <div className='container sm:w-10/12 sm:mx-auto md:w-9/12 flex flex-row justify-between'>
                {/* logo with name */}
                <Link className='' href='/'>
                    <div className='flex flex-row justify-start items-center gap-2'>
                        <img className='w-10 h-10' src='/logo.svg' alt='logo' />
                        <h1 className='font-extrabold text-3xl'>Blog Hive</h1>
                    </div>
                </Link>

                {/* larger than md screen  */}

                <div className='hidden md:flex flex-row gap-4 items-center'>
                    {/* nav links */}
                    <div className='flex flex-row gap-4 items-center'>
                        {navLinks.map((link, index) => (
                            <Link href={link.path}>
                                <span
                                    key={index}
                                    className={`${
                                        navIndex === link.index
                                            ? "text-ph-blue font-bold"
                                            : "text-gray-500"
                                    } text-lg  cursor-pointer hover:text-ph-blue transition-all duration-300 ease-in-out`}
                                >
                                    {link.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className='hidden md:flex flex-row gap-2 items-center justify-center'>
                    <button
                        onClick={() => {
                            setShowMenu(false);
                            setShowProfile((prev) => !prev);
                        }}
                    >
                        <SearchIcon className='w-9 h-9' />
                    </button>
                    <button
                        onClick={() => {
                            setShowMenu(false);
                            setShowProfile((prev) => !prev);
                        }}
                    >
                        <ProfileIcon className='w-10 h-10' />
                    </button>
                </div>

                {/* end larger than md screen  */}

                <div className='flex flex-row gap-1 md:hidden'>
                    {/* profile toggle */}
                    <button
                        onClick={() => {
                            setShowMenu(false);
                            setShowProfile((prev) => !prev);
                        }}
                    >
                        <ProfileIcon className='w-10 h-10' />
                    </button>

                    {/* nav links toggle menu*/}
                    <button
                        onClick={() => {
                            setShowProfile(false);
                            setShowMenu((prev) => !prev);
                        }}
                    >
                        {!showMenu ? (
                            <HamburgerIcon className='w-10 h-10' />
                        ) : (
                            <CancelIcon className='w-10 h-10' />
                        )}
                    </button>
                </div>
                {showMenu && (
                    <div className='absolute z-10 left-[0.5rem] top-[4.2rem] w-[calc(100%-1rem)] shadow-md overflow-hidden rounded-lg '>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <SearchIcon className='w-5 h-5 text-gray-500' />
                        </div>
                        <input
                            type='text'
                            id='search-navbar'
                            className='block w-full p-2 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='Search...'
                            value={search}
                            onChange={handleSearchInputChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    console.log("search", search);
                                }
                            }}
                        />
                    </div>
                )}

                {showMenu && (
                    <div className='absolute z-10 border bg-slate-50 left-[0.5rem] top-[7.5rem] w-[calc(100%-1rem)] rounded-md shadow-md p-4'>
                        <ul className='w-full m-0 p-0 flex flex-col gap-1'>
                            {navLinks.map((link) => (
                                <li
                                    key={link.index}
                                    className={
                                        (navIndex == link.index
                                            ? `bg-[#ffa31a] text-white `
                                            : `hover:bg-slate-200 `) +
                                        "text-lg font-bold p-2 rounded-md"
                                    }
                                    onClick={() => router.push(link.path)}
                                >
                                    {link.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {showProfile && (
                    <div className='absolute z-10 border bg-slate-50 right-[0.5rem] top-[4.2rem] w-[calc(90%-1rem)] md:w-[30%] md:right-[calc(100%*1.5/12)] rounded-md shadow-md p-4'>
                        {user && (
                            <div className='flex flex-row justify-between items-center w-full border-b-2 border-gray-600 pb-1 mb-1'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <img
                                        className='w-10 h-10 rounded-full border-2 border-[#ffa31a]'
                                        src='/images/profile.png'
                                        alt='profile'
                                    />
                                    <div className='flex flex-col'>
                                        <h1 className='text-lg  font-bold'>{user.name}</h1>
                                        <h1 className='text-sm  font-poppins '>{user.email}</h1>
                                    </div>
                                </div>
                                <button
                                    className='text-sm font-medium text-red-500 border-2 shadow-stone-500 flex flex-row justify-center items-center rounded-md p-1'
                                    onClick={() => {
                                        dispatch(toggleDarkTheme());
                                    }}
                                >
                                    {darkMode ? (
                                        <SunIcon className='w-6 h-6' fill='grey' />
                                    ) : (
                                        <MoonIcon className='w-6 h-6' fill='black' />
                                    )}
                                </button>
                            </div>
                        )}
                        <ul className='w-full m-0 p-0 flex flex-col gap-1'>
                            {user
                                ? profileNavLinks.loggedIn.map((link) => (
                                      <li
                                          key={"profile-link-" + link.index}
                                          className={
                                              (profileNavIndex == link.index
                                                  ? `bg-[#ffa31a] text-white `
                                                  : `hover:bg-slate-200 `) +
                                              "text-lg font-bold p-2 rounded-md"
                                          }
                                          onClick={() => router.push(link.path)}
                                      >
                                          {link.title}
                                      </li>
                                  ))
                                : profileNavLinks.loggedOut.map((link) => (
                                      <li
                                          key={"profile-link-" + link.index}
                                          className={
                                              (profileNavIndex == link.index
                                                  ? `bg-[#ffa31a] text-white `
                                                  : `hover:bg-slate-200 `) +
                                              "text-lg font-bold p-2 rounded-md"
                                          }
                                          onClick={() => router.push(link.path)}
                                      >
                                          <Link className='w-full h-full' href={link.path}>
                                              {link.title}
                                          </Link>
                                      </li>
                                  ))}
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

import Link from "next/link";
import React from "react";
import ProfileIcon from "../icons/profile";
import HamburgerIcon from "../icons/hamburger";
import CancelIcon from "../icons/cancel";
import { useRouter } from "next/router";
import SearchIcon from "../icons/search";
import { selectUser } from "../../features/auth/auth.slice";
import { useSelector } from "react-redux";

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

    const user = useSelector(selectUser);

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
        <header className='font-inconsolata p-2 shadow-md'>
            {/* container */}
            <div className='container flex flex-row justify-between'>
                {/* logo with name */}
                <Link className='' href='/'>
                    <div className='flex flex-row justify-start items-center gap-2'>
                        <img className='w-10 h-10' src='/logo.svg' alt='logo' />
                        <h1 className='font-extrabold text-3xl'>Blog Hive</h1>
                    </div>
                </Link>
                <div className='flex flex-row gap-1'>
                    {/* profile toggle */}
                    <button onClick={() => setShowProfile((prev) => !prev)}>
                        <ProfileIcon className='w-10 h-10' />
                    </button>

                    {/* nav links toggle menu*/}
                    <button onClick={() => setShowMenu((prev) => !prev)}>
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
                            <SearchIcon />
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
                    <div className='absolute z-10 border bg-slate-50 left-[0.5rem] top-[4.2rem] w-[calc(100%-1rem)] rounded-md shadow-md p-4'>
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

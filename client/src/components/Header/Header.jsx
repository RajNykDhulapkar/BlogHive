import Link from "next/link";
import React from "react";
import ProfileIcon from "../icons/profile";
import HamburgerIcon from "../icons/hamburger";
import CancelIcon from "../icons/cancel";
import { useRouter } from "next/router";

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

const Header = () => {
    const router = useRouter();
    const [showMenu, setShowMenu] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(false);
    const [navIndex, setNavIndex] = React.useState(() => {
        const path = router.asPath;
        const index = navLinks.findIndex((link) => link.path === path);
        return index === -1 ? 0 : index;
    });

    React.useEffect(() => {
        const path = router.asPath;
        const index = navLinks.findIndex((link) => link.path === path);
        setNavIndex(index === -1 ? 0 : index);
        console.log("navIndex", navIndex);
    }, [router.asPath]);

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
                        {!showMenu ? (
                            <HamburgerIcon className='w-10 h-10' />
                        ) : (
                            <CancelIcon className='w-10 h-10' />
                        )}
                    </button>
                </div>
                {showMenu && (
                    <div className='absolute bg-slate-50 left-[0.5rem] top-[4.2rem] w-[calc(100%-1rem)] rounded-md shadow-md p-4'>
                        <ul className='w-full m-0 p-0 flex flex-col gap-0'>
                            {navLinks.map((link) => (
                                <li
                                    key={link.index}
                                    className={
                                        (navIndex == link.index ? `bg-[#ffa31a] text-white ` : ``) +
                                        "text-lg font-bold p-2 rounded-md"
                                    }
                                >
                                    <Link href={link.path}>{link.title}</Link>
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

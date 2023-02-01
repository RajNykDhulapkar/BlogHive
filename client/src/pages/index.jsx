import Head from "next/head";
import Image from "next/image";
import BlogLayout from "../layouts/BlogLayout";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";

import {
    apiSlice,
    getMorePosts,
    useGetMorePostsQuery,
    useGetPostsQuery,
} from "../features/api/api.slice";
import { useEffect, useState } from "react";
import Link from "next/link";
import ClockIcon from "../components/icons/clock";
import HeartIcon from "../components/icons/heart";
import { wrapper } from "../store";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import useWindowSize from "../hooks/useWindowSize";

const Home = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery(page);
    const [posts, setPosts] = useState([]);

    // const size = useWindowSize();
    // console.log(size);
    const handleLodeMore = () => {
        console.log("load more");
        setPage((page) => page + 1);
    };

    useEffect(() => {
        setPage(2);
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setPosts((prev) => [...new Set([...prev, ...data])]);
            // console.log(posts);
        }
    }, [isLoading, isSuccess, page, data]);

    return (
        <div className='w-[calc(100%-2rem)] sm:w-10/12 md:w-9/12  m-auto mt-[3.5rem] p-1'>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : isSuccess ? (
                posts.length > 0 && (
                    <>
                        <div className='p-2 shadow-lg bg-gray-100 md:grid md:grid-cols-2 md:grid-rows-[1fr_auto] '>
                            <Image
                                className='rounded-md w-full h-[12rem] object-cover md:row-span-2 md:h-[20rem]'
                                src={posts[0].bannerImage}
                                width={500}
                                height={500}
                                alt='main-banner-image'
                            />
                            <div className='p-2 md:p-4 md:h-full'>
                                <h1 className='text-xl md:text-3xl font-bold'>{posts[0].title}</h1>
                                <p className='text-sm hidden md:block md:text-base md:mt-3'>
                                    {posts[0].excerpt}{" "}
                                    <Link
                                        className='text-blue-500'
                                        href={`/posts/${posts[0].slug}`}
                                    >
                                        Read More
                                    </Link>
                                </p>
                                <p className='text-sm md:hidden md:text-base'>
                                    {posts[0].excerpt.slice(0, 100)}...{" "}
                                    <Link
                                        className='text-blue-500'
                                        href={`/posts/${posts[0].slug}`}
                                    >
                                        Read More
                                    </Link>
                                </p>
                            </div>
                            <div className='flex px-2 mt-1 flex-row gap-2 items-center md:h-fit md:p-4 md:align-bottom'>
                                <Image
                                    width={50}
                                    height={50}
                                    className='w-10 h-10 rounded-full border-2 border-[#ffa31a]'
                                    src='/images/profile.png'
                                    alt='profile'
                                />
                                <div className='flex flex-col'>
                                    <h1 className='text-lg  font-bold'>{posts[0].author.name}</h1>
                                    <h1 className='text-sm  font-poppins '>
                                        {posts[0].author.email.split("@")[0]}
                                    </h1>
                                </div>
                                <div className=' flex flex-col gap-1 flex-1 justify-between items-end'>
                                    <span className='flex justify-center items-center gap-1'>
                                        <ClockIcon className='w-4 h-4' />{" "}
                                        <p className='text-sm'>2 days ago</p>
                                    </span>
                                    <span className='flex justify-center  items-center gap-1'>
                                        <HeartIcon className='w-4 h-4' />{" "}
                                        <p className='text-sm'>234</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4 flex flex-col gap-4 md:grid md:grid-cols-2'>
                            {posts.slice(1).map((post) => (
                                <div key={post.id} className='p-2 shadow-md bg-gray-100 flex gap-2'>
                                    <Image
                                        width={200}
                                        height={200}
                                        className='rounded-md w-1/3 h-[8rem] object-cover md:h-[15rem]'
                                        src={post.bannerImage}
                                        alt='main-banner-image'
                                    />
                                    <div className='px-1 md:flex md:flex-col'>
                                        <h1 className='text-lg md:text-2xl  font-bold break-all'>
                                            {post.title.slice(0, 35)}
                                        </h1>
                                        <p className='text-sm hidden md:flex-grow md:block md:text-base md:mt-3'>
                                            {post.excerpt.slice(0, 100)}{" "}
                                            <Link
                                                className='text-blue-500'
                                                href={`/posts/${post.slug}`}
                                            >
                                                Read More
                                            </Link>
                                        </p>
                                        <p className='text-sm md:hidden md:text-base'>
                                            {post.excerpt.slice(0, 50)}...{" "}
                                            <Link
                                                className='text-blue-500'
                                                href={`/posts/${post.slug}`}
                                            >
                                                Read More
                                            </Link>
                                        </p>
                                        <div className='flex w-full md:hidden justify-between py-1'>
                                            <span className='flex justify-center items-center gap-1'>
                                                <ClockIcon className='w-4 h-4' />{" "}
                                                <p className='text-sm'>2 days ago</p>
                                            </span>
                                            <span className='flex justify-center items-center gap-1'>
                                                <HeartIcon className='w-4 h-4' />{" "}
                                                <p className='text-sm'>234</p>
                                            </span>
                                        </div>
                                        <div className='px-2 mt-1 gap-2 items-center hidden flex-grow-0 md:flex md:flex-row  md:h-fit md:p-4 md:align-bottom'>
                                            <Image
                                                width={50}
                                                height={50}
                                                className='w-10 h-10 rounded-full border-2 border-[#ffa31a]'
                                                src='/images/profile.png'
                                                alt='profile'
                                            />
                                            <div className='flex flex-col'>
                                                <h1 className='text-lg  font-bold'>
                                                    {posts[0].author.name}
                                                </h1>
                                                <h1 className='text-sm  font-poppins '>
                                                    {posts[0].author.email.split("@")[0]}
                                                </h1>
                                            </div>
                                            <div className=' flex flex-col gap-1 flex-1 justify-between items-end'>
                                                <span className='flex justify-center items-center gap-1'>
                                                    <ClockIcon className='w-4 h-4' />{" "}
                                                    <p className='text-sm'>2 days ago</p>
                                                </span>
                                                <span className='flex justify-center  items-center gap-1'>
                                                    <HeartIcon className='w-4 h-4' />{" "}
                                                    <p className='text-sm'>234</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* pagination */}
                        <div className='flex justify-center items-center my-4'>
                            <button
                                onClick={handleLodeMore}
                                className='px-4 py-2 bg-[#ffa31a] text-white rounded-md'
                            >
                                Load More
                            </button>
                        </div>
                    </>
                )
            ) : null}
        </div>
    );
};

Home.getLayout = function getLayout(page) {
    return <BlogLayout>{page}</BlogLayout>;
};

Home.getInitialProps = wrapper.getInitialPageProps((store) => async ({ req, res }) => {
    // const cookies = getCookies({ req, res });
    // console.log("accessToken", cookies?.accessToken);
    await store.dispatch(apiSlice.endpoints.getPosts.initiate());
});

export default Home;

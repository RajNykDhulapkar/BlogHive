import Head from "next/head";
import Image from "next/image";
import BlogLayout from "../layouts/BlogLayout";

const Trending = () => {
    return <div className='font-inconsolata font-extrabold text-xl'>Trending</div>;
};

Trending.getLayout = function getLayout(page) {
    return <BlogLayout>{page}</BlogLayout>;
};

export default Trending;

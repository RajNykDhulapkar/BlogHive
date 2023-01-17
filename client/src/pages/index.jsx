import Head from "next/head";
import Image from "next/image";
import BlogLayout from "../layouts/BlogLayout";

const Home = () => {
    return <div className='font-inconsolata font-extrabold text-xl'>Home</div>;
};

Home.getLayout = function getLayout(page) {
    return <BlogLayout>{page}</BlogLayout>;
};

export default Home;

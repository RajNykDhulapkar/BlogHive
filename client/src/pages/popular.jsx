import Head from "next/head";
import Image from "next/image";
import BlogLayout from "../layouts/BlogLayout";

const Popular = () => {
    return <div className='font-inconsolata font-extrabold text-xl'>Popular</div>;
};

Popular.getLayout = function getLayout(page) {
    return <BlogLayout>{page}</BlogLayout>;
};

export default Popular;

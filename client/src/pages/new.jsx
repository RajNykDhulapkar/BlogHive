import Head from "next/head";
import Image from "next/image";
import BlogLayout from "../layouts/BlogLayout";

const New = () => {
    return <div className='font-inconsolata font-extrabold text-xl'>New</div>;
};

New.getLayout = function getLayout(page) {
    return <BlogLayout>{page}</BlogLayout>;
};

export default New;

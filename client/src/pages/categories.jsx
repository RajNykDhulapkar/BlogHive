import Head from "next/head";
import Image from "next/image";
import BlogLayout from "../layouts/BlogLayout";

const Categories = () => {
    return <div className='font-inconsolata font-extrabold text-xl'>Categories</div>;
};

Categories.getLayout = function getLayout(page) {
    return <BlogLayout>{page}</BlogLayout>;
};

export default Categories;

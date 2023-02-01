import React from "react";
import BlogLayout from "../../layouts/BlogLayout";
import { useRouter } from "next/router";

const PostPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    return <div className='w-[calc(100%-2rem)] sm:w-10/12 md:w-9/12  m-auto mt-[3.5rem] p-1'></div>;
};

PostPage.getLayout = function getLayout(page) {
    return <BlogLayout>{page}</BlogLayout>;
};

export default PostPage;

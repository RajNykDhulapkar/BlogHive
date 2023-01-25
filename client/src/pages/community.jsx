import Head from "next/head";
import Image from "next/image";
import BlogLayout from "../layouts/BlogLayout";

const cards = [
    {
        title: "Share your mind",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, voluptate.",
        image: "/images/women-on-laptop.jpg",
        imageAlt: "women-on-laptop",
    },

    {
        title: "Build your network",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, voluptate.",
        image: "/images/people-talking.jpg",
        imageAlt: "people-talking",
    },

    {
        title: "Inspire others",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, voluptate.",
        image: "/images/inspire-others.jpg",
        imageAlt: "inspire-others",
    },

    {
        title: "Get inspired",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, voluptate.",
        image: "/images/get-inspired.jpeg",
        imageAlt: "get-inspired",
    },
];

const Community = () => {
    return (
        <>
            {/* hero section  */}
            <div className='w-full mt-[3.5rem]'>
                {/* hero image contain  */}
                <div className='w-full h-[21rem] relative'>
                    {/* blender div  */}
                    <div className='absolute z-[1] text-white top-0 left-0 w-full h-full bg-gradient-to-b from-gray-500 to-transparent'>
                        <div className='w-[calc(100%-2rem)] m-auto h-full flex flex-col justify-center items-center font-lato '>
                            <h1 className='text-4xl  text-center font-extrabold '>
                                Join the community
                            </h1>
                            <p className='text-sm text-center font-sans '>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                                quod. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Doloribus, voluptate.
                            </p>

                            <div className='flex flex-col md:flex-row gap-2 mt-2'>
                                <button className='px-4 py-2 bg-[#ffa31a] text-white rounded-md mt-4'>
                                    Join Whatsapp
                                </button>

                                <button className='px-4 py-2 bg-[#7289da] text-white rounded-md mt-4'>
                                    Join Discord
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* hero image  */}
                    <div>
                        <div className='md:hidden'>
                            <Image
                                src='/images/community-hero-4-desktop.webp'
                                layout='fill'
                                objectFit='cover'
                                className=''
                            />
                        </div>
                        <div className='hidden md:inline-flex lg:hidden'>
                            <Image
                                src='/images/community-hero-1-desktop.webp'
                                layout='fill'
                                objectFit='cover'
                                className=''
                            />
                        </div>
                        <div className='hidden lg:inline-flex xl:hidden'>
                            <Image
                                src='/images/community-hero-2-desktop.webp'
                                layout='fill'
                                objectFit='cover'
                                className=''
                            />
                        </div>
                        <div className='hidden xl:inline-flex'>
                            <Image
                                src='/images/community-hero-3-desktop.webp'
                                layout='fill'
                                objectFit='cover'
                                className=''
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[calc(100%-2rem)] m-auto mt-[1rem] p-1'>
                {/* cards  */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {cards.map((card, index) => (
                        <div key={index} className='bg-white rounded-md shadow-md p-1'>
                            <div className='w-full h-[10rem] relative'>
                                <div className='absolute z-[1] text-white top-0 left-0 w-full h-full  bg-gray-600 bg-opacity-50 rounded-lg'>
                                    <div className='w-[calc(100%-2rem)] m-auto h-full flex flex-col justify-center items-center font-lato '>
                                        <h1 className='text-2xl  text-center font-extrabold '>
                                            {card.title}
                                        </h1>
                                        <p className='text-sm text-center font-sans '>
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <Image
                                        src={card.image}
                                        alt={card.imageAlt}
                                        layout='fill'
                                        objectFit='cover'
                                        className='rounded-lg'
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* footer  */}
            </div>
        </>
    );
};

Community.getLayout = function getLayout(page) {
    return <BlogLayout>{page}</BlogLayout>;
};

export default Community;

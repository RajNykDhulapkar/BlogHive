import Head from "next/head";
import Image from "next/image";
import BlogLayout from "../../layouts/BlogLayout";

const Register = () => {
    return (
        <div className='flex justify-center'>
            <form className='w-[calc(100%-1rem)] p-3 py-5 mt-5 rounded bg-gray-50 shadow-lg border flex flex-col gap-1'>
                <div className='relative z-0 w-full mb-6 group'>
                    <input
                        type='text'
                        name='name'
                        id='floating_email'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        required
                    />
                    <label
                        htmlFor='floating_name'
                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                        Full Name
                    </label>
                </div>

                <div className='relative z-0 w-full mb-6 group'>
                    <input
                        type='email'
                        name='email'
                        id='floating_email'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        required
                    />
                    <label
                        htmlFor='floating_email'
                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                        Email address
                    </label>
                </div>

                <div className='relative z-0 w-full mb-6 group'>
                    <input
                        type='password'
                        name='password'
                        id='floating_password'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        required
                    />
                    <label
                        htmlFor='floating_password'
                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                        Password
                    </label>
                </div>

                <div className='relative z-0 w-full mb-6 group'>
                    <input
                        type='password'
                        name='confirmPassword'
                        id='floating_repeat_password'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        required
                    />
                    <label
                        htmlFor='floating_repeat_password'
                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                        Confirm password
                    </label>
                </div>

                <div className='flex items-start mb-6'>
                    <div className='flex items-center h-5'>
                        <input
                            id='terms'
                            type='checkbox'
                            defaultValue
                            className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                            required
                        />
                    </div>
                    <label
                        htmlFor='terms'
                        className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                        I agree with the{" "}
                        <a href='#' className='text-blue-600 hover:underline dark:text-blue-500'>
                            terms and conditions
                        </a>
                    </label>
                </div>

                <button
                    type='submit'
                    className='text-white  bg-honeydew-primary hover:bg-honeydew-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Register new account
                </button>
            </form>
        </div>
    );
};

Register.getLayout = function getLayout(page) {
    return <BlogLayout>{page}</BlogLayout>;
};

export default Register;

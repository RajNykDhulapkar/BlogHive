import { useEffect, useReducer, useState } from "react";
import BlogLayout from "../../layouts/BlogLayout";
import {
    UPDATE_FORM,
    onInputChange,
    onFocusOut,
    validateInput,
} from "../../../hooks/form/form.utils";
import { registerUser } from "../../features/auth/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthRegisterStatus } from "../../features/auth/auth.slice";
import { useRouter } from "next/router";

const initialState = {
    name: { value: "", touched: false, hasError: true, error: "" },
    email: { value: "", touched: false, hasError: true, error: "" },
    password: { value: "", touched: false, hasError: true, error: "" },
    confirmPassword: { value: "", touched: false, hasError: true, error: "" },
    terms: { value: false, touched: false, hasError: true, error: "" },
    isFormValid: false,
};

const formsReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_FORM:
            const { name, value, touched, hasError, error, isFormValid } = action.data;
            return {
                ...state,
                [name]: { ...state[name], value, touched, hasError, error },
                isFormValid,
            };
        default:
            return state;
    }
};

const Register = () => {
    const dispatchThunk = useDispatch();
    const router = useRouter();

    const { success } = useSelector(selectAuthRegisterStatus);

    useEffect(() => {
        if (success) {
            router.push("/auth/login");
        }
    }, [success]);

    const [formState, dispatch] = useReducer(formsReducer, initialState);

    const [showError, setShowError] = useState(false);

    const formSubmitHandler = (e) => {
        e.preventDefault(); //prevents the form from submitting

        let isFormValid = true;

        for (const name in formState) {
            const item = formState[name];
            const { value } = item;
            const { hasError, error } = validateInput(name, value, formState);
            if (hasError) {
                isFormValid = false;
            }
            if (name) {
                dispatch({
                    type: UPDATE_FORM,
                    data: {
                        name,
                        value,
                        hasError,
                        error,
                        touched: true,
                        isFormValid,
                    },
                });
            }
        }
        if (!isFormValid) {
            setShowError(true);
        } else {
            const { name, email, password, confirmPassword } = formState;
            console.log(name.value, email.value, password.value, confirmPassword.value);
            dispatchThunk(
                registerUser({
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    confirmPassword: confirmPassword.value,
                })
            );
        }

        // Hide the error message after 5 seconds
        setTimeout(() => {
            setShowError(false);
        }, 5000);
    };

    return (
        <div className='flex justify-center'>
            <form
                onSubmit={(e) => formSubmitHandler(e)}
                className='w-[calc(100%-1rem)] p-3 py-5 mt-10 rounded bg-gray-50 shadow-lg border flex flex-col gap-1'
            >
                {showError && !formState.isFormValid && (
                    <div className='absolute top-[3.9rem] left-[50%] -translate-x-[50%] z-10 shadow-lg transition-all h-10 bg-slate-200 rounded-md w-[calc(100%-4rem)] text-center flex items-center justify-center'>
                        <p className='text-lg text-red-600'>Please fill all the fields correctly</p>
                    </div>
                )}
                <div className='relative  z-0 w-full mb-6 group'>
                    <input
                        type='text'
                        name='name'
                        id='floating_name'
                        className='block py-2 pb-1 px-0 w-full text-base  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        required
                        value={formState.name.value}
                        onChange={(e) => {
                            onInputChange("name", e.target.value, dispatch, formState);
                        }}
                        onBlur={(e) => {
                            onFocusOut("name", e.target.value, dispatch, formState);
                        }}
                    />
                    <label
                        htmlFor='floating_name'
                        className='peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                        Full Name
                    </label>
                    {formState.name.touched && formState.name.hasError && (
                        <div className='text-[#f65157] text-xs absolute bottom-0 translate-y-full'>
                            {formState.name.error}
                        </div>
                    )}
                </div>

                <div className='relative z-0 w-full mb-6 group'>
                    <input
                        type='email'
                        name='email'
                        id='floating_email'
                        className='block py-2 pb-1 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        required
                        value={formState.email.value}
                        onChange={(e) => {
                            onInputChange("email", e.target.value, dispatch, formState);
                        }}
                        onBlur={(e) => {
                            onFocusOut("email", e.target.value, dispatch, formState);
                        }}
                    />
                    <label
                        htmlFor='floating_email'
                        className='peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                        Email address
                    </label>
                    {formState.email.touched && formState.email.hasError && (
                        <div className='text-[#f65157] text-xs absolute bottom-0 translate-y-full'>
                            {formState.email.error}
                        </div>
                    )}
                </div>

                <div className='relative z-0 w-full mb-6 group'>
                    <input
                        type='password'
                        name='password'
                        id='floating_password'
                        className='block py-2 pb-1 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        required
                        value={formState.password.value}
                        onChange={(e) => {
                            onInputChange("password", e.target.value, dispatch, formState);
                        }}
                        onBlur={(e) => {
                            onFocusOut("password", e.target.value, dispatch, formState);
                        }}
                    />
                    <label
                        htmlFor='floating_password'
                        className='peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                        Password
                    </label>
                    {formState.password.touched && formState.password.hasError && (
                        <div className='text-[#f65157] text-xs absolute bottom-0 translate-y-full'>
                            {formState.password.error}
                        </div>
                    )}
                </div>

                <div className='relative z-0 w-full mb-6 group'>
                    <input
                        type='password'
                        name='confirmPassword'
                        id='floating_repeat_password'
                        className='block py-2 pb-1  px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        required
                        value={formState.confirmPassword.value}
                        onChange={(e) => {
                            onInputChange("confirmPassword", e.target.value, dispatch, formState);
                        }}
                        onBlur={(e) => {
                            onFocusOut("confirmPassword", e.target.value, dispatch, formState);
                        }}
                    />
                    <label
                        htmlFor='floating_repeat_password'
                        className='peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                        Confirm password
                    </label>
                    {formState.confirmPassword.touched && formState.confirmPassword.hasError && (
                        <div className='text-[#f65157] text-xs absolute bottom-0 translate-y-full'>
                            {formState.confirmPassword.error}
                        </div>
                    )}
                </div>

                <div className='flex items-start mb-6'>
                    <div className='flex items-center h-5'>
                        <input
                            id='terms'
                            type='checkbox'
                            defaultValue
                            className='w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                            required
                            checked={formState.terms.value}
                            onChange={(e) => {
                                onFocusOut("terms", e.target.checked, dispatch, formState);
                            }}
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
                    {formState.terms.touched && formState.terms.hasError && (
                        <div className='text-[#f65157] text-xs absolute bottom-0 translate-y-full'>
                            {formState.terms.error}
                        </div>
                    )}
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

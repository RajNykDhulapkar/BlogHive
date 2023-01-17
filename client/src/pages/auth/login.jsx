import Head from "next/head";
import Image from "next/image";
import BlogLayout from "../../layouts/BlogLayout";

const initialState = {
    name: { value: "", touched: false, hasError: true, error: "" },
    email: { value: "", touched: false, hasError: true, error: "" },
    password: { value: "", touched: false, hasError: true, error: "" },
    mobile: { value: "", touched: false, hasError: true, error: "" },
    terms: { value: false, touched: false, hasError: true, error: "" },
    isFormValid: false,
};

const formsReducer = (state, action) => {
    return state;
};

const Login = () => {
    const [formState, dispatch] = useReducer(formsReducer, initialState);

    return <div className=''></div>;
};

Login.getLayout = function getLayout(page) {
    return <BlogLayout>{page}</BlogLayout>;
};

export default Login;

// useForm using useReducer
const useForm = (initialValues, validateOnChange = false, validate) => {
    const [values, dispatch] = useReducer(formReducer, initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        if (validateOnChange) validate({ values });
    }, [values]);

    const resetForm = () => {
        dispatch({ type: "RESET_FORM" });
        setErrors({});
        setTouched({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "INPUT_CHANGE", name, value });
        if (validateOnChange) validate({ [name]: value });
    };

    const handleInputBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true,
        });
        validate({ [name]: values[name] });
    };

    return {
        values,
        setValues: dispatch,
        errors,
        setErrors,
        touched,
        setTouched,
        handleInputChange,
        handleInputBlur,
        resetForm,
    };
}
const { object, string } = require("zod");

const registerUserSchema = {
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        email: string({
            required_error: "Email is required",
        }).email({
            message: "Email is not valid",
        }),
        password: string({
            required_error: "Password is required",
        })
            .min(6, {
                message: "Password must be at least 6 characters",
            })
            .max(64, {
                message: "Password must be at most 64 characters",
            })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,64}$/, {
                message:
                    "Password must contain at least one uppercase, one lowercase, one number, and one special character",
            }),
        confirmPassword: string({
            required_error: "Confirm password is required",
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password and confirm password must match",
        path: ["confirmPassword"],
    }),
};

module.exports = {
    registerUserSchema,
}
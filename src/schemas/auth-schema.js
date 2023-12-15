import {z} from "zod"

export const registerSchema = z.object({
    username: z.string({
        required_error: "User es required"
    }),
    email: z.string({
        required_error: "email is required"
    }).email({
        message: "Invalid Email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {message: "Minimo 6 caracteres"})
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "email is required"
    }).email({
        message: "Invalid Email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {message: "Minimo 6 caracteres"})
})
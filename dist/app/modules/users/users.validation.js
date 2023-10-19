"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = exports.userLogin = void 0;
const zod_1 = require("zod");
const users_constant_1 = require("./users.constant");
const create = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({
            required_error: 'Full name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        contactNumber: zod_1.z.string({
            required_error: 'Contact number is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        gender: zod_1.z.enum([...users_constant_1.gender], {
            required_error: 'Gender is required',
        }),
        profileImageUrl: zod_1.z.string({
            required_error: 'Profile image URL is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        role: zod_1.z.enum([...users_constant_1.userRole]).optional(),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        contactNumber: zod_1.z.string().optional(),
        password: zod_1.z.string(),
        gender: zod_1.z.enum([...users_constant_1.gender]).optional(),
        profileImageUrl: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        role: zod_1.z.enum([...users_constant_1.userRole]).optional(),
    }),
});
exports.userLogin = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email({ message: 'Invalid email format' })
            .min(1, { message: 'Email is required' }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.validationSchema = {
    create,
    update,
    userLogin: exports.userLogin,
    refreshTokenZodSchema,
};

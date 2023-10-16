import { z } from 'zod';
import { gender, userRole } from './users.constant';

const create = z.object({
  body: z.object({
    fullName: z.string({
      required_error: 'Full name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    contactNumber: z.string({
      required_error: 'Contact number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: 'Gender is required',
    }),
    profileImageUrl: z.string({
      required_error: 'Profile image URL is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
  }),
});

const update = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    contactNumber: z.string().optional(),
    password: z.string(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    profileImageUrl: z.string().optional(),
    address: z.string().optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
  }),
});

export const userLogin = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .min(1, { message: 'Email is required' }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const validationSchema = {
  create,
  update,
  userLogin,
  refreshTokenZodSchema,
};

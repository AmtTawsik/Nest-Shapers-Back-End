import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    imageUrl: z.string().optional(),
    siteLink: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    imageUrl: z.string().optional(),
    siteLink: z.string().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};

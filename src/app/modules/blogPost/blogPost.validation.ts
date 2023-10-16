import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    authorName: z.string({
      required_error: 'Author Name is required',
    }),
    imageUrl: z.string().optional(),
    blogLink: z.string({
      required_error: 'Blog Link is required',
    }),
    categoryId: z.string({
      required_error: 'Category ID is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string(),
    authorName: z.string(),
    imageUrl: z.string().optional(),
    blogLink: z.string(),
    categoryId: z.string(),
  }),
});

export const validationSchema = {
  create,
  update,
};

import { z } from 'zod';

const create = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User ID is required',
    }),
    serviceId: z.string({
      required_error: 'Service ID is required',
    }),
    rating: z.number({
      required_error: 'Rating is required and should be an integer',
    }),
    review: z.string({
      required_error: 'Review is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    userId: z.string().optional(),
    serviceId: z.string().optional(),
    rating: z.number().optional(),
    review: z.string().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};

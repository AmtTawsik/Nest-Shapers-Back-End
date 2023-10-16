import { z } from 'zod';

const create = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: 'Service ID is required',
    }),
    imageUrl: z.string({
      required_error: 'Image URL is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    serviceId: z.string().optional(),
    imageUrl: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};

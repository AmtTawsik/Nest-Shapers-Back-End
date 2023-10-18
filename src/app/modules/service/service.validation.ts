import { z } from 'zod';

const create = z.object({
  body: z.object({
    serviceName: z.string({
      required_error: 'Service Name is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    imageUrl: z.string({
      required_error: 'Image URL is required',
    }),
    serviceCategoryId: z.string({
      required_error: 'Service Category ID is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    serviceName: z.string(),
    description: z.string(),
    price: z.number(),
    imageUrl: z.string(),
    serviceCategoryId: z.string(),
  }),
});

export const validationSchema = {
  create,
  update,
};

import { z } from 'zod';

const create = z.object({
  body: z.object({
    isFeatured: z.boolean().optional(),
    isAvailable: z.boolean().optional(),
    totalServiceProvided: z.number().int().optional(),
    serviceId: z.string({
      required_error: 'Service ID is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    isFeatured: z.boolean().optional(),
    isAvailable: z.boolean().optional(),
    totalServiceProvided: z.number().int().optional(),
    serviceId: z.string().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};

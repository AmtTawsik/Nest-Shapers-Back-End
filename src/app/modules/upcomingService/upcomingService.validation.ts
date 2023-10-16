import { z } from 'zod';

const create = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: 'Service ID is required',
    }),
    status: z.boolean().optional(),
  }),
});

const update = z.object({
  body: z.object({
    serviceId: z.string().optional(),
    status: z.boolean().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};

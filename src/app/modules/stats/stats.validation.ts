import { z } from 'zod';

const create = z.object({
  body: z.object({
    bestSellingServiceId: z.string({
      required_error: 'Best Selling Service ID is required',
    }),
    totalClient: z.number({
      required_error: 'Total client number is required',
    }),
    totalServiceProvided: z.number().optional(),
  }),
});

const update = z.object({
  body: z.object({
    bestSellingServiceId: z.string().optional(),
    totalClient: z.number().optional(),
    totalServiceProvided: z.number().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};

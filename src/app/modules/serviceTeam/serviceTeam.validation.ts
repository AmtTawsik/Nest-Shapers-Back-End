import { z } from 'zod';

const create = z.object({
  body: z.object({
    teamName: z.string({
      required_error: 'Team Name is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    teamName: z.string().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};

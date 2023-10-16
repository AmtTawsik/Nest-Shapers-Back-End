import { z } from 'zod';

const create = z.object({
  body: z.object({
    age: z.string({
      required_error: 'Age is required',
    }),
    dob: z.string({
      required_error: 'Date of birth is required',
    }),
    experience: z.string({
      required_error: 'Experience is required',
    }),
    history: z.string({
      required_error: 'History is required',
    }),
    userId: z.string({
      required_error: 'User ID is required',
    }),
    specializationId: z.string({
      required_error: 'Specialization ID is required',
    }),
    serviceTeamId: z.string({
      required_error: 'Service Team ID is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    age: z.string().optional(),
    dob: z.string().optional(),
    experience: z.string().optional(),
    history: z.string().optional(),
    userId: z.string().optional(),
    specializationId: z.string().optional(),
    serviceTeamId: z.string().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};

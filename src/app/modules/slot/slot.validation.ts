import { z } from 'zod';
import { weekDays } from './slot.constant';

const create = z.object({
  body: z.object({
    startTime: z.string({
      required_error: 'Start Time is required',
    }),
    weekDay: z.enum([...weekDays] as [string, ...string[]], {
      required_error: 'Weekday is required',
    }),
    serviceTeamId: z.string({
      required_error: 'Service Team ID is required',
    }),
    availableServiceId: z.string({
      required_error: 'Available Service ID is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    startTime: z.string().optional(),
    weekDay: z.enum([...weekDays] as [string, ...string[]]).optional(),
    serviceTeamId: z.string().optional(),
    availableServiceId: z.string().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};

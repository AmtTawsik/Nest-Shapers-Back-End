import { z } from 'zod';
import { bookingStatus } from './booking.constant';

const create = z.object({
  body: z.object({
    date: z.string({
      required_error: 'Date is required',
    }),
    weekDay: z.string().optional(),
    time: z.string().optional(),
    status: z.enum([...bookingStatus] as [string, ...string[]]).optional(),
    userId: z.string({
      required_error: 'User ID is required',
    }),
    serviceId: z.string({
      required_error: 'Service ID is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    date: z.string().optional(),
    weekDay: z.string().optional(),
    time: z.string().optional(),
    status: z.enum([...bookingStatus] as [string, ...string[]]).optional(),
    userId: z.string().optional(),
    serviceId: z.string().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};

import { z } from 'zod';
import { paymentMethod, paymentStatus } from './payment.contant';

const create = z.object({
  body: z.object({
    paymentStatus: z
      .enum([...paymentStatus] as [string, ...string[]])
      .optional(),
    paymentDate: z.string().optional(),
    paymentMethod: z.enum([...paymentMethod] as [string, ...string[]], {
      required_error: 'Payment method is required',
    }),
    transactionId: z.string().optional(),
    bookingId: z.string({
      required_error: 'Booking ID is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    paymentStatus: z
      .enum([...paymentStatus] as [string, ...string[]])
      .optional(),
    paymentDate: z.string().optional(),
    paymentMethod: z
      .enum([...paymentMethod] as [string, ...string[]])
      .optional(),
    transactionId: z.string().optional(),
    bookingId: z.string().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};

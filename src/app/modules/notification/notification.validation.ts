import { z } from 'zod';
import { notificationType } from './notification.constant';

const create = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User ID is required',
    }),
    readStatus: z.boolean().optional(),
    message: z.string({
      required_error: 'Message is required',
    }),
    type: z.enum([...notificationType] as [string, ...string[]], {
      required_error: 'Notification type is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    userId: z.string().optional(),
    readStatus: z.boolean().optional(),
    message: z.string().optional(),
    type: z.enum([...notificationType] as [string, ...string[]]).optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};

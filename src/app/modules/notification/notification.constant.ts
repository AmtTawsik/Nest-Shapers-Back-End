import { NotificationStatus } from '@prisma/client';

export const notificationType: NotificationStatus[] = [
  'booking',
  'confirmation',
  'reminder',
];

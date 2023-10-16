import { BookingStatus } from '@prisma/client';

export const bookingStatus: BookingStatus[] = [
  'confirmed',
  'pending',
  'rejected',
];

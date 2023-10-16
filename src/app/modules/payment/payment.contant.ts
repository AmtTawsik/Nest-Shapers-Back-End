import { PaymentMethod, PaymentStatus } from '@prisma/client';

export const paymentStatus: PaymentStatus[] = ['notPaid', 'paid'];
export const paymentMethod: PaymentMethod[] = ['cashOnDelivery', 'online'];

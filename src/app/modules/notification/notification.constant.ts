import { NotificationStatus } from '@prisma/client';

export const notificationType: NotificationStatus[] = [
  'booking',
  'confirmation',
  'reminder',
];

export const NotificationSearchableFields = ['message'];

export const NotificationFilterableFields = ['searchTerm', 'readStatus'];

export const NotificationRelationalFields: string[] = ['userId'];

export const NotificationRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
};

export type INotificationFilters = {
  searchTerm?: string;
  readStatus?: string;
  userId?: string;
};

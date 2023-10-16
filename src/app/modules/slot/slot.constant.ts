import { WeekDays } from '@prisma/client';

export const weekDays: WeekDays[] = [
  'saturday',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

export const SlotSearchableFields = ['startTime'];

export const SlotFilterableFields = [
  'searchTerm',
  'startTime',
  'serviceTeamId',
  'availableServiceId',
];

export const SlotRelationalFields: string[] = [
  'serviceTeamId',
  'availableServiceId',
];

export const SlotRelationalFieldsMapper: { [key: string]: string } = {
  serviceTeamId: 'serviceTeam ',
  availableServiceId: 'availableService',
};

export type ISlotFilters = {
  searchTerm?: string;
  startTime?: string;
  serviceTeamId?: string;
  availableServiceId?: string;
};

export const upcomingServiceSearchableFields = [''];

export const upcomingServiceFilterableFields = [
  'searchTerm',
  'serviceId',
  'status',
];

export const upcomingSercviceRelationalFields: string[] = ['serviceId'];

export const upcomingServiceRelationalFieldsMapper: { [key: string]: string } =
  {
    serviceId: 'service',
  };

export type IUpcomingServiceFilters = {
  searchTerm?: string;
  serviceId?: string;
  status?: boolean;
};

export const availableServiceSearchableFields = ['serviceName'];

export const availableServiceFilterableFields = [
  'searchTerm',
  'categoryId',
  'minPrice',
  'maxPrice',
];

export const availableServiceRelationalFields: string[] = ['serviceId'];

export const availableServiceRelationalFieldsMapper: { [key: string]: string } =
  {
    serviceId: 'service',
  };

export type IAvailableServiceFilters = {
  searchTerm?: string;
  categoryId?: string;
};

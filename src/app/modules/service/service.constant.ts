export const serviceSearchableFields = ['serviceName'];

export const serviceFilterableFields = [
  'searchTerm',
  'serviceCategoryId',
  'price',
];

export const sercviceRelationalFields: string[] = ['serviceCategoryId'];

export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  serviceCategoryId: 'serviceCategory',
};

export const statSearchableFields = [''];

export const statFilterableFields = ['searchTerm', 'bestSellingServiceId'];

export const sstatRelationalFields: string[] = ['bestSellingServiceId'];

export const statRelationalFieldsMapper: { [key: string]: string } = {
  bestSellingServiceId: 'bestSellingService',
};

export type IStatFilters = {
  searchTerm?: string;
  bestSellingServiceId?: string;
};

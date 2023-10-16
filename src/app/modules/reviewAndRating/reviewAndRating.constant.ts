export const ReviewSearchableFields = [''];

export const ReviewFilterableFields = ['searchTerm', 'userId', 'serviceId'];

export const ReviewRelationalFields: string[] = ['userId', 'serviceId'];

export const ReviewRelationalFieldsMapper: { [key: string]: string } = {
  serviceId: 'service',
  userId: 'user',
};

export type IReviewFilters = {
  searchTerm?: string;
  serviceId?: string;
  userId?: string;
};

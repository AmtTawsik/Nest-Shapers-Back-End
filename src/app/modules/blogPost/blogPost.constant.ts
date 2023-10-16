export const BlogPostSearchableFields = ['title'];

export const BlogPostFilterableFields = [
  'searchTerm',
  'authorName',
  'categoryId',
];

export const BlogPostRelationalFields: string[] = ['categoryId'];

export const BlogPostRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'serviceCategory',
};

export type IBlogPostFilters = {
  searchTerm?: string;
  categoryId?: string;
  authorName?: string;
};

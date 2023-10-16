export const teamMemberSearchableFields = ['age'];

export const teamMemberFilterableFields = [
  'searchTerm',
  'specializationId',
  'userId',
  'serviceTeamId',
  'age',
  'experience',
];

export const teamMemberRelationalFields: string[] = [
  'serviceTeamId',
  'userId',
  'specializationId',
];

export const teamMemberRelationalFieldsMapper: { [key: string]: string } = {
  specializationId: 'specialization',
  userId: 'user',
  serviceTeamId: 'serviceTeam',
};

export type ITeamMemberFilters = {
  searchTerm?: string;
  age?: string;
  experience?: string;
  serviceTeamId?: string;
  userId?: string;
  specializationId?: string;
};

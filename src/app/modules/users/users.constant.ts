import { Gender, UserRole } from '@prisma/client';

export const gender: Gender[] = ['male', 'female', 'others'];
export const userRole: UserRole[] = [
  'admin',
  'customer',
  'super_admin',
  'team_member',
];

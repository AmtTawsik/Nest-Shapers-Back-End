import { Gender, UserRole } from '@prisma/client';

export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  role?: string | undefined;
  email?: string | undefined;
  gender?: string | undefined;
};

export type IUserData = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  contactNumber: string;
  address: string;
  profileImageUrl: string;
  gender: Gender;
};

export type ISigninUser = {
  email: string;
  password: string;
};

export type ISigninUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

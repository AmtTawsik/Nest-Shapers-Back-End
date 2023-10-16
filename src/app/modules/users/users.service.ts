import { Prisma, Users } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { calculatePagination } from '../../../helpers/paginationHelper';

import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithoutRelation } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import { userSearchableFields } from './users.constant';
import {
  IRefreshTokenResponse,
  ISigninUser,
  ISigninUserResponse,
  IUserData,
  IUserFilterRequest,
} from './users.interface';

const insertIntoDB = async (data: Users): Promise<IUserData> => {
  const {
    fullName,
    email,
    password,
    role,
    contactNumber,
    address,
    profileImageUrl,
    gender,
  } = data;

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  const newData = {
    fullName,
    email,
    password: hashedPassword,
    contactNumber,
    address,
    profileImageUrl,
    role,
    gender,
  };

  const result = await prisma.users.create({ data: newData });

  const newResultData = {
    id: result.id,
    fullName: result.fullName,
    email: result.email,
    role: result.role,
    contactNumber: result.contactNumber,
    address: result.address,
    profileImageUrl: result.profileImageUrl,
    gender: result.gender,
  };

  return newResultData;
};

const loginUser = async (data: ISigninUser): Promise<ISigninUserResponse> => {
  const { email, password } = data;

  // check user exist
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new ApiError('Password is incorrect', httpStatus.UNAUTHORIZED);
  }

  // create access token
  const { id: userId, role, email: userEmail } = user;
  const accessToken = jwtHelpers.createToken(
    { userId, role, userEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // create refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId, role, userEmail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError('Invalid Refresh Token', httpStatus.FORBIDDEN);
  }

  const { userId } = verifiedToken;

  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  }
  const { id, role, email: userEmail } = user;
  const accessToken = jwtHelpers.createToken(
    { userId: id, role, userEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: accessToken,
  };
};

const getAllFromDB = async (
  filters: IUserFilterRequest,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Partial<Users>[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithoutRelation(
    searchTerm,
    filterData,
    userSearchableFields
  );

  const whereConditons: Prisma.UsersWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.users.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      contactNumber: true,
      address: true,
      profileImageUrl: true,
      gender: true,
      teamMembers: true,
      bookings: true,
      reviewAndRatings: true,
      notifications: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.users.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Partial<Users> | null> => {
  const result = await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      contactNumber: true,
      address: true,
      profileImageUrl: true,
      gender: true,
      teamMembers: true,
      bookings: true,
      reviewAndRatings: true,
      notifications: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Users>
): Promise<IUserData> => {
  const existingUser = await prisma.users.findUnique({
    where: { id: id },
  });

  if (!existingUser) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  }

  const result = await prisma.users.update({
    where: {
      id,
    },
    data: {
      ...payload,
      password: payload.password
        ? await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds))
        : undefined,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      contactNumber: true,
      address: true,
      profileImageUrl: true,
      gender: true,
      teamMembers: true,
      bookings: true,
      reviewAndRatings: true,
      notifications: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Partial<Users>> => {
  const result = await prisma.users.delete({
    where: {
      id,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      contactNumber: true,
      address: true,
      profileImageUrl: true,
      gender: true,
      teamMembers: true,
      bookings: true,
      reviewAndRatings: true,
      notifications: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const getProfileData = async (
  verifiedUser: JwtPayload
): Promise<Users | null> => {
  const user = await prisma.users.findUnique({
    where: { id: verifiedUser.userId },
  });

  if (!user) {
    throw new ApiError('No user found with this id', httpStatus.UNAUTHORIZED);
  }

  return user;
};

const updateProfileDataById = async (
  verifiedUser: JwtPayload,
  payload: Partial<Users>
): Promise<IUserData> => {
  const existingUser = await prisma.users.findUnique({
    where: { id: verifiedUser.userId },
  });

  if (!existingUser) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  }

  if (
    payload.role === 'admin' ||
    payload.role === 'super_admin' ||
    payload.role === 'customer' ||
    payload.role === 'team_member'
  ) {
    throw new ApiError('You can not change role', httpStatus.NOT_FOUND);
  }

  const result = await prisma.users.update({
    where: {
      id: verifiedUser.userId,
    },
    data: {
      ...payload,
      password: payload.password
        ? await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds))
        : undefined,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      contactNumber: true,
      address: true,
      profileImageUrl: true,
      gender: true,
      teamMembers: true,
      bookings: true,
      reviewAndRatings: true,
      notifications: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const getTeamMember = async (): Promise<Users[] | null> => {
  const user = await prisma.users.findMany({
    where: { role: 'team_member' },
  });

  return user;
};

export const UsersServices = {
  insertIntoDB,
  loginUser,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
  getProfileData,
  refreshToken,
  updateProfileDataById,
  getTeamMember,
};

import { Notification, Prisma } from '@prisma/client';

import { calculatePagination } from '../../../helpers/paginationHelper';

import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  INotificationFilters,
  NotificationRelationalFields,
  NotificationRelationalFieldsMapper,
  NotificationSearchableFields,
} from './notification.constant';

const insertIntoDB = async (data: Notification): Promise<Notification> => {
  const result = await prisma.notification.create({
    data,
    include: {
      user: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: INotificationFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Notification[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    NotificationSearchableFields,
    NotificationRelationalFields,
    NotificationRelationalFieldsMapper
  );

  const whereConditons: Prisma.NotificationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.notification.findMany({
    include: {
      user: true,
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.notification.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Notification | null> => {
  const result = await prisma.notification.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Notification>
): Promise<Notification> => {
  const result = await prisma.notification.update({
    where: {
      id,
    },
    data: payload,
    include: {
      user: true,
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Notification> => {
  const result = await prisma.notification.delete({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  return result;
};

const getNotificationByUser = async (
  verifiedUser: JwtPayload
): Promise<Notification[] | null> => {
  const notification = await prisma.notification.findMany({
    where: { userId: verifiedUser.userId },
  });

  if (!notification) {
    throw new ApiError('You are not authorized', httpStatus.UNAUTHORIZED);
  }

  return notification;
};

export const NotificationServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
  getNotificationByUser,
};

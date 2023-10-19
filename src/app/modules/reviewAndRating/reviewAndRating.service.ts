import { Prisma, ReviewAndRating } from '@prisma/client';

import { calculatePagination } from '../../../helpers/paginationHelper';

import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';

import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import {
  IReviewFilters,
  ReviewRelationalFields,
  ReviewRelationalFieldsMapper,
  ReviewSearchableFields,
} from './reviewAndRating.constant';

const insertIntoDB = async (
  verifiedUser: JwtPayload,
  data: ReviewAndRating
): Promise<ReviewAndRating> => {
  const booking = await prisma.booking.findFirst({
    where: {
      userId: verifiedUser.userId,
      serviceId: data.serviceId,
    },
  });

  if (booking && booking.status === 'confirmed') {
    const result = await prisma.reviewAndRating.create({
      data,
      include: {
        user: true,
        service: true,
      },
    });
    return result;
  } else {
    throw new ApiError(
      `You must have a confirmed booking for this service to add a review`,
      httpStatus.NOT_FOUND
    );
  }
};

const getAllFromDB = async (
  filters: IReviewFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<ReviewAndRating[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    ReviewSearchableFields,
    ReviewRelationalFields,
    ReviewRelationalFieldsMapper
  );

  const whereConditons: Prisma.ReviewAndRatingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.reviewAndRating.findMany({
    include: {
      user: true,
      service: true,
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.reviewAndRating.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<ReviewAndRating>
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.update({
    where: {
      id,
    },
    data: payload,
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.delete({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

export const ReviewAndRatingServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};

import { Prisma, Stats } from '@prisma/client';

import { calculatePagination } from '../../../helpers/paginationHelper';

import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  IStatFilters,
  sstatRelationalFields,
  statRelationalFieldsMapper,
  statSearchableFields,
} from './stats.constant';

const insertIntoDB = async (data: Stats): Promise<Stats> => {
  const result = await prisma.stats.create({
    data,
    include: {
      bestSellingService: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IStatFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Stats[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    statSearchableFields,
    sstatRelationalFields,
    statRelationalFieldsMapper
  );

  const whereConditons: Prisma.StatsWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.stats.findMany({
    include: {
      bestSellingService: true,
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.stats.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Stats | null> => {
  const result = await prisma.stats.findUnique({
    where: {
      id,
    },
    include: {
      bestSellingService: true,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Stats>
): Promise<Stats> => {
  const result = await prisma.stats.update({
    where: {
      id,
    },
    data: payload,
    include: {
      bestSellingService: true,
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Stats> => {
  const result = await prisma.stats.delete({
    where: {
      id,
    },
    include: {
      bestSellingService: true,
    },
  });

  return result;
};

export const StatsServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};

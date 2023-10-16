import { BlogPost, Prisma } from '@prisma/client';

import { calculatePagination } from '../../../helpers/paginationHelper';

import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  BlogPostRelationalFields,
  BlogPostRelationalFieldsMapper,
  BlogPostSearchableFields,
  IBlogPostFilters,
} from './blogPost.constant';

const insertIntoDB = async (data: BlogPost): Promise<BlogPost> => {
  const result = await prisma.blogPost.create({
    data,
    include: {
      serviceCategory: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IBlogPostFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<BlogPost[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    BlogPostSearchableFields,
    BlogPostRelationalFields,
    BlogPostRelationalFieldsMapper
  );

  const whereConditons: Prisma.BlogPostWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.blogPost.findMany({
    include: {
      serviceCategory: true,
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.blogPost.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<BlogPost | null> => {
  const result = await prisma.blogPost.findUnique({
    where: {
      id,
    },
    include: {
      serviceCategory: true,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<BlogPost>
): Promise<BlogPost> => {
  const result = await prisma.blogPost.update({
    where: {
      id,
    },
    data: payload,
    include: {
      serviceCategory: true,
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<BlogPost> => {
  const result = await prisma.blogPost.delete({
    where: {
      id,
    },
    include: {
      serviceCategory: true,
    },
  });

  return result;
};

export const BlogPostServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};

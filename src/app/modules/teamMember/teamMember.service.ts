import { Prisma, TeamMember } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';

import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  ITeamMemberFilters,
  teamMemberRelationalFields,
  teamMemberRelationalFieldsMapper,
  teamMemberSearchableFields,
} from './teamMember.constant';

const insertIntoDB = async (data: TeamMember): Promise<TeamMember> => {
  const result = await prisma.teamMember.create({
    data,
    include: {
      user: true,
      specialization: true,
      serviceTeam: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: ITeamMemberFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<TeamMember[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    teamMemberSearchableFields,
    teamMemberRelationalFields,
    teamMemberRelationalFieldsMapper
  );

  const whereConditons: Prisma.TeamMemberWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.teamMember.findMany({
    include: {
      user: true,
      specialization: true,
      serviceTeam: true,
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.teamMember.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<TeamMember | null> => {
  const result = await prisma.teamMember.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      specialization: true,
      serviceTeam: true,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<TeamMember>
): Promise<TeamMember> => {
  const result = await prisma.teamMember.update({
    where: {
      id,
    },
    data: payload,
    include: {
      user: true,
      specialization: true,
      serviceTeam: true,
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<TeamMember> => {
  const result = await prisma.teamMember.delete({
    where: {
      id,
    },
    include: {
      user: true,
      specialization: true,
      serviceTeam: true,
    },
  });

  return result;
};

export const TeamMemberServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};

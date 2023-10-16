import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { teamMemberFilterableFields } from './teamMember.constant';
import { TeamMemberServices } from './teamMember.service';

export const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await TeamMemberServices.insertIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'TeamMember created successfully',
    data: result,
  });
});

export const getAllFromDB: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, teamMemberFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await TeamMemberServices.getAllFromDB(
      filters,
      paginationOptions
    );

    if (result.data.length === 0) {
      return next(new ApiError('No TeamMember found!', httpStatus.NOT_FOUND));
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'TeamMember retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await TeamMemberServices.getDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(`No TeamMemberfound with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'TeamMember retrived successfully',
    data: result,
  });
});

const updateDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;

  const result = await TeamMemberServices.updateDataById(
    req.params.id,
    payload
  );

  if (!result) {
    return next(
      new ApiError(`No TeamMember found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'TeamMember updated successfully',
    data: result,
  });
});

const deleteDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await TeamMemberServices.deleteDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(`No TeamMember found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Team Member deleted successfully',
    data: result,
  });
});

export const TeamMemberController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};

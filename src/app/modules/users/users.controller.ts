import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UsersServices } from './users.service';

export const getAllFromDB: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await UsersServices.getAllFromDB();

    if (result.length === 0) {
      return next(new ApiError('No users found!', httpStatus.NOT_FOUND));
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Users retrived successfully',

      data: result,
    });
  }
);

export const UsersController = {
  getAllFromDB,
};

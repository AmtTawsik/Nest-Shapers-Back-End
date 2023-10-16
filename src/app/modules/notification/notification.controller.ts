import { RequestHandler } from 'express';
import httpStatus from 'http-status';

import config from '../../../config';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { NotificationFilterableFields } from './notification.constant';
import { NotificationServices } from './notification.service';

export const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await NotificationServices.insertIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Notification created successfully',
    data: result,
  });
});

export const getAllFromDB: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, NotificationFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await NotificationServices.getAllFromDB(
      filters,
      paginationOptions
    );

    if (result.data.length === 0) {
      return next(new ApiError('No Notification found!', httpStatus.NOT_FOUND));
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Notification retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await NotificationServices.getDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(`No Notification found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Review Notification successfully',
    data: result,
  });
});

const updateDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;

  const result = await NotificationServices.updateDataById(
    req.params.id,
    payload
  );

  if (!result) {
    return next(
      new ApiError(`No Notification found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Notification updated successfully',
    data: result,
  });
});

const deleteDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await NotificationServices.deleteDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(`No Notification found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Notification deleted successfully',
    data: result,
  });
});

const getNotificationByUser: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const verifiedUser = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as string
  );

  const result = await NotificationServices.getNotificationByUser(verifiedUser);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Notifications retrived successfully',
    data: result,
  });
});

export const NotificationController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
  getNotificationByUser,
};

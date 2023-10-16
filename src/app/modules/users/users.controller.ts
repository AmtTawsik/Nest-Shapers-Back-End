import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';

import { userFilterableFields } from './users.constant';
import { UsersServices } from './users.service';

export const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await UsersServices.insertIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'User created successfully',
    data: result,
  });
});

const signinUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await UsersServices.loginUser(loginData);

  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'User logged in successfully',
    data: others,
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UsersServices.refreshToken(refreshToken);

  // set refresh token into cookie
  // const cookieOptions = {
  //   secure: config.env === 'production' ? true : false,
  //   httpOnly: true,
  // };
  // res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Token refreshed successfully',
    data: result,
  });
});

export const getAllFromDB: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await UsersServices.getAllFromDB(filters, paginationOptions);

    if (result.data.length === 0) {
      return next(new ApiError('No users found!', httpStatus.NOT_FOUND));
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Users retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await UsersServices.getDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(`No users found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'User retrived successfully',
    data: result,
  });
});

const updateDataById: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await UsersServices.updateDataById(req.params.id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'User updated successfully',
    data: result,
  });
});

const deleteDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await UsersServices.deleteDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(`No user found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'User deleted successfully',
    data: result,
  });
});

const getProfileData: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const verifiedUser = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as string
  );

  const result = await UsersServices.getProfileData(verifiedUser);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Profile retrived successfully',
    data: result,
  });
});

const updateProfileDataById: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const verifiedUser = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as string
  );
  const payload = req.body;

  const result = await UsersServices.updateProfileDataById(
    verifiedUser,
    payload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Profile updated successfully',
    data: result,
  });
});

const getTeamMember: RequestHandler = catchAsync(async (req, res) => {
  const result = await UsersServices.getTeamMember();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Team member retrived successfully',
    data: result,
  });
});

export const UserController = {
  insertIntoDB,
  signinUser,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
  getProfileData,
  refreshToken,
  updateProfileDataById,
  getTeamMember,
};

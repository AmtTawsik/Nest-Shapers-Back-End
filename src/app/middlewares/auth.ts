import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError('You are not authorized', httpStatus.UNAUTHORIZED);
      }
      // verify token
      let verifiedUser = null;

      try {
        verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt.secret as Secret
        );
      } catch (err) {
        throw new ApiError('Invalid access Token', httpStatus.FORBIDDEN);
      }

      req.user = verifiedUser; // role , userid

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError('Forbidden !!!', httpStatus.FORBIDDEN);
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;

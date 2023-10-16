import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  // try {
  //   const isVerified = jwt.verify(token, secret);
  //   return isVerified as JwtPayload;
  // } catch (error) {
  //   throw new ApiError('You are not authorized', httpStatus.UNAUTHORIZED);
  // }

  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};

import { NextFunction, Request, Response } from 'express';
import { config } from '../config';
import catchAsync from '../utils/catchAsync';
import { verifyToken } from '../utils/jwt.utils';
import { JwtPayload } from './../../../node_modules/@types/jsonwebtoken/index.d';
import { USER_Role } from './../modules/user/user.contant';
import { User } from './../modules/user/user.model';

export const auth = (requiredRole: (keyof typeof USER_Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const acccessToken = req.cookies.accessToken || req.headers.authorization?.split(' ');
    if (!acccessToken) {
      throw new Error('No accessToken Showed');
    }
    if (!config.JWT_ACESS_SECRET) {
      throw new Error('JWT access secret is not defined');
    }
    const TokenVarification = verifyToken(acccessToken, config.JWT_ACESS_SECRET);
    const { id, role } = TokenVarification as JwtPayload;
    const userExist = await User.findById({_id:id});
    if (!userExist) {
      throw new Error('User Not Found');
    }
    if (!requiredRole.includes(role)) {
      throw new Error('You are not Authorized');
    }
    next();
  });
};

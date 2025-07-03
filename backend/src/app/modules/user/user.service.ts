import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { USER_Role } from './user.contant';
import { TrefreshToken, Tuser } from './user.interface';
import { User } from './user.model';
import { config } from '../../config';
import { AppError } from '../../error/AppError';
import { createToken, verifyToken } from '../../utils/jwt.utils';

const registerUser = async (data: Tuser) => {
  const { name, email, password, number, confirmPassword } = data;
  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new AppError(StatusCodes.CONFLICT, 'You are Already Registered');
  }
  if (password !== confirmPassword) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Password not matched');
  }
  const newUser = new User({
    name,
    email,
    password,
    number: number ?? '',
    confirmPassword,
    role: USER_Role.USER,
  });
  await newUser.save();
  return newUser;
};
const loginUser = async (data: Tuser) => {
  const { email, password } = data;
  const existUser = await User.findOne({ email });
  if (!existUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'You are not Registered');
  }
  if (existUser.password !== password) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Wrong PassWord');
  }
  const payload = {
    id: existUser._id,
    email: existUser.email,
    role: existUser.role,
  };
  const accessToken = createToken(
    payload,
    config.JWT_ACESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as unknown as number
  );
  const refreshToken = createToken(
    payload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as unknown as number
  );
  existUser.refreshToken = refreshToken;
  await existUser.save();
  return {
    accessToken,
    refreshToken,
  };
};
const refreshToken = async (refreshTokenStr: string) => {
  const decodeToken = verifyToken(refreshTokenStr, config.JWT_REFRESH_SECRET!);
  const { id } = decodeToken;
  const existUser = await User.findOne({ _id: id });
  if (!existUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'You are not Registered');
  }
  const payload = {
    id: existUser._id,
    email: existUser.email,
    role: existUser.role,
  };
  const accessToken = createToken(
    payload,
    config.JWT_ACESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as unknown as number
  );

  return {
    accessToken,
  };
};
const logoutUser = async (refreshTokenStr: string) => {
  const decodeToken = jwt.verify(
    refreshTokenStr,
    config.JWT_REFRESH_SECRET!
  ) as unknown as TrefreshToken;
  const { id } = decodeToken;
  const existUser = await User.findOne({ _id: id });
  if (!existUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'You are not Registered');
  }
  existUser.refreshToken = '';
  await existUser.save({ validateBeforeSave: false });
  return {
    message: 'User logged out successfully',
  };
};

export const userService = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
};

import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import { config } from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  console.log(data)
  const result = await userService.registerUser(data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Register Successfully',
    data: result,
  });
});
const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const { accessToken, refreshToken } = await userService.loginUser(data);
  res
    .cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'none',
    })
    .cookie('accessToken', accessToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'none',
    });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login Successfully',
    data: {
      accessToken
    },
  });
});
const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const data = req.cookies.refreshToken || req.body.refreshToken;
  const { accessToken } = await userService.refreshToken(data);
  res.cookie('accessToken', accessToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Refresh token get Successfully',
    data: {
      accessToken,
    },
  });
});
const logoutUser: RequestHandler = catchAsync(async (req, res) => {
  const data = req.cookies.refreshToken || req.body.refreshToken;
  await userService.logoutUser(data);
  res.clearCookie('accessToken').clearCookie('refreshToken');
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Logout successfully',
    data: undefined,
  });
});

export const userController = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
};

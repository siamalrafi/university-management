import { NextFunction, Request, Response } from 'express';
import { userService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { responseForData } from '../../../shared/sendResponse';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await userService.createUserService(user);
    responseForData.sendResponseForCreate(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created Successful',
      data: result,
    });
    next();
  },
);

export const userController = {
  createUser,
};

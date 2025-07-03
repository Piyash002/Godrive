import {  Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { adminService } from "./admin.service";
const getallUser = catchAsync(async (req:Request, res:Response) => {
    const query = req.query;
    const result = await adminService.getallUser(query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "fetch all user success",
        data: { meta: result?.meta, data:result?.data }
    });
});
const updateUserRole = catchAsync(async (req:Request, res:Response) => {
    const id = req.params.id;
    const {role} = req.body
    const result = await adminService.updateUserRole(id, role);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "fetch all user success",
        data: result
    });
});
 export const adminController = {
    getallUser,
    updateUserRole,
}
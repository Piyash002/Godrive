import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { carService } from "./car.service";
import { date } from "zod";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createCar:RequestHandler = catchAsync(async(req,res)=>{
    const data = req.body;
    console.log(data)
    const result = await carService.createCar(data);
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Cart created successfully",
        data:result
    })

});

export const careController = {
    createCar
}
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { carService } from "./car.service";
import { date } from "zod";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createCar:RequestHandler = catchAsync(async(req,res)=>{
    const data = req.body;
    const result = await carService.createCar(data);
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Cart created successfully",
        data:result
    })

});
const getallCar:RequestHandler = catchAsync(async(req,res)=>{
    const query = req.query
    const result = await carService.getallcar(query);
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Cars Get successfully",
        data:result
    })

});
const getSingleCar:RequestHandler = catchAsync(async(req,res)=>{
    const id = req.params.id
    const result = await carService.getSingleCar(id);
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Car get successfully",
        data:result
    })

});

export const careController = {
    createCar,
    getallCar,
    getSingleCar
}
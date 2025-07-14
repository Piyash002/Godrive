import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { brandService } from "./brand.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

export const addBrand = catchAsync(async(req:Request, res:Response)=>{
      const data = req.body;
      const file = req.file as unknown as Express.Multer.File
      const result = await brandService.addbrand(data, file);
      sendResponse(res,{
           success:true,
           statusCode:StatusCodes.OK,
            message:"Cars Get successfully",
            data:result
      })

})
export const getBrand = catchAsync(async(req:Request, res:Response)=>{

      const result = await brandService.getBrand();
      sendResponse(res,{
           success:true,
           statusCode:StatusCodes.OK,
            message:"Cars Get successfully",
            data:result
      })

})
export const brandController = {
    addBrand,
    getBrand
}
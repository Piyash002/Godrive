import { AppError } from "../../error/AppError";
import { ICar } from "./car.interface";
import { CarModel } from "./car.model";

const createCar = async(payaload:ICar)=>{
    const {available,name,modelYear,brand,pricePerDay,description,features,type,images} = payaload;
        if (!Array.isArray(images)) {
      throw new AppError(404, "image must be array")
    }
    const newCar = new CarModel({
        name,
        description,
        modelYear,
        brand,
        type,
        features,
        pricePerDay:Number(pricePerDay),
        available,
        images
    })
await newCar.save()
return newCar
}
export const carService = {
    createCar
}
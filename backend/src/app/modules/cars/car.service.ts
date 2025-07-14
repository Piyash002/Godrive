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
const getallcar = async(query:Record<string, unknown>)=>{
  const type = typeof query?.type === "string" ? query.type : '';
  console.log(type)
  const price = typeof query?.price === "string" ? query.price : '';
  const ratings = typeof query?.ratings === "string" ? query.ratings : '';
  const search = typeof query?.search === "string" ? query.search : '';
  const page = typeof query?.page === "string" ? query.page : "1";
  const limit = typeof query?.limit === "string" ? query.limit : "10";
  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);
  const skip = (pageInt - 1) * limitInt;
  let filters:any = {};
  if (type) {
    filters = {type:type}
  }

  if (ratings) {
    filters =({ ratings: { $gte: Number(ratings) } });
  }

  if (search.trim() !== "") {
    const regEx = new RegExp(search, "i");
    filters = ({
      $or: [
        { name: regEx },
        { type: regEx },
        { brand: regEx },
        { description: regEx },
      ],
    });
  }
  const total = await CarModel.countDocuments(filters);
  const result = await CarModel.find(filters)
      .sort({ _id: -1 })
      .skip(skip )
      .limit(limitInt);
  const totalPage = Math.ceil(total / limitInt)
 return{
    result,
    totalPage,
    total,
    limit: limitInt,
    page: pageInt,
 }
}
const getSingleCar = async(id:string)=>{
  const result = await CarModel.findById(id);
  return result
}
export const carService = {
    createCar,
    getallcar,
    getSingleCar
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const AppError_1 = require("../../error/AppError");
const car_model_1 = require("./car.model");
const createCar = (payaload) => __awaiter(void 0, void 0, void 0, function* () {
    const { available, name, modelYear, brand, pricePerDay, description, features, type, images } = payaload;
    if (!Array.isArray(images)) {
        throw new AppError_1.AppError(404, "image must be array");
    }
    const newCar = new car_model_1.CarModel({
        name,
        description,
        modelYear,
        brand,
        type,
        features,
        pricePerDay: Number(pricePerDay),
        available,
        images
    });
    yield newCar.save();
    return newCar;
});
const getallcar = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const type = typeof (query === null || query === void 0 ? void 0 : query.type) === "string" ? query.type : '';
    console.log(type);
    const price = typeof (query === null || query === void 0 ? void 0 : query.price) === "string" ? query.price : '';
    const ratings = typeof (query === null || query === void 0 ? void 0 : query.ratings) === "string" ? query.ratings : '';
    const search = typeof (query === null || query === void 0 ? void 0 : query.search) === "string" ? query.search : '';
    const page = typeof (query === null || query === void 0 ? void 0 : query.page) === "string" ? query.page : "1";
    const limit = typeof (query === null || query === void 0 ? void 0 : query.limit) === "string" ? query.limit : "10";
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;
    let filters = {};
    if (type) {
        filters = { type: type };
    }
    if (ratings) {
        filters = ({ ratings: { $gte: Number(ratings) } });
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
    const total = yield car_model_1.CarModel.countDocuments(filters);
    const result = yield car_model_1.CarModel.find(filters)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limitInt);
    const totalPage = Math.ceil(total / limitInt);
    return {
        result,
        totalPage,
        total,
        limit: limitInt,
        page: pageInt,
    };
});
const getSingleCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.findById(id);
    return result;
});
exports.carService = {
    createCar,
    getallcar,
    getSingleCar
};

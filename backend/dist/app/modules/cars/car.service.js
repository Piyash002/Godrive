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
exports.carService = {
    createCar
};

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
exports.brandService = void 0;
const cloudinary_1 = require("../../utils/cloudinary");
const brand_model_1 = require("./brand.model");
const addbrand = (data, file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { brand } = data;
    const uppercase = brand.toLocaleUpperCase();
    let imageUrls;
    if (file !== undefined) {
        const uploads = yield (0, cloudinary_1.uploadToCloudinary)(file);
        imageUrls = Array.isArray(uploads) ? (_a = uploads[0]) === null || _a === void 0 ? void 0 : _a.secure_url : uploads.secure_url;
    }
    const category = new brand_model_1.Brand({
        brand: uppercase,
        image: imageUrls || ""
    });
    const result = yield category.save();
    return result;
});
const getBrand = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brand_model_1.Brand.find();
    return result;
});
exports.brandService = {
    addbrand,
    getBrand,
};

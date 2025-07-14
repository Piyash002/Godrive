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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageFromCloudinary = exports.upload = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const uuid_1 = require("uuid");
const cloudinary_build_url_1 = require("cloudinary-build-url");
const multer_1 = __importDefault(require("multer"));
const index_1 = require("./../config/index");
cloudinary_1.v2.config({
    cloud_name: index_1.config.CLOUDINARY_CLOUD_NAME,
    api_key: index_1.config.CLOUDINARY_API_KEY,
    api_secret: index_1.config.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const filesArray = Array.isArray(files) ? files : [files];
    const uploadPromises = filesArray.map((file) => {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload_stream({
                folder: "brands",
                public_id: (0, uuid_1.v4)(),
                resource_type: "image",
            }, (error, result) => {
                if (error || !result)
                    return reject(error);
                resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                });
            }).end(file.buffer);
        });
    });
    return yield Promise.all(uploadPromises);
});
exports.uploadToCloudinary = uploadToCloudinary;
exports.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const deleteImageFromCloudinary = (cloudinaryUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicId = (0, cloudinary_build_url_1.extractPublicId)(cloudinaryUrl);
        yield cloudinary_1.v2.uploader.destroy(publicId);
        console.log("Image deleted from Cloudinary:", publicId);
    }
    catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
    }
});
exports.deleteImageFromCloudinary = deleteImageFromCloudinary;

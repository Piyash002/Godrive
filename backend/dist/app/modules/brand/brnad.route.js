"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandRoutes = void 0;
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("./brand.controller");
const cloudinary_1 = require("../../utils/cloudinary");
const router = express_1.default.Router();
router.post('/add-brand', cloudinary_1.upload.single('image'), brand_controller_1.brandController.addBrand);
router.get('/', cloudinary_1.upload.single('image'), brand_controller_1.brandController.getBrand);
exports.brandRoutes = router;

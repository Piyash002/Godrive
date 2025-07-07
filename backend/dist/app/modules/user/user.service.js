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
exports.userService = void 0;
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_contant_1 = require("./user.contant");
const user_model_1 = require("./user.model");
const config_1 = require("../../config");
const AppError_1 = require("../../error/AppError");
const jwt_utils_1 = require("../../utils/jwt.utils");
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, number, confirmpassword } = data;
    const existUser = yield user_model_1.User.findOne({ email });
    if (existUser) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, 'You are Already Registered');
    }
    if (password !== confirmpassword) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, 'Password not matched');
    }
    const newUser = new user_model_1.User({
        name,
        email,
        password,
        number: number !== null && number !== void 0 ? number : '',
        confirmpassword,
        role: user_contant_1.USER_Role.USER,
    });
    yield newUser.save();
    return newUser;
});
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    const existUser = yield user_model_1.User.findOne({ email });
    if (!existUser) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'You are not Registered');
    }
    if (existUser.password !== password) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, 'Wrong PassWord');
    }
    const payload = {
        id: existUser._id,
        email: existUser.email,
        role: existUser.role,
    };
    const accessToken = (0, jwt_utils_1.createToken)(payload, config_1.config.JWT_ACESS_SECRET, config_1.config.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = (0, jwt_utils_1.createToken)(payload, config_1.config.JWT_REFRESH_SECRET, config_1.config.JWT_REFRESH_EXPIRES_IN);
    existUser.refreshToken = refreshToken;
    yield existUser.save();
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (refreshTokenStr) => __awaiter(void 0, void 0, void 0, function* () {
    const decodeToken = (0, jwt_utils_1.verifyToken)(refreshTokenStr, config_1.config.JWT_REFRESH_SECRET);
    const { id } = decodeToken;
    const existUser = yield user_model_1.User.findOne({ _id: id });
    if (!existUser) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'You are not Registered');
    }
    const payload = {
        id: existUser._id,
        email: existUser.email,
        role: existUser.role,
    };
    const accessToken = (0, jwt_utils_1.createToken)(payload, config_1.config.JWT_ACESS_SECRET, config_1.config.JWT_ACCESS_EXPIRES_IN);
    return {
        accessToken,
    };
});
const logoutUser = (refreshTokenStr) => __awaiter(void 0, void 0, void 0, function* () {
    const decodeToken = jsonwebtoken_1.default.verify(refreshTokenStr, config_1.config.JWT_REFRESH_SECRET);
    const { id } = decodeToken;
    const existUser = yield user_model_1.User.findOne({ _id: id });
    if (!existUser) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'You are not Registered');
    }
    existUser.refreshToken = '';
    yield existUser.save({ validateBeforeSave: false });
    return {
        message: 'User logged out successfully',
    };
});
exports.userService = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
};

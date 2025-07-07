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
exports.userController = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = require("./user.service");
const config_1 = require("../../config");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    const result = yield user_service_1.userService.registerUser(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Register Successfully',
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { accessToken, refreshToken } = yield user_service_1.userService.loginUser(data);
    res
        .cookie('refreshToken', refreshToken, {
        secure: config_1.config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
    })
        .cookie('accessToken', accessToken, {
        secure: config_1.config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Login Successfully',
        data: {
            accessToken
        },
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.cookies.refreshToken || req.body.refreshToken;
    const { accessToken } = yield user_service_1.userService.refreshToken(data);
    res.cookie('accessToken', accessToken, {
        secure: config_1.config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Refresh token get Successfully',
        data: {
            accessToken,
        },
    });
}));
const logoutUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.cookies.refreshToken || req.body.refreshToken;
    yield user_service_1.userService.logoutUser(data);
    res.clearCookie('accessToken').clearCookie('refreshToken');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Logout successfully',
        data: undefined,
    });
}));
exports.userController = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
};

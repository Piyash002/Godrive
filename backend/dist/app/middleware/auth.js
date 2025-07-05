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
exports.auth = void 0;
const config_1 = require("../config");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jwt_utils_1 = require("../utils/jwt.utils");
const user_model_1 = require("./../modules/user/user.model");
const auth = (requiredRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const acccessToken = req.cookies.accessToken || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' '));
        if (!acccessToken) {
            throw new Error('No accessToken Showed');
        }
        if (!config_1.config.JWT_ACESS_SECRET) {
            throw new Error('JWT access secret is not defined');
        }
        const TokenVarification = (0, jwt_utils_1.verifyToken)(acccessToken, config_1.config.JWT_ACESS_SECRET);
        const { id, role } = TokenVarification;
        const userExist = yield user_model_1.User.findById({ _id: id });
        if (!userExist) {
            throw new Error('User Not Found');
        }
        if (!requiredRole.includes(role)) {
            throw new Error('You are not Authorized');
        }
        next();
    }));
};
exports.auth = auth;

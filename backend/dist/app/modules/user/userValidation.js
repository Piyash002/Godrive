"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string(),
        email: zod_1.default.string(),
        password: zod_1.default.string(),
        confirmPassword: zod_1.default.string(),
        number: zod_1.default.string(),
        profile_image: zod_1.default.string().optional(),
        refreshToken: zod_1.default.string().optional(),
    }),
});
exports.userLoginValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.string(),
        password: zod_1.default.string(),
    }),
});

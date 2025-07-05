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
exports.adminService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../error/AppError");
const user_model_1 = require("../user/user.model");
const getallUser = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const search = (searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.search) || '';
    const page = (searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.page) || 1;
    const limit = (searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.limit) || 10;
    let query = {};
    if (search) {
        query = {
            $or: [
                { email: { $regex: search, $options: 'i' } },
                { name: { $regex: search, $options: 'i' } },
            ]
        };
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = yield Promise.all([
        user_model_1.User.find(query).skip(skip).limit(Number(limit)).sort({ _id: -1 }),
        user_model_1.User.countDocuments(query)
    ]);
    return {
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / Number(limit)),
        },
        data,
    };
});
const updateUserRole = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "user not found");
    }
    const result = yield user_model_1.User.findByIdAndUpdate(id, { role }, { new: true });
    return result;
});
exports.adminService = {
    getallUser,
    updateUserRole
};

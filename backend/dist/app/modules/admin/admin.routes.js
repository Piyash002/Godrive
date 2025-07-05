"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminroutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const user_contant_1 = require("../user/user.contant");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.get('/get-alluser', admin_controller_1.adminController.getallUser);
router.patch('/update-role/:id', (0, auth_1.auth)([user_contant_1.USER_Role.ADMIN, user_contant_1.USER_Role.USER]), admin_controller_1.adminController.updateUserRole);
exports.adminroutes = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const userValidation_1 = require("./userValidation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const router = express_1.default.Router();
router.post('/register-user', (0, validateRequest_1.default)(userValidation_1.userValidationSchema), user_controller_1.userController.registerUser);
router.post('/login-user', (0, validateRequest_1.default)(userValidation_1.userLoginValidationSchema), user_controller_1.userController.loginUser);
router.post('/refresh-token', user_controller_1.userController.refreshToken);
router.post('/logout-user', user_controller_1.userController.logoutUser);
exports.userRoutes = router;

import express from 'express';
import { userController } from './user.controller';
import { userLoginValidationSchema, userValidationSchema } from './userValidation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();
router.post('/register-user', validateRequest(userValidationSchema), userController.registerUser);
router.post('/login-user', validateRequest(userLoginValidationSchema), userController.loginUser);
router.post('/refresh-token', userController.refreshToken);
router.post('/logout-user', userController.logoutUser);

export const userRoutes = router;

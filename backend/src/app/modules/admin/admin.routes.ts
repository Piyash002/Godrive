import express from "express";
import { auth } from "../../middleware/auth";
import { USER_Role } from "../user/user.contant";
import { adminController } from "./admin.controller";
const router = express.Router();
 router.get('/get-alluser', adminController.getallUser)
 router.patch('/update-role/:id', auth([USER_Role.ADMIN,USER_Role.USER]), adminController.updateUserRole)

 export const adminroutes = router;
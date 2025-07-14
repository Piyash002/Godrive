import express from "express";
import { brandController } from "./brand.controller";
import { upload } from "../../utils/cloudinary";
const router = express.Router();

router.post('/add-brand',upload.single('image'),brandController.addBrand);
router.get('/',upload.single('image'),brandController.getBrand);

export const brandRoutes = router; 
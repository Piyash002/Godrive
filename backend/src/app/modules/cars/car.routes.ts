import express from "express";
import { careController } from "./car.controller";

const router = express.Router();
router.post('/create-car',careController.createCar);
router.get('/get-allcar',careController.getallCar);

export const carRoutes = router; 
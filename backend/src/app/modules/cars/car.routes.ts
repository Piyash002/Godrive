import express from "express";
import { careController } from "./car.controller";

const router = express.Router();
router.post('/create-car',careController.createCar);
router.get('/get-allcar',careController.getallCar);
router.get('/:id',careController.getSingleCar);

export const carRoutes = router; 
import express from "express";
import { careController } from "./car.controller";

const router = express.Router();
router.post('/create-car',careController.createCar);

export const carRoutes = router; 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    isMain: { type: Boolean, default: false },
}, { _id: false });
const CarSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ["SUV", "Sedan", "Hatchback", "Hybrid", "Electric", "Luxury", "Convertible", "Truck"],
        required: true,
    },
    brand: { type: String, required: true },
    modelYear: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    images: {
        type: [imageSchema],
        required: true,
    },
    description: { type: String, required: true },
    features: [{ type: String }],
    available: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    reviews: [
        {
            user: { type: String },
            comment: { type: String },
            rating: { type: Number, min: 1, max: 5 },
            date: { type: Date, default: Date.now },
        },
    ],
    addOns: {
        insurance: { type: Boolean, default: false },
        gps: { type: Boolean, default: false },
        childSeat: { type: Boolean, default: false },
        additionalDriver: { type: Boolean, default: false },
    },
}, { timestamps: true });
exports.CarModel = (0, mongoose_1.model)("Car", CarSchema);

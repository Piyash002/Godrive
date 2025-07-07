"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routs_1 = __importDefault(require("./app/routs"));
exports.app = (0, express_1.default)();
//parser
// https://godrive-tawny.vercel.app
exports.app.use((0, cors_1.default)({ origin: "https://godrive-tawny.vercel.app",
    credentials: true
}));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json({ limit: '10mb' }));
exports.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
exports.app.use('/api', routs_1.default);
exports.app.get('/', (req, res) => {
    res.send('Hello');
});
// error handling
exports.app.use(
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
(err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
    });
});

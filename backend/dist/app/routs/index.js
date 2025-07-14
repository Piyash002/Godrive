"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const car_routes_1 = require("../modules/cars/car.routes");
const brnad_route_1 = require("../modules/brand/brnad.route");
const router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: '/user',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/admin',
        route: admin_routes_1.adminroutes,
    },
    {
        path: '/cars',
        route: car_routes_1.carRoutes,
    },
    {
        path: '/brands',
        route: brnad_route_1.brandRoutes,
    },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

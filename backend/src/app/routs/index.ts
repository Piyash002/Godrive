import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { adminroutes } from '../modules/admin/admin.routes';
import { carRoutes } from '../modules/cars/car.routes';

const router = Router();
const modulesRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/admin',
    route: adminroutes,
  },
  {
    path: '/cars',
    route: carRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

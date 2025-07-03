import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { adminroutes } from '../modules/admin/admin.routes';

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
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

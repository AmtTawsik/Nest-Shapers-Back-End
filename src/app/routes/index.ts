import express from 'express';
import { usersRoutes } from '../modules/users/users.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: usersRoutes,
  },
];

// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;

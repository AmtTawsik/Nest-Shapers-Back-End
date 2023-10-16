import express from 'express';
import { specializationRoutes } from '../modules/specialization/specialization.routes';
import { authRoutes } from '../modules/users/auth.routes';
import { profileRoutes } from '../modules/users/profile.routes';
import { userRoutes } from '../modules/users/users.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
  {
    path: '/specialization',
    route: specializationRoutes,
  },
];

// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;

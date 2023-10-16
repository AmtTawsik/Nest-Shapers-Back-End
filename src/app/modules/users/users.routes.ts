import express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

router.get('/', UsersController.getAllFromDB);

export const usersRoutes = router;

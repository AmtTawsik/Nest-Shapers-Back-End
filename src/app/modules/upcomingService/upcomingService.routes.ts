import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { UpcomingServiceController } from './upcomingService.controller';
import { validationSchema } from './upcomingService.validation';

const router = express.Router();

router.get('/:id', UpcomingServiceController.getDataById);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UpcomingServiceController.deleteDataById
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(validationSchema.update),
  UpcomingServiceController.updateDataById
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(validationSchema.create),
  UpcomingServiceController.insertIntoDB
);

router.get('/', UpcomingServiceController.getAllFromDB);

export const upcomingServiceRoutes = router;

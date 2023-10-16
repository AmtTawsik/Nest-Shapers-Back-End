import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { NotificationController } from './notification.controller';
import { validationSchema } from './notification.validation';

const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  NotificationController.getDataById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  NotificationController.deleteDataById
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(validationSchema.update),
  NotificationController.updateDataById
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(validationSchema.create),
  NotificationController.insertIntoDB
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  NotificationController.getAllFromDB
);

router.get(
  '/my-notification',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.TEAM_MEMBER
  ),
  NotificationController.getNotificationByUser
);

export const notificationRoutes = router;

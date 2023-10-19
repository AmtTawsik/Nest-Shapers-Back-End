import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { AvailableServiceController } from './availableService.controller';
import { validationSchema } from './availableService.validation';

const router = express.Router();

router.get(
  '/remaining-service',
  AvailableServiceController.getRemainingServicesFromDB
);

router.get('/:id', AvailableServiceController.getDataById);
router.get('/:id/:date', AvailableServiceController.getAvailAbleService);
router.get(
  '/:categoryId/category',
  AvailableServiceController.getServiceByCategory
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AvailableServiceController.deleteDataById
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(validationSchema.update),
  AvailableServiceController.updateDataById
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(validationSchema.create),
  AvailableServiceController.insertIntoDB
);

router.get(
  '/',

  AvailableServiceController.getAllFromDB
);

export const availableServiceRoutes = router;

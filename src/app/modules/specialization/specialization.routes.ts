import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { SpecializationController } from './specialization.controller';
import { validationSchema } from './specialization.validation';

const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  SpecializationController.getDataById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  SpecializationController.deleteDataById
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(validationSchema.update),
  SpecializationController.updateDataById
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(validationSchema.create),
  SpecializationController.insertIntoDB
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  SpecializationController.getAllFromDB
);

export const specializationRoutes = router;

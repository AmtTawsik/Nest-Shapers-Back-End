import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { FaqController } from './faq.controller';
import { validationSchema } from './faq.validation';

const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FaqController.getDataById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FaqController.deleteDataById
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(validationSchema.update),
  FaqController.updateDataById
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(validationSchema.create),
  FaqController.insertIntoDB
);

router.get('/', FaqController.getAllFromDB);

export const faqRoutes = router;

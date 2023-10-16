import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/book-service',
  auth(ENUM_USER_ROLE.CUSTOMER),
  BookingController.bookService
);
router.patch(
  '/cancel-book/:bookingId/:paymentId',
  auth(
    ENUM_USER_ROLE.CUSTOMER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  BookingController.cancelBooking
);

router.patch(
  '/finish-book/:bookingId/:paymentId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.finishBooking
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getSingleBooking
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.updateBooking
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.deleteBooking
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.TEAM_MEMBER
  ),
  BookingController.getAllBooking
);

export const bookingRoutes = router;

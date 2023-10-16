import express from 'express';
import { blogPostRoutes } from '../modules/blogPost/blogPost.routes';
import { faqRoutes } from '../modules/faq/faq.routes';
import { featuredInRoutes } from '../modules/featuedIn/featuedIn.routes';
import { notificationRoutes } from '../modules/notification/notification.routes';
import { reviewAndRatingRoutes } from '../modules/reviewAndRating/reviewAndRating.routes';
import { serviceRoutes } from '../modules/service/service.routes';
import { serviceTeamRoutes } from '../modules/serviceTeam/serviceTeam.routes';
import { showcaseWorkRoutes } from '../modules/showcaseWork/showcaseWork.routes';
import { slotsRoutes } from '../modules/slot/slot.routes';
import { specializationRoutes } from '../modules/specialization/specialization.routes';
import { statsRoutes } from '../modules/stats/stats.routes';
import { upcomingServiceRoutes } from '../modules/upcomingService/upcomingService.routes';
import { authRoutes } from '../modules/users/auth.routes';
import { profileRoutes } from '../modules/users/profile.routes';
import { userRoutes } from '../modules/users/users.routes';
import { websiteContentRoutes } from '../modules/websiteContent/websiteContent.routes';
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
  {
    path: '/service-team',
    route: serviceTeamRoutes,
  },
  {
    path: '/service-category',
    route: serviceTeamRoutes,
  },
  {
    path: '/service',
    route: serviceRoutes,
  },
  {
    path: '/upcoming-service',
    route: upcomingServiceRoutes,
  },
  {
    path: '/review-and-rating',
    route: reviewAndRatingRoutes,
  },
  {
    path: '/blog',
    route: blogPostRoutes,
  },
  {
    path: '/faq',
    route: faqRoutes,
  },
  {
    path: '/stats',
    route: statsRoutes,
  },
  {
    path: '/featured',
    route: featuredInRoutes,
  },
  {
    path: '/notification',
    route: notificationRoutes,
  },
  {
    path: '/website-content',
    route: websiteContentRoutes,
  },
  {
    path: '/showcase',
    route: showcaseWorkRoutes,
  },
  {
    path: '/slots',
    route: slotsRoutes,
  },
];

// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;

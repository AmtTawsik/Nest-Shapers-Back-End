"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const availableService_routes_1 = require("../modules/availableService/availableService.routes");
const blogPost_routes_1 = require("../modules/blogPost/blogPost.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const faq_routes_1 = require("../modules/faq/faq.routes");
const featuedIn_routes_1 = require("../modules/featuedIn/featuedIn.routes");
const feedback_routes_1 = require("../modules/feedback/feedback.routes");
const notification_routes_1 = require("../modules/notification/notification.routes");
const reviewAndRating_routes_1 = require("../modules/reviewAndRating/reviewAndRating.routes");
const service_routes_1 = require("../modules/service/service.routes");
const serviceCategory_routes_1 = require("../modules/serviceCategory/serviceCategory.routes");
const serviceTeam_routes_1 = require("../modules/serviceTeam/serviceTeam.routes");
const showcaseWork_routes_1 = require("../modules/showcaseWork/showcaseWork.routes");
const slot_routes_1 = require("../modules/slot/slot.routes");
const specialization_routes_1 = require("../modules/specialization/specialization.routes");
const stats_routes_1 = require("../modules/stats/stats.routes");
const teamMember_routes_1 = require("../modules/teamMember/teamMember.routes");
const upcomingService_routes_1 = require("../modules/upcomingService/upcomingService.routes");
const auth_routes_1 = require("../modules/users/auth.routes");
const profile_routes_1 = require("../modules/users/profile.routes");
const users_routes_1 = require("../modules/users/users.routes");
const websiteContent_routes_1 = require("../modules/websiteContent/websiteContent.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/users',
        route: users_routes_1.userRoutes,
    },
    {
        path: '/profile',
        route: profile_routes_1.profileRoutes,
    },
    {
        path: '/specialization',
        route: specialization_routes_1.specializationRoutes,
    },
    {
        path: '/service-team',
        route: serviceTeam_routes_1.serviceTeamRoutes,
    },
    {
        path: '/service-category',
        route: serviceCategory_routes_1.serviceCategoryRoutes,
    },
    {
        path: '/service',
        route: service_routes_1.serviceRoutes,
    },
    {
        path: '/available-service',
        route: availableService_routes_1.availableServiceRoutes,
    },
    {
        path: '/upcoming-service',
        route: upcomingService_routes_1.upcomingServiceRoutes,
    },
    {
        path: '/booking',
        route: booking_routes_1.bookingRoutes,
    },
    {
        path: '/review-and-rating',
        route: reviewAndRating_routes_1.reviewAndRatingRoutes,
    },
    {
        path: '/blog',
        route: blogPost_routes_1.blogPostRoutes,
    },
    {
        path: '/faq',
        route: faq_routes_1.faqRoutes,
    },
    {
        path: '/stats',
        route: stats_routes_1.statsRoutes,
    },
    {
        path: '/featured',
        route: featuedIn_routes_1.featuredInRoutes,
    },
    {
        path: '/notification',
        route: notification_routes_1.notificationRoutes,
    },
    { path: '/website-content', route: websiteContent_routes_1.websiteContentRoutes },
    {
        path: '/showcase',
        route: showcaseWork_routes_1.showcaseWorkRoutes,
    },
    {
        path: '/slots',
        route: slot_routes_1.slotsRoutes,
    },
    {
        path: '/team-member',
        route: teamMember_routes_1.teamMemberRoutes,
    },
    {
        path: '/feedback',
        route: feedback_routes_1.feedbackRoutes,
    },
];
// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;

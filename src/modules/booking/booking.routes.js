import { Router } from "express";

import handelError from "../../middlewares/localErrorHandler.middleware.js";
import validate from "../../middlewares/validation.middleware.js";
import multerMiddleware from "../../middlewares/multer.middleware.js";
import * as controller from "./booking.controller.js";
import * as schemas from "./booking.validation.js";
import authenticate from "../../middlewares/authentication.middleware.js";
import authorize from "../../middlewares/authorization.middleware.js";
import { roles } from "../../utils/roles.utils.js";


const router = Router();

// Book an event
router.post(
    "/:eventId",
    authenticate,
    handelError(controller.bookEvent)
);

// Get bookings for user
router.get(
    "/",
    authenticate,
    handelError(controller.getBookingsForUser)
);

// Unbook an event
router.delete(
    "/:bookingId",
    authenticate,
    handelError(controller.unbookEvent)
);


export default router;
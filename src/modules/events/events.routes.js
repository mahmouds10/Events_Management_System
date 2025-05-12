import { Router } from "express";

import handelError from "../../middlewares/localErrorHandler.middleware.js";
import validate from "../../middlewares/validation.middleware.js";
import multerMiddleware from "../../middlewares/multer.middleware.js";
import * as controller from "./events.controller.js";
import * as schemas from "./events.validation.js";
import authenticate from "../../middlewares/authentication.middleware.js";
import authorize from "../../middlewares/authorization.middleware.js";
import { roles } from "../../utils/roles.utils.js";

// Create a new router for events
const router = Router();

// Create event
router.post(
    "/add-event",
    authenticate,
    authorize(roles.ADMIN),
    multerMiddleware().single("eventImage"),
    validate(schemas.createEventSchema),
    handelError(controller.createEvent)
);

// Get all events  // NOTE - For admin
router.get(
    "/all-events",
    authenticate,
    authorize(roles.ADMIN),
    handelError(controller.getAllEvents)
);

// Get events // NOTE - For all users
router.get(
    "/events",
    handelError(controller.getEvents)
);

// Get featured events 
router.get(
    "/featured-events",
    handelError(controller.getFeaturedEvents)
);

// Get event details
router.get(
    "/event-details/:eventId",
    handelError(controller.eventDetails)
);

// Delete event
router.delete(
    "/delete-event/:eventId",
    authenticate,
    authorize(roles.ADMIN),
    handelError(controller.deleteEvent)
);

// Update event
router.patch(
    "/update-event/:eventId",
    authenticate,  
    authorize(roles.ADMIN),
    multerMiddleware().single("eventImage"),
    validate(schemas.updateEventSchema),
    handelError(controller.updateEvent)
);



export default router;

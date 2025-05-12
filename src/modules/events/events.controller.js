import { createEvent } from "./controllers/addEvent.controller.js";
import { getAllEvents } from "./controllers/getAllEvents.controller.js";
import { getEvents } from "./controllers/getEvents.controller.js";
import { getFeaturedEvents } from "./controllers/getFeatsuredEvents.controller.js";
import { eventDetails } from "./controllers/getEventDetails.controller.js";
import { deleteEvent } from "./controllers/deleteEvent.controller.js";
import { updateEvent } from "./controllers/updateEvent.controller.js";

export {
    createEvent,
    getAllEvents,
    getEvents,
    getFeaturedEvents,
    eventDetails,
    deleteEvent,
    updateEvent,
    }
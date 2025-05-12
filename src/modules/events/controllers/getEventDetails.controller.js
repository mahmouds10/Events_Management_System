import EventModel from "../../../db/models/event.model.js";
import AppError from "../../../utils/AppError.util.js";

export const eventDetails = async (req, res, next) => {
    const { eventId } = req.params;
    if (!eventId) {
        return next(new AppError("Event ID is required", 400));
    }
    const event = await EventModel.findById(eventId);
    if (!event) {
        return next(new AppError("Event not found", 404));
    }
    res.status(200).json({
        message: "Event details fetched successfully",
        event,
    });
};

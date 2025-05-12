import BookingModel from "../../../db/models/booking.model.js";
import EventModel from "../../../db/models/event.model.js";
import AppError from "../../../utils/AppError.util.js";
export const bookEvent = async (req, res, next) => {
    const { eventId } = req.params;
    const { user } = req;

    const event = await EventModel.findById(eventId);
    if (!event) {
        return next(new AppError("Event not found", 404));
    }

    const booked = await BookingModel.findOne({
        event: event._id,
        user: user._id,
    });
    if (booked) {
        return next(new AppError("You have already booked this event", 400));
    }

    const booking = await BookingModel.create({
        event: event._id,
        user: user._id,
    });

    event.attendees += 1;
    await event.save();

    res.status(201).json({
        status: "success",
        data: {
            booking,
        },
    });
};

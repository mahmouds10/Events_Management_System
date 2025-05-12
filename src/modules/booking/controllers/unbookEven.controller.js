import BookingModel from "../../../db/models/booking.model.js";
import EventModel from "../../../db/models/event.model.js";
import AppError from "../../../utils/AppError.util.js";

export const unbookEvent = async (req, res, next) => {
    const { bookingId } = req.params;
    const { user } = req;

    const booking = await BookingModel.findById(bookingId);

    if (!booking) {
        return next(new AppError("Booking not found", 404));
    }

    const event = await EventModel.findById(booking.event);
    if (!event) {
        return next(new AppError("Event not found", 404));
    }

    if (booking.user.toString() !== user._id.toString()) {
        return next(
            new AppError("You are not authorized to unbook this event", 403)
        );
    }

    event.attendees -= 1;
    await event.save();

    await BookingModel.findByIdAndDelete(bookingId);
    res.status(200).json({
        status: "success",
        message: "Booking successfully removed",
    });
};

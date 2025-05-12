import BookingModel from "../../../db/models/booking.model.js";

export const getBookingsForUser = async (req, res, next) => {
    const { user } = req;

    const bookings = await BookingModel.find({ user: user._id })
        .populate("event")
        .populate("user");

    res.status(200).json({
        status: "success",
        bookings,
    });
};

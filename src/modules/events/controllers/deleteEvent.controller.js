import { configCloudinary } from "../../../config/cloudinary.config.js";
import EventModel from "../../../db/models/event.model.js";
import AppError from "../../../utils/AppError.util.js";
export const deleteEvent = async (req, res, next) => {
    const { eventId } = req.params;

    const event = await EventModel.findById(eventId);
    if (!event) {
        return next(new AppError(`No event with this id`, 404));
    }

    // Delete the image from cloudinary
    const cloudinary = configCloudinary();
    const publicId = event.eventImage.public_id;
    const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
    });
    if (result.result !== "ok") {
        return next(
            new AppError("Failed to delete image from cloudinary", 500)
        );
    }

    // Delete the event from the database
    await EventModel.deleteOne({ _id: eventId });
    res.status(201).json({
        status: "success",
        message: "Event deleted successfully",
    });
};

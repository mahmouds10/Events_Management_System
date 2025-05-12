import EventModel from "../../../db/models/event.model.js";
import AppError from "../../../utils/AppError.util.js";
import { configCloudinary } from "../../../config/cloudinary.config.js";
import { format } from "date-fns";

export const createEvent = async (req, res, next) => {
    const {
        name,
        description,
        startDate,
        endDate,
        place,
        longitude,
        latitude,
        capacity,
        type,
        isFeatured,
        price,
        presenter,
        attendees,
    } = req.body;

    // Extract the event images from the request
    const eventImage = req.file;

    // Check if atleast one image is provided
    if (!eventImage) {
        return next(new AppError("Please provide one image", 400));
    }

    // Extract the user from body
    const { user } = req;

    // Create a new event
    const newEvent = new EventModel({
        name,
        description,
        startDate,
        endDate,
        place,
        longitude,
        latitude,
        capacity,
        type,
        isFeatured,
        price,
        presenter,
        attendees,
        createdBy: user._id,
    });

    // Upload the images to cloudinary
    const cloudinary = configCloudinary();
    const timestamp = format(new Date(), "yyyy-MM-dd_HH-mm-ss");
    const filename = `${name}_${timestamp}`;
    const sanitizedName = name
        .toLowerCase()
        .replace(/[^a-z0-9_-]/gi, "_")
        .replace(/_+/g, "_")
        .replace(/^_+|_+$/g, "");
    const uploadedImage = await cloudinary.uploader.upload(eventImage.path, {
        folder: `Areeb/events/${sanitizedName}`,
        filename_override: filename,
        discard_original_filename: true,
        use_filename: true,
        unique_filename: false,
    });

    // Add the event images to the new event
    newEvent.eventImage = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
    };
    // Save the new event to the database
    await newEvent.save();

    // Send the response
    res.status(201).json({
        message: "Event created successfully",
        event: newEvent,
    });
};

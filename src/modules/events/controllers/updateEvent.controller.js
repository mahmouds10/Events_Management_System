import { configCloudinary } from "../../../config/cloudinary.config.js";
import EventModel from "../../../db/models/event.model.js";
import { format } from "date-fns";
import AppError from "../../../utils/AppError.util.js";

export const updateEvent = async (req, res, next) => {
    const { eventId } = req.params;
    const {
        name,
        description,
        startDate,
        endDate,
        place,
        longitude,
        latitude,
        capacity,
        attendees,
        price,
        presenter,
        type,
        status,
        isFeatured,
    } = req.body;

    const event = await EventModel.findById(eventId);
    if (!event) {
        return next (new AppError(`No event with this id`, 404));
    }

    // Update event fields
    event.name = name || event.name;
    event.description = description || event.description;
    event.startDate = startDate || event.startDate;
    event.endDate = endDate || event.endDate;
    event.place = place || event.place;
    event.longitude = longitude || event.longitude;
    event.latitude = latitude || event.latitude;
    event.capacity = capacity || event.capacity;
    event.attendees = attendees || event.attendees;
    event.price = price || event.price;
    event.presenter = presenter || event.presenter;
    event.type = type || event.type;
    event.status = status || event.status;
    event.isFeatured =
        typeof isFeatured === "boolean" ? isFeatured : event.isFeatured;

    // Handle image upload if new file is provided
    if (req.file) {
        const cloudinary = configCloudinary();

        // Delete previous image(s) from Cloudinary
        if (event.eventImage) {
            await cloudinary.uploader.destroy(event.eventImage.public_id, {
                resource_type: "image",
            });
        }

        // Format upload filename and path
        const timestamp = format(new Date(), "yyyy-MM-dd_HH-mm-ss");
        const sanitizedName = name
            .toLowerCase()
            .replace(/[^a-z0-9_-]/gi, "_")
            .replace(/_+/g, "_")
            .replace(/^_+|_+$/g, "");
        const filename = `${sanitizedName}_${timestamp}`;

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: `Areeb/events/${sanitizedName}`,
            filename_override: filename,
            discard_original_filename: true,
            use_filename: true,
            unique_filename: false,
        });

        // Update event image field
        event.eventImage = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }

    await event.save();

    res.status(200).json({
        status: "success",
        message: "Event updated successfully",
        data: {
            event,
        },
    });
};
